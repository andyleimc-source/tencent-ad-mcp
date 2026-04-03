// Auto-generated from Go SDK — module: marketing_target_asset_properties
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerMarketingTargetAssetPropertiesTools(server: McpServer) {
  server.tool(
    "marketing_target_asset_properties_get",
    "获取可用的推广内容资产属性",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/marketing_target_asset_properties/get", merged));
    }
  );
}
