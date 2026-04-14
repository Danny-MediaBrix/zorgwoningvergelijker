import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getContractAanbiederContent, type ContractVariables, type DocumentSection } from "./templates/contract-aanbieder";

export type TemplateId = "contract-aanbieder";

export type TemplateVariables = ContractVariables;

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89; // A4
const MARGIN_LEFT = 60;
const MARGIN_RIGHT = 60;
const MARGIN_TOP = 60;
const MARGIN_BOTTOM = 60;
const LINE_HEIGHT = 16;
const HEADING_LINE_HEIGHT = 24;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

function getTemplateSections(templateId: TemplateId, variables: TemplateVariables): DocumentSection[] {
  switch (templateId) {
    case "contract-aanbieder":
      return getContractAanbiederContent(variables);
    default:
      throw new Error(`Onbekend template: ${templateId}`);
  }
}

function wrapText(text: string, font: Awaited<ReturnType<PDFDocument["embedFont"]>>, fontSize: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function generateDocumentPdf(
  templateId: TemplateId,
  variables: TemplateVariables
): Promise<Uint8Array> {
  const sections = getTemplateSections(templateId, variables);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const textColor = rgb(0.145, 0.098, 0.22); // #251938
  const headingColor = rgb(0.345, 0.227, 0.522); // #583A85
  const mutedColor = rgb(0.294, 0.333, 0.388); // #4B5563

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN_TOP;
  let pageNumber = 1;

  function addFooter() {
    const footerText = `Zorgwoningvergelijker.nl — Pagina ${pageNumber}`;
    const footerWidth = font.widthOfTextAtSize(footerText, 8);
    page.drawText(footerText, {
      x: PAGE_WIDTH - MARGIN_RIGHT - footerWidth,
      y: MARGIN_BOTTOM - 25,
      size: 8,
      font,
      color: mutedColor,
    });
  }

  function newPage() {
    addFooter();
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN_TOP;
    pageNumber++;
  }

  function ensureSpace(needed: number) {
    if (y - needed < MARGIN_BOTTOM) {
      newPage();
    }
  }

  // Header
  page.drawText("Zorgwoningvergelijker.nl", {
    x: MARGIN_LEFT,
    y,
    size: 10,
    font: fontBold,
    color: headingColor,
  });
  y -= 8;

  // Horizontal line
  page.drawLine({
    start: { x: MARGIN_LEFT, y },
    end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
    thickness: 0.5,
    color: rgb(0.8, 0.78, 0.75),
  });
  y -= 30;

  for (const section of sections) {
    if (section.heading) {
      const isMainTitle = section.heading === "SAMENWERKINGSOVEREENKOMST";
      const fontSize = isMainTitle ? 18 : 11;
      const headingFont = fontBold;

      ensureSpace(HEADING_LINE_HEIGHT + LINE_HEIGHT * 2);

      if (!isMainTitle) {
        y -= 10; // extra spacing before section headings
      }

      page.drawText(section.heading, {
        x: MARGIN_LEFT,
        y,
        size: fontSize,
        font: headingFont,
        color: isMainTitle ? headingColor : textColor,
      });
      y -= isMainTitle ? HEADING_LINE_HEIGHT + 4 : HEADING_LINE_HEIGHT;
    }

    for (const paragraph of section.paragraphs) {
      const lines = wrapText(paragraph, font, 10, CONTENT_WIDTH);
      ensureSpace(lines.length * LINE_HEIGHT + 8);

      for (const line of lines) {
        page.drawText(line, {
          x: MARGIN_LEFT,
          y,
          size: 10,
          font,
          color: textColor,
        });
        y -= LINE_HEIGHT;
      }
      y -= 4; // paragraph spacing
    }
  }

  addFooter();

  return pdfDoc.save();
}
