import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_LEFT = 60;
const MARGIN_RIGHT = 60;

type SigningData = {
  documentTitle: string;
  documentVersion: number;
  documentUid: string;
  signerFullName: string;
  signerRole: string;
  organisatie: string;
  signedAt: string; // ISO timestamp
  documentHashPresign: string;
  ipAddress: string;
};

function formatDutchDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} om ${hours}:${minutes} CET`;
}

export async function appendSignaturePage(
  existingPdfBytes: Uint8Array | ArrayBuffer,
  signingData: SigningData
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const textColor = rgb(0.145, 0.098, 0.22); // #251938
  const headingColor = rgb(0.345, 0.227, 0.522); // #583A85
  const mutedColor = rgb(0.294, 0.333, 0.388); // #4B5563
  const lineColor = rgb(0.8, 0.78, 0.75);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - 80;

  // Header line
  page.drawLine({
    start: { x: MARGIN_LEFT, y: y + 20 },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y: y + 20 },
    thickness: 1,
    color: headingColor,
  });

  // Title
  page.drawText("ONDERTEKENINGSVERKLARING", {
    x: MARGIN_LEFT,
    y,
    size: 16,
    font: fontBold,
    color: headingColor,
  });
  y -= 30;

  // Description
  const descLines = [
    "Dit document is elektronisch ondertekend conform de Europese",
    "eIDAS-verordening (EU 910/2014) op het niveau van een geavanceerde",
    "elektronische handtekening (AES).",
  ];
  for (const line of descLines) {
    page.drawText(line, { x: MARGIN_LEFT, y, size: 10, font, color: textColor });
    y -= 16;
  }
  y -= 20;

  // Document details
  const labelX = MARGIN_LEFT;
  const valueX = MARGIN_LEFT + 140;
  const lineHeight = 22;

  const details: [string, string][] = [
    ["Document:", signingData.documentTitle],
    ["Versie:", String(signingData.documentVersion)],
    ["Document-ID:", signingData.documentUid],
  ];

  page.drawText("DOCUMENT", { x: labelX, y, size: 9, font: fontBold, color: mutedColor });
  y -= 16;

  for (const [label, value] of details) {
    page.drawText(label, { x: labelX, y, size: 10, font: fontBold, color: textColor });
    page.drawText(value, { x: valueX, y, size: 10, font, color: textColor });
    y -= lineHeight;
  }

  y -= 10;
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 0.5,
    color: lineColor,
  });
  y -= 20;

  // Signer details
  const signerDetails: [string, string][] = [
    ["Ondertekenaar:", signingData.signerFullName],
    ["Functie:", signingData.signerRole],
    ["Organisatie:", signingData.organisatie],
    ["Datum en tijd:", formatDutchDateTime(signingData.signedAt)],
  ];

  page.drawText("ONDERTEKENAAR", { x: labelX, y, size: 9, font: fontBold, color: mutedColor });
  y -= 16;

  for (const [label, value] of signerDetails) {
    page.drawText(label, { x: labelX, y, size: 10, font: fontBold, color: textColor });
    page.drawText(value, { x: valueX, y, size: 10, font, color: textColor });
    y -= lineHeight;
  }

  y -= 10;
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 0.5,
    color: lineColor,
  });
  y -= 20;

  // Hash details
  page.drawText("INTEGRITEIT", { x: labelX, y, size: 9, font: fontBold, color: mutedColor });
  y -= 16;

  page.drawText("Document hash:", { x: labelX, y, size: 10, font: fontBold, color: textColor });
  y -= 16;
  page.drawText(signingData.documentHashPresign, { x: labelX, y, size: 8, font, color: mutedColor });
  y -= 22;

  page.drawText("IP-adres:", { x: labelX, y, size: 10, font: fontBold, color: textColor });
  page.drawText(signingData.ipAddress, { x: valueX, y, size: 10, font, color: textColor });
  y -= 30;

  // Verification URL
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 0.5,
    color: lineColor,
  });
  y -= 20;

  page.drawText("VERIFICATIE", { x: labelX, y, size: 9, font: fontBold, color: mutedColor });
  y -= 16;

  page.drawText("Dit document kan geverifieerd worden op:", {
    x: MARGIN_LEFT, y, size: 10, font, color: textColor,
  });
  y -= 18;

  const verificationUrl = `https://zorgwoningvergelijker.nl/verify/${signingData.documentUid}`;
  page.drawText(verificationUrl, {
    x: MARGIN_LEFT, y, size: 10, font: fontBold, color: headingColor,
  });
  y -= 40;

  // Legal note
  page.drawText("Ondertekend via Zorgwoningvergelijker.nl", {
    x: MARGIN_LEFT, y, size: 9, font, color: mutedColor,
  });

  // Footer
  const pageCount = pdfDoc.getPageCount();
  const footerText = `Zorgwoningvergelijker.nl — Pagina ${pageCount}`;
  const footerWidth = font.widthOfTextAtSize(footerText, 8);
  page.drawText(footerText, {
    x: PAGE_WIDTH - MARGIN_RIGHT - footerWidth,
    y: 35,
    size: 8,
    font,
    color: mutedColor,
  });

  return pdfDoc.save();
}
