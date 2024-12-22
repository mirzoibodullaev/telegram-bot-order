const express = require("express");
const WebSocket = require("ws");
require("dotenv").config();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();
const PORT = 5000;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
});
const wss = new WebSocket.Server({ port: 8080 }); // WebSocket-сервер на порту 8080

wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    ws.on("message", (message) => {
        console.log("Received:", message);
    });
});
function broadcastMessage(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

app.use(cors());
app.use(bodyParser.json());

let pendingOrders = {};

app.get("/", (req, res) => {
    res.send("Сервер работает.");
});

app.get("/api/generate-order", (req, res) => {
    const orderId = uuidv4();
    res.json({ orderId });
});

app.post("/api/send-order", (req, res) => {
    const { orderId, name, phone } = req.body;
    pendingOrders[orderId] = { name, phone };

    bot.sendMessage(
        process.env.CHAT_ID,
        `Новая заявка:\nИмя: ${name}\nНомер: ${phone}.`,
        {
            reply_markup: {
                inline_keyboard: [[{ text: "Car", callback_data: orderId }]],
            },
        }
    );

    res.status(200).json({ message: "Заявка отправлена!" });
});

bot.on("callback_query", (query) => {
    const orderId = query.data;
    const chatId = query.message.chat.id;

    if (pendingOrders[orderId]) {
        pendingOrders[orderId].chatId = chatId;
    }

    bot.answerCallbackQuery(query.id, {
        text: "Пожалуйста, вернитесь в браузер и введите название машины.",
    });

    bot.sendMessage(
        chatId,
        "Пожалуйста, вернитесь в браузер и введите название машины."
    );

    broadcastMessage({
        type: "popup",
        orderId,
    });
});

app.post("/api/car-name", (req, res) => {
    const { orderId, carName } = req.body;
    const order = pendingOrders[orderId];

    if (order) {
        const { name, phone, chatId } = order;

        bot.sendMessage(
            chatId || process.env.CHAT_ID,
            `Машина для заявки ${orderId}: ${carName}\nИмя: ${name}\nНомер: ${phone}`
        );

        res.status(200).json({ message: "Данные успешно отправлены!" });
    } else {
        res.status(400).json({ message: "Заявка не найдена." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
