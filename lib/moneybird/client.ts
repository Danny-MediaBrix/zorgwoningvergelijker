const MONEYBIRD_BASE = "https://moneybird.com/api/v2";

function getConfig() {
  const adminId = process.env.MONEYBIRD_ADMINISTRATION_ID;
  const token = process.env.MONEYBIRD_API_TOKEN;

  if (!adminId || !token) {
    throw new Error("MONEYBIRD_ADMINISTRATION_ID and MONEYBIRD_API_TOKEN must be set");
  }

  return { adminId, token };
}

export async function moneybirdRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { adminId, token } = getConfig();
  const url = `${MONEYBIRD_BASE}/${adminId}/${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Moneybird API error (${res.status}): ${body}`);
  }

  return res.json();
}
