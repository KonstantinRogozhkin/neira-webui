#!/bin/bash

# Скрипт для синхронизации с upstream репозиторием
# Использование: ./sync-upstream.sh

echo "🔄 Начинаю синхронизацию с upstream репозиторием..."

# Проверяем, что мы в git репозитории
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Ошибка: Это не git репозиторий"
    exit 1
fi

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Текущая ветка: $CURRENT_BRANCH"

# Переключаемся на main-sync для синхронизации
echo "🔄 Переключаюсь на main-sync..."
git checkout main-sync

# Получаем обновления из upstream
echo "⬇️ Получаю обновления из upstream..."
git fetch upstream

# Проверяем, есть ли новые коммиты
UPSTREAM_COMMITS=$(git log HEAD..upstream/main --oneline | wc -l)

if [ $UPSTREAM_COMMITS -eq 0 ]; then
    echo "✅ Уже актуально! Нет новых коммитов в upstream"
else
    echo "🆕 Найдено $UPSTREAM_COMMITS новых коммитов в upstream"
    
    # Сливаем изменения
    echo "🔀 Сливаю изменения..."
    if git merge upstream/main; then
        echo "✅ Слияние прошло успешно!"
        
        # Пушим обновленную main-sync в origin
        echo "⬆️ Пушаю обновления в origin/main-sync..."
        git push origin main-sync
        
        # Обновляем main ветку в origin
        echo "⬆️ Обновляю origin/main..."
        git push origin main-sync:main
        
        echo "🎉 Синхронизация завершена успешно!"
    else
        echo "❌ Ошибка при слиянии! Разрешите конфликты вручную"
        echo "💡 После разрешения конфликтов выполните:"
        echo "   git add ."
        echo "   git commit -m 'Resolve merge conflicts'"
        echo "   git push origin main-sync"
        exit 1
    fi
fi

# Возвращаемся на исходную ветку
echo "🔄 Возвращаюсь на ветку $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo "✅ Синхронизация завершена! Теперь можете работать в своей ветке"
echo ""
echo "📋 Полезные команды:"
echo "   ./sync-upstream.sh          - Синхронизировать с upstream"
echo "   git checkout main-sync      - Переключиться на синхронизированную ветку"
echo "   git checkout brand/OHIS     - Переключиться на вашу бренд ветку"
echo "   git rebase main-sync        - Перебазировать вашу ветку на обновления"
