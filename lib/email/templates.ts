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

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrijs(bedrag: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(bedrag);
}

export type EmailTemplate =
  | { type: "welkom"; bedrijfsnaam: string }
  | { type: "goedgekeurd"; bedrijfsnaam: string }
  | { type: "afgewezen"; bedrijfsnaam: string; reden?: string }
  | { type: "betaling_geslaagd"; bedrijfsnaam: string; bedrag: string; omschrijving: string }
  | { type: "betaling_mislukt"; bedrijfsnaam: string; bedrag: string }
  | { type: "lead_ontvangen"; bedrijfsnaam: string; naam: string; email: string; woningtype: string }
  | { type: "wachtwoord_reset"; resetUrl: string }
  | { type: "offerte_bevestiging"; naam: string; woningtype: string; m2: number; prijsLaag: number; prijsHoog: number }
  | {
      type: "offerte_notificatie";
      naam: string; email: string; telefoon: string; postcode: string;
      woningtype: string; m2: number;
      aantalVerdiepingen: number; buitenBreedte: number; buitenDiepte: number;
      dakType: string | null; gevelType: string | null;
      kozijnType: string | null; glasType: string;
      funderingType: string | null; verwarmingType: string | null;
      isolatieNiveau: string; zonnepanelen: number; vloerverwarming: boolean;
      keukenNiveau: string; badkamerNiveau: string;
      kamers: { naam: string; type: string; m2: number; breedte: number; diepte: number }[];
      budget: string; oplevertermijn: string; heeftKavel: string;
      prijsLaag: number; prijsHoog: number;
      opmerkingen?: string; plattegrondUrl?: string;
    }
  | { type: "contact_bevestiging"; naam: string; onderwerp: string }
  | { type: "document_ter_ondertekening"; bedrijfsnaam: string; documentTitle: string; signingUrl: string }
  | { type: "document_ondertekend"; bedrijfsnaam: string; documentTitle: string; signerFullName: string; signedAt: string; verificationUrl: string };

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

    case "offerte_bevestiging":
      return {
        subject: "Je offerte-aanvraag is ontvangen - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Bedankt, ${escapeHtml(template.naam)}!</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je offerte-aanvraag is in goede orde ontvangen. Hieronder een samenvatting:
          </p>
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Woningtype:</strong> ${escapeHtml(template.woningtype)}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Oppervlakte:</strong> ${template.m2} m²</p>
            <p style="font-size:14px;color:#251938;margin:0;"><strong>Prijsindicatie:</strong> ${formatPrijs(template.prijsLaag)} – ${formatPrijs(template.prijsHoog)}</p>
          </div>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Een specialist neemt binnen <strong>48 uur</strong> contact met je op om je aanvraag te bespreken en je een offerte op maat te bezorgen.
          </p>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Terug naar Zorgwoningvergelijker.nl
            </a>
          </p>
        `),
      };

    case "offerte_notificatie": {
      const heeftKavelLabel = template.heeftKavel === "ja" ? "Ja" : template.heeftKavel === "nee" ? "Nee" : "Onbekend";

      const kamersHtml = template.kamers.length > 0
        ? `<table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;margin-top:8px;">
            <tr style="background-color:#F5F0FA;">
              <td style="padding:6px 10px;font-weight:600;color:#583A85;border-bottom:1px solid #E5E7EB;">Kamer</td>
              <td style="padding:6px 10px;font-weight:600;color:#583A85;border-bottom:1px solid #E5E7EB;text-align:right;">Afmeting</td>
              <td style="padding:6px 10px;font-weight:600;color:#583A85;border-bottom:1px solid #E5E7EB;text-align:right;">m²</td>
            </tr>
            ${template.kamers.map((k) => `
              <tr>
                <td style="padding:5px 10px;border-bottom:1px solid #F3F4F6;color:#251938;">${escapeHtml(k.naam)}</td>
                <td style="padding:5px 10px;border-bottom:1px solid #F3F4F6;color:#4B5563;text-align:right;">${k.breedte} × ${k.diepte} m</td>
                <td style="padding:5px 10px;border-bottom:1px solid #F3F4F6;color:#4B5563;text-align:right;">${k.m2} m²</td>
              </tr>
            `).join("")}
          </table>`
        : '<p style="font-size:14px;color:#78716C;margin:8px 0 0;">Geen kamers samengesteld</p>';

      const detailRow = (label: string, value: string | null | undefined) =>
        value ? `<p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

      return {
        subject: `Nieuwe offerte-aanvraag: ${escapeHtml(template.woningtype)}`,
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Nieuwe offerte-aanvraag</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Er is een nieuwe offerte-aanvraag binnengekomen via de configurator.
          </p>

          <!-- Contactgegevens -->
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Contactgegevens</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Naam:</strong> ${escapeHtml(template.naam)}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>E-mail:</strong> <a href="mailto:${escapeHtml(template.email)}" style="color:#583A85;">${escapeHtml(template.email)}</a></p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Telefoon:</strong> <a href="tel:${escapeHtml(template.telefoon)}" style="color:#583A85;">${escapeHtml(template.telefoon)}</a></p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Postcode:</strong> ${escapeHtml(template.postcode)}</p>
            ${template.budget ? `<p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Budget:</strong> ${escapeHtml(template.budget)}</p>` : ""}
            ${template.oplevertermijn ? `<p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Oplevertermijn:</strong> ${escapeHtml(template.oplevertermijn)}</p>` : ""}
            ${template.heeftKavel !== "onbekend" ? `<p style="font-size:14px;color:#251938;margin:0;"><strong>Heeft kavel:</strong> ${heeftKavelLabel}</p>` : ""}
          </div>

          <!-- Basiskenmerken -->
          <div style="background-color:#FAFAF9;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Basiskenmerken</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Woningtype:</strong> ${escapeHtml(template.woningtype)}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Oppervlakte:</strong> ${template.m2} m²</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Verdiepingen:</strong> ${template.aantalVerdiepingen}</p>
            <p style="font-size:14px;color:#251938;margin:0;"><strong>Buitenafmetingen:</strong> ${template.buitenBreedte} × ${template.buitenDiepte} m</p>
          </div>

          <!-- Plattegrond + Kamers -->
          <div style="background-color:#FAFAF9;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Plattegrond &amp; Kamers</p>
            ${template.plattegrondUrl
              ? `<img src="${template.plattegrondUrl}" alt="Plattegrond" style="max-width:100%;height:auto;border-radius:8px;border:1px solid #E5E7EB;margin-bottom:12px;" />`
              : '<p style="font-size:14px;color:#78716C;margin:0 0 8px;">Geen plattegrond samengesteld</p>'
            }
            ${kamersHtml}
          </div>

          <!-- Afwerking -->
          <div style="background-color:#FAFAF9;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Afwerking</p>
            <p style="font-size:12px;font-weight:600;color:#583A85;margin:8px 0 4px;">Exterieur</p>
            ${detailRow("Daktype", template.dakType)}
            ${detailRow("Geveltype", template.gevelType)}
            ${detailRow("Kozijnen", template.kozijnType)}
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Beglazing:</strong> ${escapeHtml(template.glasType)}</p>
            ${detailRow("Fundering", template.funderingType)}

            <p style="font-size:12px;font-weight:600;color:#583A85;margin:12px 0 4px;">Installaties</p>
            ${detailRow("Verwarming", template.verwarmingType)}
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Isolatie:</strong> ${escapeHtml(template.isolatieNiveau)}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Zonnepanelen:</strong> ${template.zonnepanelen > 0 ? `${template.zonnepanelen} panelen` : "Geen"}</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Vloerverwarming:</strong> ${template.vloerverwarming ? "Ja" : "Nee"}</p>

            <p style="font-size:12px;font-weight:600;color:#583A85;margin:12px 0 4px;">Interieur</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Keuken:</strong> ${escapeHtml(template.keukenNiveau)}</p>
            <p style="font-size:14px;color:#251938;margin:0;"><strong>Badkamer:</strong> ${escapeHtml(template.badkamerNiveau)}</p>
          </div>

          <!-- Prijsindicatie -->
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Prijsindicatie</p>
            <p style="font-size:20px;font-weight:700;color:#583A85;margin:0;">${formatPrijs(template.prijsLaag)} – ${formatPrijs(template.prijsHoog)}</p>
          </div>

          ${template.opmerkingen ? `
            <div style="background-color:#FAFAF9;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:16px 0;">
              <p style="font-size:13px;font-weight:600;color:#78716C;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Opmerkingen</p>
              <p style="font-size:14px;color:#251938;margin:0;white-space:pre-wrap;">${escapeHtml(template.opmerkingen)}</p>
            </div>
          ` : ""}
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}/admin/leads" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Bekijk in admin
            </a>
          </p>
        `),
      };
    }

    case "contact_bevestiging":
      return {
        subject: "Je bericht is ontvangen - Zorgwoningvergelijker.nl",
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Bedankt, ${escapeHtml(template.naam)}!</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je bericht over <strong>'${escapeHtml(template.onderwerp)}'</strong> is in goede orde ontvangen.
          </p>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            We streven ernaar om binnen <strong>1 werkdag</strong> te reageren.
          </p>
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>E-mail:</strong> info@zorgwoningvergelijker.nl</p>
            <p style="font-size:14px;color:#251938;margin:0 0 4px;"><strong>Telefoon:</strong> 085 - 004 11 59</p>
            <p style="font-size:14px;color:#251938;margin:0;">Ma-Vr: 09:00 - 17:30 | Za: 10:00 - 14:00</p>
          </div>
          <p style="margin:24px 0 0;">
            <a href="${BASE_URL}" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Terug naar Zorgwoningvergelijker.nl
            </a>
          </p>
        `),
      };

    case "document_ter_ondertekening":
      return {
        subject: `Document ter ondertekening - ${escapeHtml(template.documentTitle)}`,
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Document ter ondertekening</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${escapeHtml(template.bedrijfsnaam)}, er staat een document klaar dat je aandacht vereist.
          </p>
          <div style="background-color:#F5F0FA;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:14px;color:#251938;margin:0;"><strong>Document:</strong> ${escapeHtml(template.documentTitle)}</p>
          </div>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je kunt het document inzien en ondertekenen via je portal. Neem het document goed door voordat je ondertekent.
          </p>
          <p style="margin:24px 0 0;">
            <a href="${template.signingUrl}" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Document bekijken en ondertekenen
            </a>
          </p>
        `),
      };

    case "document_ondertekend":
      return {
        subject: `Document ondertekend - ${escapeHtml(template.documentTitle)}`,
        html: layout(`
          <h1 style="font-size:24px;font-weight:700;margin:0 0 16px;">Document ondertekend</h1>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Beste ${escapeHtml(template.bedrijfsnaam)}, het document is succesvol ondertekend.
          </p>
          <div style="background-color:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:14px;color:#166534;margin:0 0 4px;"><strong>Document:</strong> ${escapeHtml(template.documentTitle)}</p>
            <p style="font-size:14px;color:#166534;margin:0 0 4px;"><strong>Ondertekend door:</strong> ${escapeHtml(template.signerFullName)}</p>
            <p style="font-size:14px;color:#166534;margin:0;"><strong>Datum:</strong> ${escapeHtml(template.signedAt)}</p>
          </div>
          <p style="font-size:15px;line-height:1.6;color:#4B5563;">
            Je kunt het ondertekende document downloaden vanuit je portal. De integriteit van het document kan op elk moment geverifieerd worden.
          </p>
          <p style="margin:24px 0 0;">
            <a href="${template.verificationUrl}" style="display:inline-block;padding:12px 24px;background-color:#583A85;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
              Document verifiëren
            </a>
          </p>
        `),
      };
  }
}
