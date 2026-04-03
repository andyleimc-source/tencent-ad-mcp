/**
 * Generates TypeScript MCP tool files from api-endpoints.json.
 * Groups endpoints by module and creates one file per module.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const ENDPOINTS_FILE = join(import.meta.dirname!, "..", "generated", "api-endpoints.json");
const TOOLS_DIR = join(import.meta.dirname!, "..", "src", "tools", "generated");

interface Endpoint {
  module: string;
  operation: string;
  method: string;
  path: string;
  funcName: string;
  comment: string;
  hasBody: boolean;
}

const endpoints: Endpoint[] = JSON.parse(readFileSync(ENDPOINTS_FILE, "utf-8"));

// Group by module
const byModule = new Map<string, Endpoint[]>();
for (const ep of endpoints) {
  const list = byModule.get(ep.module) ?? [];
  list.push(ep);
  byModule.set(ep.module, list);
}

mkdirSync(TOOLS_DIR, { recursive: true });

function toToolName(ep: Endpoint): string {
  // e.g. "/adcreative_previews/add" -> "adcreative_previews_add"
  return ep.path.slice(1).replace(/\//g, "_");
}

function toCamelCase(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toRegisterFnName(module: string): string {
  const camel = toCamelCase(module);
  return `register${camel.charAt(0).toUpperCase() + camel.slice(1)}Tools`;
}

const moduleFiles: string[] = [];

for (const [module, eps] of byModule) {
  const fnName = toRegisterFnName(module);
  const fileName = `${module}.ts`;
  moduleFiles.push(module);

  const toolRegistrations = eps.map((ep) => {
    const toolName = toToolName(ep);
    const clientFn = ep.method === "GET" ? "apiGet" : "apiPost";

    return `  server.tool(
    "${toolName}",
    "${ep.comment}",
    {
      account_id: z.number().optional().describe("广告主账户ID"),
      params: z.record(z.string(), z.unknown()).optional().describe("其他请求参数 (key-value)"),
    },
    async ({ account_id, params }) => {
      const merged = { ...params, ...(account_id != null ? { account_id } : {}) };
      return jsonText(await ${clientFn}("${ep.path}", merged));
    }
  );`;
  }).join("\n\n");

  const fileContent = `// Auto-generated from Go SDK — module: ${module}
import { z } from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiGet, apiPost } from "../../client.js";

const jsonText = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

export function ${fnName}(server: McpServer) {
${toolRegistrations}
}
`;

  writeFileSync(join(TOOLS_DIR, fileName), fileContent);
}

// Generate index file for generated tools
const indexImports = moduleFiles
  .map((m) => {
    const fn = toRegisterFnName(m);
    return `import { ${fn} } from "./${m}.js";`;
  })
  .join("\n");

const indexRegistrations = moduleFiles
  .map((m) => `  ${toRegisterFnName(m)}(server);`)
  .join("\n");

const indexContent = `// Auto-generated index for generated tools
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
${indexImports}

export function registerGeneratedTools(server: McpServer) {
${indexRegistrations}
}
`;

writeFileSync(join(TOOLS_DIR, "index.ts"), indexContent);

console.log(`Generated ${moduleFiles.length} module files with ${endpoints.length} tools total`);
console.log(`Output: ${TOOLS_DIR}`);
