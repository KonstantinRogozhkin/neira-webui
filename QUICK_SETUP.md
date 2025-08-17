# 🚀 Быстрая настройка Vercel деплоя

## ✅ У вас уже есть все данные:

- **Vercel Token**: `RtKStQOLRv9ceuVP5SDnmyF9`
- **Team ID**: `team_mmyrv4Aw7ZCdfrf8WrKsLlYh`
- **Project ID**: `prj_ADkn7besU1s8lrZGEYX9W4m2xxFJ`

## 🔐 Шаг 1: Добавьте секреты в GitHub

1. Перейдите в: `https://github.com/KonstantinRogozhkin/neira-webui`
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** → добавьте:

| Name | Secret |
|------|--------|
| `VERCEL_TOKEN` | `RtKStQOLRv9ceuVP5SDnmyF9` |
| `VERCEL_ORG_ID` | `team_mmyrv4Aw7ZCdfrf8WrKsLlYh` |
| `VERCEL_PROD_PROJECT_ID` | `prj_ADkn7besU1s8lrZGEYX9W4m2xxFJ` |

## 🚀 Шаг 2: Тестирование

### Сделайте тестовый коммит:
```bash
git checkout brand/OHIS
git commit --allow-empty -m "test: trigger Vercel deploy"
git push origin brand/OHIS
```

### Проверьте:
1. **GitHub Actions** → должен запуститься workflow
2. **Vercel Dashboard** → должен появиться новый деплой

## 🎯 Результат

После настройки:
- ✅ Каждый push в `main` → деплой в Vercel
- ✅ Каждый push в `brand/OHIS` → деплой в Vercel
- ✅ Никаких Pull Request'ов не нужно!

## 🚨 Если не работает:

### Проверьте:
- Все секреты добавлены правильно
- Workflow файл `.github/workflows/simple-deploy.yml` существует
- В Vercel отключен Auto Deploy

### Логи:
- GitHub Actions → посмотрите ошибки
- Vercel Dashboard → проверьте статус деплоя
