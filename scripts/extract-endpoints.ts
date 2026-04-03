/**
 * Parses the Go SDK api files to extract endpoint metadata.
 * Outputs generated/api-endpoints.json
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";

const GO_SDK_API_DIR = "/tmp/marketing-api-go-sdk/pkg/api/v3";
const OUT_FILE = join(import.meta.dirname!, "..", "generated", "api-endpoints.json");

interface Endpoint {
  module: string;       // e.g. "adgroups"
  operation: string;    // e.g. "add"
  method: string;       // "GET" | "POST"
  path: string;         // e.g. "/adgroups/add"
  funcName: string;     // e.g. "Add"
  comment: string;      // Chinese comment from Go source
  hasBody: boolean;     // POST with request body
}

const files = readdirSync(GO_SDK_API_DIR).filter(f => f.startsWith("api_") && f.endsWith(".go"));

const endpoints: Endpoint[] = [];

// Already covered by hand-written tools
const handWritten = new Set([
  "/adgroups/add", "/adgroups/get", "/adgroups/update", "/adgroups/delete",
  "/adgroups/update_configured_status", "/adgroups/update_daily_budget", "/adgroups/update_bid_amount",
  "/advertiser/add", "/advertiser/get", "/advertiser/update", "/advertiser/update_daily_budget",
  "/dynamic_creatives/add", "/dynamic_creatives/get", "/dynamic_creatives/update", "/dynamic_creatives/delete",
  "/adcreative_previews/get",
  "/images/add", "/images/get", "/images/delete", "/images/update",
  "/videos/get", "/videos/delete", "/videos/update",
  "/daily_reports/get", "/hourly_reports/get",
  "/async_reports/add", "/async_reports/get", "/async_report_files/get",
  "/custom_audiences/add", "/custom_audiences/get", "/custom_audiences/update", "/custom_audiences/delete",
  "/targetings/get",
  "/funds/get", "/fund_transfer/add",
  "/leads_list/get", "/leads/add", "/leads/update", "/leads_claim/update",
  "/oauth/token",
]);

for (const file of files) {
  const content = readFileSync(join(GO_SDK_API_DIR, file), "utf-8");

  // Extract module name from file: api_adgroups.go -> adgroups
  const moduleName = basename(file, ".go").replace(/^api_/, "");

  // Match each function with its path and method
  const funcRegex = /\/\*\n\w+ApiService\s+(.+?)\n[\s\S]*?func\s+\(.*?\)\s+(\w+)\([\s\S]*?localVarHttpMethod\s*=\s*strings\.ToUpper\("(\w+)"\)[\s\S]*?localVarPath\s*:=.*?\+\s*"([^"]+)"/g;

  let match;
  while ((match = funcRegex.exec(content)) !== null) {
    const comment = match[1].trim();
    const funcName = match[2];
    const method = match[3].toUpperCase();
    const path = match[4];

    if (handWritten.has(path)) continue;

    const operation = funcName.toLowerCase();
    const hasBody = method === "POST";

    endpoints.push({
      module: moduleName,
      operation,
      method,
      path,
      funcName,
      comment,
      hasBody,
    });
  }
}

// Deduplicate by path
const seen = new Set<string>();
const unique = endpoints.filter(e => {
  if (seen.has(e.path)) return false;
  seen.add(e.path);
  return true;
});

mkdirSync(join(import.meta.dirname!, "..", "generated"), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(unique, null, 2));

console.log(`Extracted ${unique.length} endpoints (${handWritten.size} hand-written excluded)`);
console.log(`Output: ${OUT_FILE}`);
