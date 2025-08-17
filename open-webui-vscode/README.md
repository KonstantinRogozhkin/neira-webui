# OHI-S ASSISTANT - VS Code Extension

🤖 **AI Chat Interface for VS Code - Powered by OHI-S ASSISTANT**

This VS Code extension integrates OHI-S ASSISTANT directly into your development environment, allowing you to chat with AI models without leaving VS Code.

## ✨ Features

- 🚀 **Integrated AI Chat**: Access OHI-S ASSISTANT directly in VS Code
- 🐳 **Docker Integration**: Automatic Docker container management
- 🌐 **WebView & Browser**: Choose between embedded WebView or external browser
- ⚙️ **Configurable**: Customize Docker settings and behavior
- 🔄 **Seamless Workflow**: Stay in your development environment

## 🚀 Quick Start

1. **Install the Extension**: Install from VSIX or build from source
2. **Start Docker Container**: Use command `OHI-S ASSISTANT: Start Docker Container`
3. **Open Chat**: Use command `OHI-S ASSISTANT: Start Chat`

## 📋 Commands

- `OHI-S ASSISTANT: Start Chat` - Opens OHI-S ASSISTANT in WebView or browser
- `OHI-S ASSISTANT: Start Docker Container` - Starts OHI-S ASSISTANT Docker container
- `OHI-S ASSISTANT: Stop Docker Container` - Stops and removes Docker container

## ⚙️ Configuration

The extension can be configured through VS Code settings:

```json
{
  "openwebui.docker.enabled": true,
  "openwebui.docker.image": "ghcr.io/open-webui/open-webui:ollama",
  "openwebui.docker.port": 3000,
  "openwebui.webview.enabled": true
}
```

## 🐳 Docker Requirements

- Docker installed and running
- Port 3000 available (configurable)
- Internet connection for pulling Docker images

## 🔧 Development

### Prerequisites

- Node.js 16+
- TypeScript
- VS Code Extension Development Host

### Build

```bash
npm install
npm run compile
```

### Package

```bash
npm install -g vsce
vsce package
```

This will create a `.vsix` file that can be installed in VS Code.

## 📦 Installation

### From VSIX

1. Download the `.vsix` file
2. In VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. Select the downloaded file

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press `F5` to start debugging

## 🎯 Usage

1. **Start Docker Container**: The extension will automatically manage OHI-S ASSISTANT containers
2. **Open Chat Interface**: Use the command palette to start chatting
3. **Seamless Integration**: Chat with AI while coding without context switching

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the same license as OHI-S ASSISTANT.

## 🔗 Links

- [OHI-S ASSISTANT](https://github.com/open-webui/open-webui)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Docker](https://www.docker.com/)
