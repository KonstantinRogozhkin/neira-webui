import * as vscode from 'vscode';
import Docker from 'dockerode';

export function activate(context: vscode.ExtensionContext) {
    console.log('OHI-S ASSISTANT extension is now active!');

    // Docker integration
    const docker = new Docker();

    // Command: Start OHI-S ASSISTANT Chat
    let startChatCommand = vscode.commands.registerCommand('openwebui.start', async () => {
        const config = vscode.workspace.getConfiguration('openwebui');
        const webviewEnabled = config.get<boolean>('webview.enabled', true);

        if (webviewEnabled) {
            // Open in WebView
            openWebView(context);
        } else {
            // Open in external browser
            openExternalBrowser();
        }
    });

    // Command: Start Docker Container
    let startDockerCommand = vscode.commands.registerCommand('openwebui.docker.start', async () => {
        try {
            await startDockerContainer(docker);
            vscode.window.showInformationMessage('OHI-S ASSISTANT Docker container started successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to start Docker container: ${error}`);
        }
    });

    // Command: Stop Docker Container
    let stopDockerCommand = vscode.commands.registerCommand('openwebui.docker.stop', async () => {
        try {
            await stopDockerContainer(docker);
            vscode.window.showInformationMessage('OHI-S ASSISTANT Docker container stopped successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to stop Docker container: ${error}`);
        }
    });

    context.subscriptions.push(startChatCommand, startDockerCommand, stopDockerCommand);
}

function openWebView(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'openWebUI',
        'OHI-S ASSISTANT - AI Chat',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.joinPath(context.extensionUri, 'media'),
                vscode.Uri.joinPath(context.extensionUri, 'out')
            ]
        }
    );

    // Get the webview content
    panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
}

function openExternalBrowser() {
    const config = vscode.workspace.getConfiguration('openwebui');
    const port = config.get<number>('docker.port', 3000);
    const url = `http://localhost:${port}`;
    
    vscode.env.openExternal(vscode.Uri.parse(url));
}

async function startDockerContainer(docker: Docker) {
    const config = vscode.workspace.getConfiguration('openwebui');
    const image = config.get<string>('docker.image', 'ghcr.io/open-webui/open-webui:ollama');
    const port = config.get<number>('docker.port', 3000);

    try {
        // Check if container already exists
        const containers = await docker.listContainers({ all: true });
        const existingContainer = containers.find((container: any) => 
            container.Names.some((name: string) => name.includes('open-webui'))
        );

        if (existingContainer) {
            if (existingContainer.State === 'running') {
                vscode.window.showInformationMessage('OHI-S ASSISTANT container is already running!');
                return;
            } else {
                // Start existing container
                const container = docker.getContainer(existingContainer.Id);
                await container.start();
                return;
            }
        }

        // Create and start new container
        const container = await docker.createContainer({
            Image: image,
            name: 'open-webui-vscode',
            ExposedPorts: { '8080/tcp': {} },
            HostConfig: {
                PortBindings: {
                    '8080/tcp': [{ HostPort: port.toString() }]
                },
                Binds: [
                    'ollama:/root/.ollama',
                    'open-webui:/app/backend/data'
                ],
                RestartPolicy: { Name: 'always' }
            },
            Env: [
                'OLLAMA_BASE_URL=http://127.0.0.1:11434'
            ]
        });

        await container.start();
        vscode.window.showInformationMessage(`OHI-S ASSISTANT container started on port ${port}`);

    } catch (error) {
        throw new Error(`Docker error: ${error}`);
    }
}

async function stopDockerContainer(docker: Docker) {
    try {
        const containers = await docker.listContainers({ all: true });
        const container = containers.find((container: any) => 
            container.Names.some((name: string) => name.includes('open-webui-vscode'))
        );

        if (container) {
            const dockerContainer = docker.getContainer(container.Id);
            await dockerContainer.stop();
            await dockerContainer.remove();
        } else {
            vscode.window.showInformationMessage('No OHI-S ASSISTANT container found to stop.');
        }
    } catch (error) {
        throw new Error(`Docker error: ${error}`);
    }
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OHI-S ASSISTANT - AI Chat</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 2em;
                    font-weight: bold;
                    color: var(--vscode-textLink-foreground);
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .status {
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    background: var(--vscode-input-background);
                    border: 1px solid var(--vscode-input-border);
                }
                .button {
                    background: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin: 5px;
                }
                .button:hover {
                    background: var(--vscode-button-hoverBackground);
                }
                .iframe-container {
                    width: 100%;
                    height: 600px;
                    border: 1px solid var(--vscode-input-border);
                    border-radius: 8px;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🤖 OHI-S ASSISTANT</div>
                    <p>AI Chat Interface for VS Code</p>
                </div>
                
                <div class="status">
                    <h3>Status</h3>
                    <p>OHI-S ASSISTANT is running in VS Code WebView.</p>
                    <button class="button" onclick="openExternal()">Open in Browser</button>
                    <button class="button" onclick="refreshIframe()">Refresh</button>
                </div>

                <div class="iframe-container">
                    <iframe id="webui-frame" src="http://localhost:3000" title="OHI-S ASSISTANT"></iframe>
                </div>
            </div>

            <script>
                function openExternal() {
                    vscode.postMessage({ command: 'openExternal' });
                }

                function refreshIframe() {
                    const iframe = document.getElementById('webui-frame');
                    iframe.src = iframe.src;
                }

                // Handle messages from extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.command) {
                        case 'refresh':
                            refreshIframe();
                            break;
                    }
                });
            </script>
        </body>
        </html>
    `;
}

export function deactivate() {
    console.log('OHI-S ASSISTANT extension deactivated');
}
