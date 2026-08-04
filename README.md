# mcp-genderize

Genderize MCP — gender prediction from first name (genderize.io, free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `predict_gender` | Predict gender from a first name using global data. Returns predicted gender, probability (0–1), and sample size. |
| `predict_gender_country` | Predict gender from a first name in a specific country (e.g., "US", "FR", "DE"). Returns gender, probability, and regional sample size. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "genderize": {
      "url": "https://gateway.pipeworx.io/genderize/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Genderize data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
