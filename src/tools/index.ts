import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerOAuthTools } from "./oauth.js";
import { registerAdvertiserTools } from "./advertiser.js";
import { registerAdgroupTools } from "./adgroups.js";
import { registerCreativeTools } from "./creatives.js";
import { registerImageTools } from "./images.js";
import { registerVideoTools } from "./videos.js";
import { registerReportTools } from "./reports.js";
import { registerAudienceTools } from "./audiences.js";
import { registerFundTools } from "./funds.js";
import { registerLeadTools } from "./leads.js";
import { registerGeneratedTools } from "./generated/index.js";

export function registerAllTools(server: McpServer) {
  registerOAuthTools(server);
  registerAdvertiserTools(server);
  registerAdgroupTools(server);
  registerCreativeTools(server);
  registerImageTools(server);
  registerVideoTools(server);
  registerReportTools(server);
  registerAudienceTools(server);
  registerFundTools(server);
  registerLeadTools(server);
  registerGeneratedTools(server);
}
