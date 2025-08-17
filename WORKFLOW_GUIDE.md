# Workflow Guide: Синхронизация с Upstream + Бренд Ветка

## 🎯 Цель
Настроить workflow, где:
- Основной репозиторий (`upstream`) автоматически синхронизируется
- Ваша бренд ветка (`brand/OHIS`) остается независимой
- Каждая ветка деплоится в свой проект на Vercel

## 🔧 Настройка Remote'ов

```bash
# upstream = основной репозиторий open-webui
git remote add upstream https://github.com/open-webui/open-webui.git

# origin = ваш форк neira-webui  
git remote add origin https://github.com/KonstantinRogozhkin/neira-webui.git
```

## 📋 Структура веток

```
upstream/main (основной репозиторий)
    ↓
main-sync (синхронизированная ветка)
    ↓
origin/main (ваш форк main)
    ↓
brand/OHIS (ваша бренд ветка)
```

## 🔄 Workflow синхронизации

### 1. Автоматическая синхронизация
```bash
# Запустить скрипт синхронизации
./sync-upstream.sh
```

**Что делает скрипт:**
- Переключается на `main-sync`
- Получает обновления из `upstream/main`
- Сливает изменения
- Пушит в `origin/main-sync` и `origin/main`
- Возвращается на исходную ветку

### 2. Ручная синхронизация
```bash
# Переключиться на синхронизационную ветку
git checkout main-sync

# Получить обновления
git fetch upstream

# Слить изменения
git merge upstream/main

# Запушить обновления
git push origin main-sync
git push origin main-sync:main

# Вернуться на бренд ветку
git checkout brand/OHIS
```

## 🚀 Работа с бренд веткой

### 1. Создание новой функциональности
```bash
# Убедиться, что main-sync актуален
git checkout main-sync
./sync-upstream.sh

# Создать feature ветку от main-sync
git checkout -b feature/new-functionality

# Разработать функциональность
# ... ваш код ...

# Слить в brand/OHIS
git checkout brand/OHIS
git merge feature/new-functionality
git push origin brand/OHIS
```

### 2. Обновление бренд ветки
```bash
# Перебазировать бренд ветку на обновления
git checkout brand/OHIS
git rebase main-sync

# Принудительно запушить (если rebase изменил историю)
git push origin brand/OHIS --force-with-lease
```

## 🎯 Vercel деплой

### Настройка проектов:
1. **Production проект** → `origin/main` ветка
2. **OHIS Brand проект** → `origin/brand/OHIS` ветка

### Автоматизация:
- Каждый push в `main` → деплой в Production
- Каждый push в `brand/OHIS` → деплой в OHIS Brand
- Preview деплои для Pull Requests

## 📅 Ежедневный workflow

### Утром (синхронизация):
```bash
./sync-upstream.sh
```

### В течение дня (разработка):
```bash
# Работа в brand/OHIS
git checkout brand/OHIS

# Создание feature веток от main-sync
git checkout main-sync
git checkout -b feature/your-feature

# Разработка и тестирование
# ...

# Слияние в brand/OHIS
git checkout brand/OHIS
git merge feature/your-feature
git push origin brand/OHIS
```

### Вечером (обновление):
```bash
# Проверить, есть ли обновления
git fetch upstream
git log HEAD..upstream/main --oneline

# Если есть - синхронизировать
./sync-upstream.sh
```

## 🚨 Разрешение конфликтов

### При конфликтах в main-sync:
```bash
git checkout main-sync
git merge upstream/main
# Разрешить конфликты вручную
git add .
git commit -m "Resolve merge conflicts"
git push origin main-sync
```

### При конфликтах в brand/OHIS:
```bash
git checkout brand/OHIS
git rebase main-sync
# Разрешить конфликты вручную
git add .
git rebase --continue
git push origin brand/OHIS --force-with-lease
```

## 💡 Полезные команды

```bash
# Проверить статус всех веток
git branch -vv

# Посмотреть remote'ы
git remote -v

# Проверить, отстает ли main-sync от upstream
git log HEAD..upstream/main --oneline

# Проверить, отстает ли brand/OHIS от main-sync
git log HEAD..main-sync --oneline

# Очистить merged ветки
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## 🔒 Безопасность

- **Никогда не пушить напрямую в `main-sync`**
- **Всегда использовать `--force-with-lease` при force push**
- **Регулярно синхронизироваться с upstream**
- **Тестировать изменения перед слиянием в `brand/OHIS`**
