import { getTransporter } from "./transport";
import { getEmailContent, type EmailTemplate } from "./templates";

const FROM = process.env.SMTP_FROM || "Zorgwoningvergelijker.nl <noreply@zorgwoningvergelijker.nl>";

export async function sendEmail(
  to: string,
  template: EmailTemplate,
  options?: { cc?: string | string[] }
): Promise<boolean> {
  try {
    if (!process.env.SMTP_HOST) {
      console.log(`[Email] Skipping (no SMTP configured): ${template.type} → ${to}`);
      return false;
    }

    const { subject, html } = getEmailContent(template);
    const transporter = getTransporter();

    await transporter.sendMail({
      from: FROM,
      to,
      cc: options?.cc,
      subject,
      html,
    });

    console.log(`[Email] Sent: ${template.type} → ${to}`);
    return true;
  } catch (error) {
    console.error(`[Email] Failed: ${template.type} → ${to}`, error);
    return false;
  }
}
