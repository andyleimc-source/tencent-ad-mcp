// Auto-generated from Go SDK — module: merge_fund_type_subcustomer_transfer
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerMergeFundTypeSubcustomerTransferTools(server: McpServer) {
  server.tool(
    "merge_fund_type_subcustomer_transfer_add",
    "资金合并类型同商务管家子客间转账",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiPost("/merge_fund_type_subcustomer_transfer/add", merged));
    }
  );
}
