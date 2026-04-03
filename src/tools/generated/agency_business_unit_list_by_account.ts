// Auto-generated from Go SDK — module: agency_business_unit_list_by_account
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerAgencyBusinessUnitListByAccountTools(server: McpServer) {
  server.tool(
    "agency_business_unit_list_by_account_get",
    "查询广告主账号所属的服务商业务单元",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiPost("/agency_business_unit_list_by_account/get", merged));
    }
  );
}
