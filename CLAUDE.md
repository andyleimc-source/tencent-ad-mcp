# Tencent Ad MCP Server

腾讯广告 Marketing API v3.0 的 MCP Server 封装。

## 架构

- **语言**: TypeScript + Node.js
- **MCP SDK**: `@modelcontextprotocol/sdk`
- **传输**: stdio

## 项目结构

- `src/tools/` — 手写的核心工具（~42 个高频接口，精细 schema）
- `src/tools/generated/` — 从 Go SDK 自动生成的工具（~316 个接口，通用 schema）
- `src/client.ts` — HTTP 客户端，自动注入 token/timestamp/nonce，自动刷新
- `src/auth.ts` — OAuth token 管理
- `scripts/` — 代码生成器（解析 Go SDK 产出 TypeScript）

## 开发命令

```bash
npm run dev       # 开发模式运行
npm run build     # 编译
npm run generate  # 重新生成工具（需先克隆 Go SDK 到 /tmp/marketing-api-go-sdk）
```

## 工具命名规则

`{api_path}_{operation}`，如 `adgroups_get`、`daily_reports_get`

## 凭证

环境变量：`TENCENT_AD_CLIENT_ID`、`TENCENT_AD_CLIENT_SECRET`、`TENCENT_AD_ACCESS_TOKEN`、`TENCENT_AD_REFRESH_TOKEN`

Token 自动持久化到 `~/.tencent-ad-token.json`
