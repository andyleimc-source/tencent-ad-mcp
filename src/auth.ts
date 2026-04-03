import { writeFileSync } from "fs";
import { config } from "./config.js";
import type { ApiResponse } from "./types.js";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  access_token_expires_in: number;
  refresh_token_expires_in: number;
}

export async function refreshToken(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: config.refreshToken,
  });

  const url = `${config.baseUrl}/oauth/token?${params}`;
  const resp = await fetch(url);
  const json = (await resp.json()) as ApiResponse<TokenResponse>;

  if (json.code !== 0 || !json.data) {
    throw new Error(
      `Token refresh failed: [${json.code}] ${json.message_cn || json.message}`
    );
  }

  const { access_token, refresh_token } = json.data;

  // Update in-memory config
  config.accessToken = access_token;
  config.refreshToken = refresh_token;

  // Persist to file
  try {
    writeFileSync(
      config.tokenFile,
      JSON.stringify(
        { access_token, refresh_token, updated_at: new Date().toISOString() },
        null,
        2
      )
    );
  } catch {
    // Non-fatal: token still works in memory
  }

  return { accessToken: access_token, refreshToken: refresh_token };
}

export async function exchangeAuthCode(authorizationCode: string, redirectUri: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "authorization_code",
    authorization_code: authorizationCode,
    redirect_uri: redirectUri,
  });

  const url = `${config.baseUrl}/oauth/token?${params}`;
  const resp = await fetch(url);
  const json = (await resp.json()) as ApiResponse<TokenResponse>;

  if (json.code !== 0 || !json.data) {
    throw new Error(
      `Token exchange failed: [${json.code}] ${json.message_cn || json.message}`
    );
  }

  const { access_token, refresh_token } = json.data;

  config.accessToken = access_token;
  config.refreshToken = refresh_token;

  try {
    writeFileSync(
      config.tokenFile,
      JSON.stringify(
        { access_token, refresh_token, updated_at: new Date().toISOString() },
        null,
        2
      )
    );
  } catch {
    // Non-fatal
  }

  return { accessToken: access_token, refreshToken: refresh_token };
}
