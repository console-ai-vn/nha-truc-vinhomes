export function getLarkEnv() {
  const env = {
    appId: process.env.LARK_APP_ID,
    appSecret: process.env.LARK_APP_SECRET,
    baseAppToken: process.env.LARK_BASE_APP_TOKEN,
    tableId: process.env.LARK_TABLE_ID
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
