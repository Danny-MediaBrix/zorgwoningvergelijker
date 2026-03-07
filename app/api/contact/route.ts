import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTransporter } from "@/lib/email/transport";
import { sendEmail } from "@/lib/email/send";
import { escapeHtml } from "@/lib/email/templates";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 uur

const FROM = process.env.SMTP_FROM || "Zorgwoningvergelijker.nl <noreply@zorgwoningvergelijker.nl>";
const PLATFORM_EMAIL = "info@zorgwoningvergelijker.nl";

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

const contactSchema = z.object({
  naam: z.string().min(2, "Naam moet minimaal 2 tekens bevatten"),
  email: z.string().email("Ongeldig e-mailadres"),
  telefoon: z.string().min(10, "Telefoonnummer moet minimaal 10 tekens bevatten"),
  onderwerp: z.string().min(1, "Selecteer een onderwerp"),
  bericht: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten"),
});

function buildContactEmailHtml(data: z.infer<typeof contactSchema>): string {
  return `
    <!DOCTYPE html>
    <html lang="nl">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#FAF9F6;color:#251938;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F6;">
        <tr>
          <td align="center" style="padding:40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;border:1px solid #E5E7EB;overflow:hidden;">
              <tr>
                <td style="padding:32px 40px 24px;border-bottom:1px solid #F3F4F6;">
                  <h1 style="font-size:22px;font-weight:700;margin:0;color:#251938;">Nieuw contactbericht</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <p style="font-size:15px;line-height:1.6;color:#4B5563;margin:0 0 20px;">
                    Er is een nieuw contactformulier ingevuld op Zorgwoningvergelijker.nl.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0FA;border-radius:8px;">
                    <tr>
                      <td style="padding:20px;">
                        <p style="font-size:14px;color:#251938;margin:0 0 8px;"><strong>Naam:</strong> ${escapeHtml(data.naam)}</p>
                        <p style="font-size:14px;color:#251938;margin:0 0 8px;"><strong>E-mail:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color:#583A85;">${escapeHtml(data.email)}</a></p>
                        <p style="font-size:14px;color:#251938;margin:0 0 8px;"><strong>Telefoon:</strong> <a href="tel:${escapeHtml(data.telefoon)}" style="color:#583A85;">${escapeHtml(data.telefoon)}</a></p>
                        <p style="font-size:14px;color:#251938;margin:0 0 8px;"><strong>Onderwerp:</strong> ${escapeHtml(data.onderwerp)}</p>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:20px;padding:16px;background-color:#FAFAF9;border:1px solid #E5E7EB;border-radius:8px;">
                    <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Bericht</p>
                    <p style="font-size:15px;line-height:1.6;color:#251938;margin:0;white-space:pre-wrap;">${escapeHtml(data.bericht)}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 40px;border-top:1px solid #F3F4F6;font-size:12px;color:#78716C;">
                  <p style="margin:0;">Dit bericht is verzonden via het contactformulier op Zorgwoningvergelijker.nl</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Te veel aanvragen. Probeer het later opnieuw." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Ongeldige gegevens", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { naam, email, onderwerp } = parsed.data;

    // Fire-and-forget: e-mails blokkeren response niet
    if (process.env.SMTP_HOST) {
      const transporter = getTransporter();
      Promise.allSettled([
        transporter.sendMail({
          from: FROM,
          to: PLATFORM_EMAIL,
          replyTo: `${naam} <${email}>`,
          subject: `Contactformulier: ${onderwerp}`,
          html: buildContactEmailHtml(parsed.data),
        }).then(() => console.log(`[Contact] Admin email sent: ${naam} (${email}) — ${onderwerp}`))
          .catch((err) => console.error(`[Contact] Admin email failed:`, err)),
        sendEmail(email, { type: "contact_bevestiging", naam, onderwerp }),
      ]);
    } else {
      console.log(`[Contact] Skipping email (no SMTP configured): ${naam} — ${onderwerp}`);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Fout bij verzenden contactbericht:", error);
    return NextResponse.json(
      { success: false, error: "Er is een serverfout opgetreden" },
      { status: 500 }
    );
  }
}
