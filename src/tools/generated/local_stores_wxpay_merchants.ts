// Auto-generated from Go SDK — module: local_stores_wxpay_merchants
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerLocalStoresWxpayMerchantsTools(server: McpServer) {
  server.tool(
    "local_stores_wxpay_merchants_get",
    "查询微信支付商户号",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/local_stores_wxpay_merchants/get", merged));
    }
  );
}
