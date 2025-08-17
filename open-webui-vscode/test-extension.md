# 🧪 Тестирование VS Code Расширения OHI-S ASSISTANT

## 📋 Предварительные требования

- VS Code установлен
- Docker запущен
- Расширение скомпилировано

## 🚀 Способы тестирования

### 1. Отладка в VS Code (Рекомендуется)

1. Откройте папку `open-webui-vscode` в VS Code
2. Нажмите `F5` для запуска Extension Development Host
3. В новом окне VS Code:
   - Откройте Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Выполните команду `OHI-S ASSISTANT: Start Docker Container`
   - Затем `OHI-S ASSISTANT: Start Chat`

### 2. Установка .vsix файла

1. В VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
2. Выберите файл `open-webui-0.1.0.vsix`
3. Перезапустите VS Code
4. Используйте команды из Command Palette

## 🎯 Тестируемые функции

- ✅ Запуск Docker контейнера
- ✅ Остановка Docker контейнера  
- ✅ Открытие WebView с OHI-S ASSISTANT
- ✅ Открытие в браузере
- ✅ Конфигурация через settings.json

## 🔧 Настройка для тестирования

Добавьте в `settings.json`:

```json
{
  "openwebui.docker.enabled": true,
  "openwebui.docker.image": "ghcr.io/open-webui/open-webui:ollama",
  "openwebui.docker.port": 3000,
  "openwebui.webview.enabled": true
}
```

## 🐛 Отладка

- Проверьте Output панель → "OHI-S ASSISTANT"
- Проверьте Developer Tools в WebView
- Проверьте Docker контейнеры: `docker ps`

## 📝 Логи

Логи расширения доступны в:
- Output → "OHI-S ASSISTANT"
- Developer Console (F12 в WebView)
- Docker logs: `docker logs open-webui-vscode`
