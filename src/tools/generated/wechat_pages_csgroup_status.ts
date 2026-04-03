// Auto-generated from Go SDK — module: wechat_pages_csgroup_status
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerWechatPagesCsgroupStatusTools(server: McpServer) {
  server.tool(
    "wechat_pages_csgroup_status_update",
    "更新企业微信组件客服状态",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiPost("/wechat_pages_csgroup_status/update", merged));
    }
  );
}
