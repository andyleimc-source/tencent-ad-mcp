// Auto-generated from Go SDK — module: wechat_channels_ad_account_validation
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerWechatChannelsAdAccountValidationTools(server: McpServer) {
  server.tool(
    "wechat_channels_ad_account_validation_get",
    "视频号一键开户校验",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/wechat_channels_ad_account_validation/get", merged));
    }
  );
}
