const LOGO_URL = "https://zorgwoningvergelijker.nl/images/zorgwoningvergelijker-logo.svg";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zorgwoningvergelijker.nl";

function layout(content: string): string {
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
                  <img src="${LOGO_URL}" alt="Zorgwoningvergelijker.nl" height="48" style="height:48px;width:auto;">
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:24px 40px;border-top:1px solid #F3F4F6;font-size:12px;color:#78716C;">
                  <p style="margin:0;">Zorgwoningvergelijker.nl, het vergelijkingsplatform voor modulaire woningen</p>
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

export type EmailTemplate =
  | { type: "welkom"; bedrijfsnaam: string }
  | { type: "goedgekeurd"; bedrijfsnaam: string }
  | { type: "afgewezen"; bedrijfsnaam: string; reden?: string }
  | { type: "betaling_geslaagd"; bedrijfsnaam: string; bedrag: string; omschrijving: string }
  | { type: "betaling_mislukt"; bedrijfsnaam: string; bedrag: string }
  | { type: "lead_ontvangen"; bedrijfsnaam: string; naam: string; email: string; woningtype: string }
  | { type: "wachtwoord_reset"; resetUrl: string };

export function getEmailContent(template: EmailTemplate): { subject: string; html: string } {
  switch (template.type) {
    case "welkom":
      return {
        subject: "Welkom bij Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Welkom, ${template.bedrijfsnaam}!</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Bedankt voor je registratie als aanbieder op Zorgwoningvergelijker.nl. Je aanmelding wordt door ons team beoordeeld.
          </p>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            In de tussentijd kun je alvast je profiel aanvullen in het portal: certificaten, portfolio en bedrijfsinformatie toevoegen.
          </p>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}/portal/dashboard" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Ga naar je portal
            </a>
          </p>
        `),
      };

    case "goedgekeurd":
      return {
        subject: "Je profiel is goedgekeurd! - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Profiel goedgekeurd!</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Goed nieuws, ${template.bedrijfsnaam}! Je profiel is goedgekeurd. Je kunt nu:
          </p>
          <ul style="font-size:15px;line-height:1.8;color:#4B5563;padding-left:20px;">
            <li>Woningtypen selecteren om bij vermeld te worden</li>
            <li>Occasions plaatsen op ons platform</li>
            <li>Offerteaanvragen ontvangen van geïnteresseerden</li>
          </ul>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}/portal/subscriptions" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Woningtypen toevoegen
            </a>
          </p>
        `),
      };

    case "afgewezen":
      return {
        subject: "Je aanmelding - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Aanmelding niet goedgekeurd</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${template.bedrijfsnaam}, helaas kunnen wij je aanmelding op dit moment niet goedkeuren.
          </p>
          ${template.reden ? `
            <div style="background-color:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:16px;margin:16px 0;">
              <p style="font-size:14px;color:#991B1B;margin:0;"><strong>Reden:</strong> ${template.reden}</p>
            </div>
          ` : ""}
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je kunt je profiel aanpassen en opnieuw indienen, of contact met ons opnemen voor meer informatie.
          </p>
        `),
      };

    case "betaling_geslaagd":
      return {
        subject: "Betaling ontvangen - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Betaling ontvangen</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${template.bedrijfsnaam}, je betaling van <strong>${template.bedrag}</strong> voor ${template.omschrijving} is succesvol ontvangen.
          </p>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}/portal/betalingen" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Betalingsoverzicht bekijken
            </a>
          </p>
        `),
      };

    case "betaling_mislukt":
      return {
        subject: "Betaling mislukt - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Betaling mislukt</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${template.bedrijfsnaam}, je betaling van <strong>${template.bedrag}</strong> kon helaas niet worden verwerkt.
          </p>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Controleer je betaalgegevens en neem contact op als het probleem aanhoudt.
          </p>
        `),
      };

    case "lead_ontvangen":
      return {
        subject: "Nieuwe offerteaanvraag - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Nieuwe offerteaanvraag!</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${template.bedrijfsnaam}, je hebt een nieuwe offerteaanvraag ontvangen:
          </p>
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Naam:</strong> ${template.naam}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>E-mail:</strong> ${template.email}</p>
            <p style="font-size:14px;color:#251938;margin:0;"><strong>Woningtype:</strong> ${template.woningtype}</p>
          </div>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}/portal/dashboard" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Bekijk in je portal
            </a>
          </p>
        `),
      };

    case "wachtwoord_reset":
      return {
        subject: "Wachtwoord resetten - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Wachtwoord resetten</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je hebt een verzoek gedaan om je wachtwoord te resetten. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen.
          </p>
          <p style="margin:24px 0;">
            <a href="${template.resetUrl}" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Wachtwoord resetten
            </a>
          </p>
          <p style="font-size:13px;line-height:1.6;color:#78716C;">
            Deze link is 1 uur geldig. Als je dit verzoek niet hebt gedaan, kun je deze e-mail negeren.
          </p>
        `),
      };
  }
}
