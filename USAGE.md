# Ultrahuman MCP Server - Usage Guide

## Configuration

Yo {
"mcpServers": {
"ultrahuman": {
"command": "node",
"args": ["/path/to/your/project/dist/main.js"],
"env": {
"ULTRAHUMAN_AUTH_TOKEN": "your_token_here",
"ULTRAHUMAN_USER_EMAIL": "your_email@example.com"
}
}
}
}er is now configured to fetch data from the Ultrahuman API. The server requires these environment variables:

- `ULTRAHUMAN_AUTH_TOKEN`: Your Ultrahuman API authorization token
- `ULTRAHUMAN_USER_EMAIL`: The email address of the Ultrahuman user whose data you want to fetch

The API base URL is hardcoded to `https://partner.ultrahuman.com/api/v1`.

## Available Tool

### `ultrahuman_metrics`

Fetches health and fitness metrics from the Ultrahuman API for a specific date. The user email is configured via environment variable, so you only need to specify the date to retrieve health data including heart rate, sleep, steps, temperature, and other biometric measurements.

**Parameters:**

- `date`: Date in YYYY-MM-DD format to fetch metrics for (e.g., '2025-06-19')

**Example Usage:**

```json
{
  "name": "ultrahuman_metrics",
  "arguments": {
    "date": "2025-06-19"
  }
}
```

## What Data is Available

The API returns comprehensive health metrics including:

- **Heart Rate**: Continuous heart rate monitoring with timestamps
- **Skin Temperature**: Body temperature variations throughout the day
- **HRV (Heart Rate Variability)**: Heart rate variability measurements
- **Steps**: Step count data with activity tracking
- **Sleep Data**: Detailed sleep analysis including:
  - Sleep stages (Deep, Light, REM, Awake)
  - Sleep efficiency and quality metrics
  - Heart rate and HRV during sleep
  - Temperature variations during sleep
- **Recovery Index**: Overall recovery score
- **Movement Index**: Activity and movement metrics
- **VO2 Max**: Cardiovascular fitness indicator

## Adding to Claude Desktop

1. Build the project:

   ```bash
   npm run build
   ```

2. Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "ultrahuman": {
         "command": "node",
         "args": ["/path/to/your/project/dist/main.js"],
         "env": {
           "ULTRAHUMAN_AUTH_TOKEN": "your_token_here"
         }
       }
     }
   }
   ```

## Testing

You can test the server by running it directly:

```bash
node dist/main.js
```

The server will listen for MCP requests on stdio and provide the `ultrahuman_metrics` tool to fetch health data from the API.
