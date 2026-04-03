// Auto-generated from Go SDK — module: comment_list
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerCommentListTools(server: McpServer) {
  server.tool(
    "comment_list_get",
    "* @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/comment_list/get", merged));
    }
  );
}
