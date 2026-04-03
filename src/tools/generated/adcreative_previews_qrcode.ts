// Auto-generated from Go SDK — module: adcreative_previews_qrcode
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function registerAdcreativePreviewsQrcodeTools(server: McpServer) {
  server.tool(
    "adcreative_previews_qrcode_get",
    "获取广告预览二维码",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await apiGet("/adcreative_previews_qrcode/get", merged));
    }
  );
}
