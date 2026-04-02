# mcp-genderize

MCP server for gender prediction from first names via [genderize.io](https://genderize.io/). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `predict_gender` | Predict gender from a first name using global data |
| `predict_gender_country` | Predict gender calibrated to a specific country |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "genderize_predict_gender",
      "arguments": { "name": "Alex" }
    },
    "id": 1
  }'
```

## License

MIT
