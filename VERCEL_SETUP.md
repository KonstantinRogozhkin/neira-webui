# Vercel Setup Guide: Автоматический деплой без Pull Request'ов

## 🎯 Что мы настраиваем

Автоматический деплой в Vercel при каждом push в ветку:
- `main` → Production проект
- `brand/OHIS` → OHIS Brand проект  
- `develop` → Development проект

## 🔑 Шаг 1: Получение Vercel токенов

### 1.1 Vercel Access Token
1. Зайдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдите в **Settings → Tokens**
3. Создайте новый токен с названием `GitHub Actions`
4. Скопируйте токен (понадобится для `VERCEL_TOKEN`)

### 1.2 Organization ID
1. В Vercel Dashboard перейдите в **Settings → General**
2. Скопируйте **Team ID** (понадобится для `VERCEL_ORG_ID`)

### 1.3 Project IDs
Для каждого проекта:

#### Production проект (main ветка):
1. Откройте Production проект
2. Перейдите в **Settings → General**
3. Скопируйте **Project ID** (понадобится для `VERCEL_PROD_PROJECT_ID`)

#### OHIS Brand проект (brand/OHIS ветка):
1. Откройте OHIS Brand проект
2. Перейдите в **Settings → General**
3. Скопируйте **Project ID** (понадобится для `VERCEL_OHIS_PROJECT_ID`)

#### Development проект (develop ветка):
1. Откройте Development проект
2. Перейдите в **Settings → General**
3. Скопируйте **Project ID** (понадобится для `VERCEL_DEV_PROJECT_ID`)

## 🔐 Шаг 2: Настройка GitHub Secrets

### 2.1 Перейдите в ваш GitHub репозиторий
```
https://github.com/KonstantinRogozhkin/neira-webui
```

### 2.2 Откройте Settings → Secrets and variables → Actions

### 2.3 Добавьте следующие секреты:

| Secret Name | Value | Описание |
|-------------|-------|----------|
| `VERCEL_TOKEN` | `v2_...` | Vercel Access Token |
| `VERCEL_ORG_ID` | `team_...` | Vercel Organization/Team ID |
| `VERCEL_PROD_PROJECT_ID` | `prj_...` | Production проект ID |
| `VERCEL_OHIS_PROJECT_ID` | `prj_...` | OHIS Brand проект ID |
| `VERCEL_DEV_PROJECT_ID` | `prj_...` | Development проект ID |

## 🚀 Шаг 3: Настройка Vercel проектов

### 3.1 Production проект (main ветка)
1. **Build Command**: `cd src && npm run build`
2. **Output Directory**: `src/build`
3. **Install Command**: `cd src && npm install`
4. **Framework Preset**: SvelteKit

### 3.2 OHIS Brand проект (brand/OHIS ветка)
1. **Build Command**: `cd src && npm run build`
2. **Output Directory**: `src/build`
3. **Install Command**: `cd src && npm install`
4. **Framework Preset**: SvelteKit

### 3.3 Development проект (develop ветка)
1. **Build Command**: `cd src && npm run build`
2. **Output Directory**: `src/build`
3. **Install Command**: `cd src && npm install`
4. **Framework Preset**: SvelteKit

## 🔄 Шаг 4: Отключение автоматического деплоя в Vercel

### 4.1 В каждом проекте:
1. Перейдите в **Settings → Git**
2. Отключите **Auto Deploy** для всех веток
3. Оставьте только **Manual Deploy**

**Зачем?** Теперь деплой будет происходить только через GitHub Actions, что дает больше контроля.

## ✅ Шаг 5: Тестирование

### 5.1 Тест main ветки:
```bash
git checkout main
git commit --allow-empty -m "test: trigger production deploy"
git push origin main
```

### 5.2 Тест brand/OHIS ветки:
```bash
git checkout brand/OHIS
git commit --allow-empty -m "test: trigger OHIS deploy"
git push origin brand/OHIS
```

### 5.3 Проверка:
1. Перейдите в **Actions** в GitHub
2. Убедитесь, что workflow запустился
3. Проверьте логи сборки
4. Убедитесь, что деплой прошел в Vercel

## 🎯 Результат

После настройки:
- ✅ Каждый push в `main` → автоматический деплой в Production
- ✅ Каждый push в `brand/OHIS` → автоматический деплой в OHIS Brand
- ✅ Каждый push в `develop` → автоматический деплой в Development
- ✅ Никаких Pull Request'ов не нужно!
- ✅ Полный контроль через GitHub Actions

## 🚨 Troubleshooting

### Ошибка "Build failed":
- Проверьте, что все секреты настроены правильно
- Убедитесь, что `src/package.json` существует
- Проверьте логи в GitHub Actions

### Ошибка "Vercel deployment failed":
- Проверьте `VERCEL_TOKEN` и права доступа
- Убедитесь, что Project ID указан правильно
- Проверьте настройки проекта в Vercel

### Ошибка "Framework not detected":
- Убедитесь, что Framework Preset установлен в SvelteKit
- Проверьте, что `svelte.config.js` находится в папке `src`
