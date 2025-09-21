# Используем официальный образ Node.js на Alpine (маленький и безопасный)
FROM node:20-alpine AS base

# Стадия сборки (builder)
FROM base AS builder
WORKDIR /app

# Копируем файлы, необходимые для установки зависимостей
COPY package.json package-lock.json* ./
# Отдельно копируем Prisma schema, так как он нужен для генерации клиента
COPY prisma ./prisma

# Устанавливаем все зависимости (включая devDependencies) для сборки
RUN npm ci

# Генерируем Prisma Client
RUN npx prisma generate

# Копируем весь исходный код
COPY . .

# Собираем проект (компилируем TypeScript в JS) -> теперь в ./build
RUN npm run build

# Стадия финального образа (production)
FROM base AS production
WORKDIR /app

# Меняем пользователя на node для безопасности (не запускаем от root)
USER node

# Копируем package.json и package-lock.json
COPY --chown=node:node package.json package-lock.json* ./
# Копируем сгенерированный Prisma client из стадии builder
COPY --chown=node:node --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Копируем собранный JavaScript-код -> из папки ./build
COPY --chown=node:node --from=builder /app/build ./build
# Копируем папку prisma, она может понадобиться
COPY --chown=node:node prisma ./prisma

# Устанавливаем ТОЛЬКО production-зависимости (без devDependencies)
RUN npm ci --only=production && npm cache clean --force

# Открываем порт, на котором работает приложение
EXPOSE 3000

# Команда для запуска приложения -> запускаем из ./build
CMD ["node", "build/index.js"]