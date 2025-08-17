# 🚀 Быстрый старт OHI-S ASSISTANT VS Code Extension

## 📦 Установка

1. **Скачайте .vsix файл**: `open-webui-0.1.0.vsix`
2. **В VS Code**: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. **Выберите файл** и перезапустите VS Code

## 🎯 Использование

### Команды (Command Palette: `Ctrl+Shift+P`)

- `OHI-S ASSISTANT: Start Docker Container` - Запускает контейнер
- `OHI-S ASSISTANT: Start Chat` - Открывает чат в WebView
- `OHI-S ASSISTANT: Stop Docker Container` - Останавливает контейнер

### Быстрый старт

1. **Запустите Docker контейнер**
2. **Откройте чат** - OHI-S ASSISTANT появится прямо в VS Code!
3. **Начните общаться** с ИИ моделями

## ⚙️ Настройки

```json
{
  "openwebui.docker.enabled": true,
  "openwebui.docker.port": 3000,
  "openwebui.webview.enabled": true
}
```

## 🔧 Требования

- ✅ Docker запущен
- ✅ Порт 3000 свободен
- ✅ Интернет для загрузки образов

## 🎉 Готово!

Теперь у вас есть полноценный AI чат прямо в VS Code! 🤖
