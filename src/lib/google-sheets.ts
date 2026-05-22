import type { LeadPayload } from "./lead-schema";
import { getGoogleSheetsEnv } from "./env";

function getPrivateKey(): string {
  if (process.env.GOOGLE_PRIVATE_KEY_FILE) {
    const { readFileSync } = require("fs") as typeof import("fs");
    return JSON.parse(readFileSync(process.env.GOOGLE_PRIVATE_KEY_FILE, "utf8")).private_key;
  }
  return (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
}

async function getAccessToken(): Promise<string> {
  const env = getGoogleSheetsEnv();
  if (!env.clientEmail) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }

  const { JWT } = await import("google-auth-library");
  const jwt = new JWT({
    email: env.clientEmail,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const creds = await jwt.getAccessToken();
  const token = creds.token;
  if (!token) throw new Error("Failed to get Google access token");
  return token;
}

export async function appendLeadToSheet(payload: LeadPayload) {
  const env = getGoogleSheetsEnv();
  if (!env.configured || !env.sheetId) {
    throw new Error(`Missing Google Sheets config: ${env.missing.join(", ")}`);
  }

  const token = await getAccessToken();
  const now = new Date().toISOString();
  const range = encodeURIComponent("Leads!A:K");

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [
          [
            now,
            payload.fullName,
            payload.email,
            payload.phoneZalo,
            payload.roleInterest,
            payload.experienceLevel || "",
            payload.socialLink || "",
            payload.source || "landing",
            payload.utmCampaign || "",
            payload.note || "",
            "new"
          ]
        ]
      })
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message || "Google Sheets API error");
  }
}
