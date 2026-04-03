// Auto-generated from Go SDK — module: leads_call_records
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerLeadsCallRecordsTools(server: McpServer) {
  server.tool(
    "leads_call_records_get",
    "获取一个账号下的全部通话结果",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/leads_call_records/get", merged));
    }
  );
}
