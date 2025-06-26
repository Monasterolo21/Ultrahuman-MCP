# Ultrahuman MCP Server

A Model Context Protocol (MCP) server for fetching health and fitness metrics from the Ultrahuman API. Built with TypeScript and designed for production use.

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build the project:
   ```bash
   bun run build
   ```
4. Configure your environment variables (see Configuration section)
5. Add to Claude Desktop (see Usage section)

## 🔑 Getting Started with Ultrahuman API

Before you can use this MCP server, you'll need to obtain your Ultrahuman credentials. Follow these steps:

### Step 1: Get Your Ultrahuman Email

1. Open the Ultrahuman app on your device
2. Navigate to the **Profile** tab at the bottom of the screen
3. Tap the settings icon (cog icon) in the top left corner
4. Your email address will be displayed at the top of the settings screen
5. Copy this email address - you'll need it for configuration

### Step 2: Request API Key and Partner ID

You must obtain an API key and Partner ID from Ultrahuman by contacting them through one of these methods:

- **Email**: Send a request to `support@ultrahuman.com`
- **In-app chat**: Use the customer service chat within the Ultrahuman app

**Important**: Make sure to include your Ultrahuman email address in your request to speed up the response time.

Once you receive your API key and Partner ID, keep them secure and private.

### Step 3: Configure Partner ID in App

1. Open the Ultrahuman app on your device
2. Navigate to the **Profile** tab at the bottom of the screen
3. Tap the settings icon (cog icon) in the top left corner
4. Scroll down to find the **Partner ID** field
5. Enter the Partner ID code you received from Ultrahuman

### Step 4: Configure the MCP Server

Now you can configure this MCP server with your credentials:

1. Set your environment variables (see Configuration section below)
2. Build and run the server
3. Add it to Claude Desktop with your API credentials

You're all set to start fetching your health data!

## ✨ Key Features

- Fetch comprehensive health metrics from Ultrahuman API
- Heart rate, sleep, steps, temperature, and HRV monitoring
- Built with TypeScript for type safety
- Bun for fast testing and development
- Biome for linting and formatting
- Clean, maintainable project structure

## 📂 Project Structure

```
ultrahuman-mcp/
├── src/
│   ├── tools/          # MCP tools implementation
│   │   └── ultrahumanMetrics/  # Ultrahuman API integration
│   ├── utils/          # Shared utilities
│   ├── main.ts         # Server entry point
│   └── types.ts        # Shared type definitions
├── scripts/            # Build and utility scripts
├── biome.json          # Linting configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## ⚙️ Configuration

This server requires environment variables to authenticate with the Ultrahuman API:

- `ULTRAHUMAN_AUTH_TOKEN`: Your Ultrahuman API authorization token
- `ULTRAHUMAN_USER_EMAIL`: The email address of the Ultrahuman user whose data you want to fetch

The API base URL is configured to `https://partner.ultrahuman.com/api/v1`.

## 🔧 Available Tools

### `ultrahuman_metrics`

Fetches health and fitness metrics from the Ultrahuman API for a specific date. The user email is configured via environment variable, so you only need to specify the date to retrieve comprehensive health data.

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

## 📊 Available Health Data

The API provides comprehensive health metrics including:

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

## 💻 Usage with Claude Desktop

1. Build the project:

   ```bash
   bun run build
   ```

2. Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):
   ```json
   {
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
   }
   ```

## 🧪 Testing

You can test the server by running it directly:

```bash
node dist/main.js
```

The server will listen for MCP requests on stdio and provide the `ultrahuman_metrics` tool to fetch health data from the API.

## 🛠️ Development

- **Run tests**: `bun test`
- **Format code**: `bun run format`
- **Lint code**: `bun run lint`
- **Build project**: `bun run build`

## 📜 Version Management

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated version management. Run `bun run release` to create a new version.

### Commit Message Format

- `feat`: New feature (bumps minor version)
- `fix`: Bug fix (bumps patch version)
- `BREAKING CHANGE`: Breaking change (bumps major version)

## 📦 Publishing to npm

1. Ensure you're logged in to npm:
   ```bash
   npm login
   ```
2. Build the project:
   ```bash
   bun run build
   ```
3. Publish the package:
   ```bash
   npm publish
   ```

## Installing from npm (after publishing)

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "ultrahuman": {
      "command": "npx",
      "args": ["-y", "ultrahuman-mcp"],
      "env": {
        "ULTRAHUMAN_AUTH_TOKEN": "your_token_here",
        "ULTRAHUMAN_USER_EMAIL": "your_email@example.com"
      }
    }
  }
}
```
