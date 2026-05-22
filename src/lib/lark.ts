import type { LeadPayload } from "./lead-schema";
import { getLarkEnv } from "./env";

type TenantTokenResponse = {
  code: number;
  msg?: string;
  tenant_access_token?: string;
};

async function getTenantAccessToken() {
  const env = getLarkEnv();

  if (!env.configured) {
    throw new Error(`Missing Lark config: ${env.missing.join(", ")}`);
  }

  const response = await fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: env.appId,
      app_secret: env.appSecret
    })
  });

  const data = (await response.json()) as TenantTokenResponse;

  if (!response.ok || data.code !== 0 || !data.tenant_access_token) {
    throw new Error(data.msg || "Unable to fetch Lark tenant token");
  }

  return data.tenant_access_token;
}

export async function createLeadRecord(payload: LeadPayload) {
  const env = getLarkEnv();

  if (!env.configured || !env.baseAppToken || !env.tableId) {
    throw new Error(`Missing Lark config: ${env.missing.join(", ")}`);
  }

  const token = await getTenantAccessToken();
  const response = await fetch(
    `https://open.larksuite.com/open-apis/bitable/v1/apps/${env.baseAppToken}/tables/${env.tableId}/records`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          created_at: new Date().toISOString(),
          full_name: payload.fullName,
          email: payload.email,
          phone_zalo: payload.phoneZalo,
          role_interest: payload.roleInterest,
          experience_level: payload.experienceLevel || "",
          social_link: payload.socialLink || "",
          source: payload.source || "landing",
          utm_campaign: payload.utmCampaign || "",
          status: "new",
          notes: payload.note || ""
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error("Unable to create Lark record");
  }

  return response.json();
}
