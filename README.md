# Руководство по запуску проекта

## Обзор
Проект состоит из двух основных частей: **сервер** и **клиент**. Сервер обрабатывает логику на стороне backend и взаимодействует с Telegram с помощью Bot API, а клиент представляет собой frontend-приложение на React.

---

## Требования
- **Node.js**: Установите последнюю стабильную версию с [Node.js](https://nodejs.org/).
- **npm** или **yarn**: Устанавливается вместе с Node.js (рекомендуется npm).
- **Telegram Bot Token**: Получите токен для бота через BotFather в Telegram и добавьте его в `.env` файл для сервера.

---

## Настройка сервера

### 1. Перейдите в папку сервера
```cd server```
### 2. Установите зависимости
```npm install```  
### 3. Настройте переменные окружения
TELEGRAM_BOT_TOKEN=ваш_токен_бота

CHAT_ID=ваш_чат_id
### 4.Запустите сервер
Для продакшена: 

```npm start```

Для разработки (с использованием nodemon для автоматического перезапуска):

```npm run dev```

Сервер будет доступен по адресу http://localhost:5000.

## Настройка клиента
### 1. Перейдите в папку клиента
```cd client```
### 2. Установите зависимости
```npm install```
### 3. Запустите клиент
```npm run dev```

Клиент будет доступен по адресу http://localhost:5173.

### Инструкция по настройке Telegram-бота
## 1. Откройте Telegram и найдите бота по имени @A_NEW_CAR_ORDER_bot.
## 2. Нажмите кнопку "Старт" для активации бота.
## 3. После активации бот начнет принимать заявки из приложения.

