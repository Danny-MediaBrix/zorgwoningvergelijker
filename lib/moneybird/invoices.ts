import { moneybirdRequest } from "./client";
import { ensureMoneybirdContact } from "./contacts";

type MoneybirdInvoice = {
  id: string;
  invoice_id: string;
  state: string;
};

/**
 * Maak een factuur aan in Moneybird na succesvolle betaling
 */
export async function createInvoice(params: {
  bedrijfsnaam: string;
  email: string;
  description: string;
  amount: number; // centen, ex BTW
  molliePaymentId: string;
}): Promise<{ invoiceId: string; invoiceNumber: string }> {
  const contactId = await ensureMoneybirdContact({
    bedrijfsnaam: params.bedrijfsnaam,
    email: params.email,
  });

  // Bedrag ex BTW (we gaan ervan uit dat het bedrag inclusief 21% BTW is)
  const amountExVat = params.amount / 121 * 100;
  const priceExVat = (amountExVat / 100).toFixed(2);

  const invoice = await moneybirdRequest<MoneybirdInvoice>(
    "sales_invoices.json",
    {
      method: "POST",
      body: JSON.stringify({
        sales_invoice: {
          contact_id: contactId,
          reference: params.molliePaymentId,
          details_attributes: [
            {
              description: params.description,
              price: priceExVat,
              amount: "1",
              tax_rate_id: process.env.MONEYBIRD_TAX_RATE_ID || undefined,
            },
          ],
        },
      }),
    }
  );

  // Direct verzenden
  try {
    await moneybirdRequest(
      `sales_invoices/${invoice.id}/send_invoice.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          sales_invoice_sending: {
            delivery_method: "Email",
          },
        }),
      }
    );
  } catch (error) {
    console.error("Failed to send Moneybird invoice:", error);
  }

  return {
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoice_id,
  };
}
