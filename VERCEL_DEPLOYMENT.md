# Vercel Deployment Guide

## Настройка деплоя только фронтенда на Vercel

### 1. Создание проектов в Vercel

Создайте отдельные проекты для каждой ветки:

- **Production проект** (для `main` ветки)
- **Development проект** (для `develop` ветки)  
- **OHIS Brand проект** (для `brand/OHIS` ветки)

### 2. Настройка Build Settings

В каждом проекте настройте:

**Build Command:**
```bash
cd src && npm run build
```

**Output Directory:**
```
src/build
```

**Install Command:**
```bash
cd src && npm install
```

### 3. Настройка Branch Tracking

В каждом проекте в разделе **Settings → Git → Branch Tracking**:

- **Production проект**: `main` ветка
- **Development проект**: `develop` ветка  
- **OHIS Brand проект**: `brand/OHIS` ветка

### 4. Конфигурационные файлы

- `vercel.json` - для production (main ветка)
- `vercel.dev.json` - для development (develop ветка)
- `vercel.json` в brand/OHIS ветке - для OHIS проекта

### 5. Environment Variables

Настройте в каждом проекте:

**Production:**
- `NODE_ENV=production`
- `API_URL=https://your-api.com`

**Development:**
- `NODE_ENV=development`
- `API_URL=https://dev-api.com`

**OHIS Brand:**
- `NODE_ENV=production`
- `API_URL=https://ohis-api.com`

### 6. Автоматизация

Vercel автоматически будет:
- Деплоить `main` ветку в Production проект
- Деплоить `develop` ветку в Development проект
- Деплоить `brand/OHIS` ветку в OHIS Brand проект
- Создавать Preview деплои для Pull Requests

### 7. Проверка деплоя

После настройки:
1. Сделайте push в соответствующую ветку
2. Vercel автоматически запустит сборку
3. Проверьте логи сборки в Vercel Dashboard
4. Убедитесь, что фронтенд доступен по указанному URL

### 8. Troubleshooting

**Ошибка "Build failed":**
- Проверьте, что `src/package.json` существует
- Убедитесь, что все зависимости указаны в `package.json`
- Проверьте логи сборки в Vercel

**Ошибка "Output directory not found":**
- Убедитесь, что `outputDirectory` указывает на правильную папку
- Проверьте, что сборка создает указанную папку

**Ошибка "Framework not detected":**
- Убедитесь, что `framework: "sveltekit"` указан в `vercel.json`
- Проверьте, что `svelte.config.js` находится в папке `src`
