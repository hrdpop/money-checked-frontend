# Используем официальный образ Node.js
FROM node:22-alpine

# Устанавливаем зависимости
WORKDIR /app

COPY . .


# Просто держим контейнер активным
CMD ["tail", "-f", "/dev/null"]