export function getGoogleSheetsEnv() {
  const env = {
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKeyFile: process.env.GOOGLE_PRIVATE_KEY_FILE,
    sheetId: process.env.GOOGLE_SHEET_ID
  };

  const missing = Object.entries(env)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return {
    ...env,
    configured: missing.length === 0,
    missing
  };
}
