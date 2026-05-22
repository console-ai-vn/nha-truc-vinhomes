export function getGoogleSheetsEnv() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const hasKey = !!(process.env.GOOGLE_PRIVATE_KEY_FILE || process.env.GOOGLE_PRIVATE_KEY);

  const missing: string[] = [];
  if (!clientEmail) missing.push("clientEmail");
  if (!hasKey) missing.push("privateKey");
  if (!sheetId) missing.push("sheetId");

  return {
    clientEmail: clientEmail ?? "",
    privateKeyFile: process.env.GOOGLE_PRIVATE_KEY_FILE ?? "",
    sheetId: sheetId ?? "",
    configured: missing.length === 0,
    missing
  };
}
