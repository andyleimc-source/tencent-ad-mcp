# tencent-ad-mcp

[English](#english) | [中文](#中文)

---

<a id="中文"></a>

## 腾讯广告 MCP Server

将腾讯广告 Marketing API v3.0 全部接口封装为 [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) 工具，让 AI 助手（Claude Code、Claude Desktop 等）直接操作腾讯广告。

### 特性

- **358 个 MCP 工具**，覆盖腾讯广告 Marketing API v3.0 全部接口
- 核心模块（广告组、创意、报表等）手写精细 schema，其余从官方 Go SDK 自动生成
- OAuth token 自动刷新 + 本地持久化
- 支持 Claude Code / Claude Desktop / 任何 MCP 客户端

### 覆盖模块

| 模块 | 说明 |
|------|------|
| 广告组 (adgroups) | 创建、查询、更新、删除、调价、调预算、暂停/启动 |
| 创意 (dynamic_creatives) | 创建、查询、更新、删除创意 |
| 素材 (images/videos) | 图片和视频的上传、查询、删除 |
| 报表 (reports) | 日报、时报、异步报表任务 |
| 人群 (audiences) | 自定义人群管理、定向查询 |
| 资金 (funds) | 账户余额查询、资金划转 |
| 线索 (leads) | 线索列表、创建、认领 |
| 账户 (advertiser) | 账户信息、日预算管理 |
| 更多... | 微信渠道、落地页、转化追踪、批量操作、AI素材 等 200+ 接口 |

### 安装

#### Claude Code

```bash
claude mcp add --scope user tencent-ad -- npx tsx /path/to/tencent-ad-mcp/src/index.ts
```

#### Claude Desktop

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "tencent-ad": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "/path/to/tencent-ad-mcp/src/index.ts"],
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

### 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `TENCENT_AD_CLIENT_ID` | 是 | OAuth 应用 ID |
| `TENCENT_AD_CLIENT_SECRET` | 是 | OAuth 应用密钥 |
| `TENCENT_AD_ACCESS_TOKEN` | 是 | 访问令牌 |
| `TENCENT_AD_REFRESH_TOKEN` | 是 | 刷新令牌 |
| `TENCENT_AD_ACCOUNT_ID` | 否 | 默认广告主账户 ID |
| `TENCENT_AD_TOKEN_FILE` | 否 | Token 持久化路径（默认 `~/.tencent-ad-token.json`） |

### 获取凭证

1. 注册腾讯广告开发者：https://developers.e.qq.com
2. 创建应用，获取 `client_id` 和 `client_secret`
3. 在开发者工具页面获取 `access_token` 和 `refresh_token`
4. 在广告投放后台 (e.qq.com) 获取 `account_id`

### 开发

```bash
git clone https://github.com/nocoly/tencent-ad-mcp.git
cd tencent-ad-mcp
npm install
npm run build     # 编译
npm run dev       # 开发模式运行
```

重新生成工具（需要先克隆官方 Go SDK）：

```bash
git clone --depth 1 https://github.com/TencentAd/marketing-api-go-sdk.git /tmp/marketing-api-go-sdk
npm run generate
```

---

<a id="english"></a>

## Tencent Ads MCP Server

Wraps the entire Tencent Ads Marketing API v3.0 as [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) tools, enabling AI assistants (Claude Code, Claude Desktop, etc.) to manage Tencent Ads directly.

### Features

- **358 MCP tools** covering all Tencent Ads Marketing API v3.0 endpoints
- Hand-crafted schemas for core modules, auto-generated from official Go SDK for the rest
- Automatic OAuth token refresh with local persistence
- Works with Claude Code / Claude Desktop / any MCP client

### Quick Start

```bash
# Clone and install
git clone https://github.com/nocoly/tencent-ad-mcp.git
cd tencent-ad-mcp
npm install

# Configure environment variables (see table above)
cp .env.example .env
# Edit .env with your credentials

# Run
npm run dev
```

### License

Apache-2.0
