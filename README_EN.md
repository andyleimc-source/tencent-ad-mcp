<p align="right">
  <strong>English</strong> | <a href="./README.md">中文</a>
</p>

# Tencent Ads MCP Server

Wraps the entire Tencent Ads Marketing API v3.0 as [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) tools, enabling AI assistants (Claude Code, Claude Desktop, etc.) to manage Tencent Ads directly.

## Features

- **358 MCP tools** covering all Tencent Ads Marketing API v3.0 endpoints
- Hand-crafted schemas for core modules (ad groups, creatives, reports, etc.), auto-generated from official Go SDK for the rest
- Automatic OAuth token refresh with local persistence
- Works with Claude Code / Claude Desktop / any MCP client

## Modules

| Module | Description |
|--------|-------------|
| Ad Groups (adgroups) | Create, read, update, delete, bid adjustment, budget, pause/resume |
| Creatives (dynamic_creatives) | Create, read, update, delete creatives |
| Assets (images/videos) | Upload, query, delete images and videos |
| Reports (reports) | Daily reports, hourly reports, async report tasks |
| Audiences (audiences) | Custom audience management, targeting queries |
| Funds (funds) | Account balance, fund transfers |
| Leads (leads) | Lead list, creation, claiming |
| Advertiser (advertiser) | Account info, daily budget management |
| More... | WeChat Channels, landing pages, conversion tracking, batch operations, AI materials, 200+ more |

## Installation

```bash
git clone https://github.com/andyleimc-source/tencent-ad-mcp.git
cd tencent-ad-mcp
npm install
npm run build
```

### Claude Code

**Recommended** (uses compiled output, fast startup, no extra dependencies):

```bash
claude mcp add --scope user tencent-ad -- node /path/to/tencent-ad-mcp/dist/index.js
```

<details>
<summary>Development mode (requires tsx)</summary>

```bash
claude mcp add --scope user tencent-ad -- npx tsx /path/to/tencent-ad-mcp/src/index.ts
```

> Note: If `tsx` is not installed globally, `npx` needs to download it first, which may cause startup timeout.

</details>

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "tencent-ad": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/tencent-ad-mcp/dist/index.js"],
      "env": {
        "TENCENT_AD_CLIENT_ID": "your_app_id",
        "TENCENT_AD_CLIENT_SECRET": "your_client_secret",
        "TENCENT_AD_ACCESS_TOKEN": "your_access_token",
        "TENCENT_AD_REFRESH_TOKEN": "your_refresh_token",
        "TENCENT_AD_ACCOUNT_ID": "your_account_id"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TENCENT_AD_CLIENT_ID` | Yes | OAuth App ID |
| `TENCENT_AD_CLIENT_SECRET` | Yes | OAuth App Secret |
| `TENCENT_AD_ACCESS_TOKEN` | Yes | Access token |
| `TENCENT_AD_REFRESH_TOKEN` | Yes | Refresh token |
| `TENCENT_AD_ACCOUNT_ID` | No | Default advertiser account ID |
| `TENCENT_AD_TOKEN_FILE` | No | Token persistence path (default: `~/.tencent-ad-token.json`) |

## Getting Credentials

1. Register as a Tencent Ads developer: https://developers.e.qq.com
2. Create an app to get `client_id` and `client_secret`
3. Obtain `access_token` and `refresh_token` from the developer tools page
4. Get your `account_id` from the Tencent Ads console (e.qq.com)

## Development

```bash
npm run dev       # Development mode (tsx)
npm run build     # Compile TypeScript
npm run start     # Run compiled output
```

Re-generate tools (requires cloning the official Go SDK first):

```bash
git clone --depth 1 https://github.com/TencentAd/marketing-api-go-sdk.git /tmp/marketing-api-go-sdk
npm run generate
```

## License

Apache-2.0

---

## Follow Me

<img src="./雷码工坊微信公众号.jpg" alt="雷码工坊笔记 WeChat Official Account" width="200" />

**雷码工坊笔记** — Scan to follow on WeChat
