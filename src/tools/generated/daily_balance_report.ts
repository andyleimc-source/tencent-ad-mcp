// Auto-generated from Go SDK — module: daily_balance_report
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerDailyBalanceReportTools(server: McpServer) {
  server.tool(
    "daily_balance_report_get",
    "获取资金账户日结明细（新，包含日终结余数据）",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/daily_balance_report/get", merged));
    }
  );
}
