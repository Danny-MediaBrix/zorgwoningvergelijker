import { moneybirdRequest } from "./client";

type MoneybirdContact = {
  id: string;
  company_name: string;
  email: string;
};

/**
 * Zoek of maak een Moneybird contact voor een aanbieder
 */
export async function ensureMoneybirdContact(params: {
  bedrijfsnaam: string;
  email: string;
}): Promise<string> {
  // Zoek bestaand contact op e-mail
  const contacts = await moneybirdRequest<MoneybirdContact[]>(
    `contacts.json?query=${encodeURIComponent(params.email)}`
  );

  if (contacts.length > 0) {
    return contacts[0].id;
  }

  // Nieuw contact aanmaken
  const contact = await moneybirdRequest<MoneybirdContact>("contacts.json", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        company_name: params.bedrijfsnaam,
        email: params.email,
      },
    }),
  });

  return contact.id;
}
