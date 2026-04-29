import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // healthcheck
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }

  // send-email
  if (req.url === "/api/send-email" && req.method === "POST") {
    try {
      const body = await parseBody(req);

      // Настройки SMTP для Reg.ru (правильные!)
      const transporter = nodemailer.createTransport({
        host: "mail.hosting.reg.ru",
        port: 587, // Пробуем использовать порт 587 вместо 465 [citation:1]
        secure: false, // Для порта 587 secure должен быть false
        requireTLS: true, // Принудительно требуем TLS (шифрование на этом порту)
        connectionTimeout: 10000, // Ждём подключения 10 секунд
        greetingTimeout: 10000, // Ждём приветствие сервера 10 секунд
        socketTimeout: 20000, // Ждём ответа от сокета 20 секунд
        auth: {
          user: "sales@magictechflot.ru",
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: "sales@magictechflot.ru",
        to: "sales@magictechflot.ru",
        subject: `Новая заявка с сайта от ${body.name || "Аноним"}`,
        html: `
          <h2>Новое обращение в MagicTechFlot</h2>
          <p><strong>Имя:</strong> ${body.name || "Не указано"}</p>
          <p><strong>Телефон:</strong> ${body.phone || "Не указан"}</p>
          <p><strong>Почта:</strong> ${body.email || "Не указана"}</p>
          <p><strong>Сообщение:</strong> ${body.message || "Пусто"}</p>
        `,
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, message: "Письмо отправлено" }));
    } catch (err) {
      console.error("Email error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: err.message || "Ошибка отправки письма" }),
      );
    }
    return;
  }

  // статика
  let filePath = path.join(
    __dirname,
    "dist",
    req.url === "/" ? "index.html" : req.url,
  );
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(req.url);
    const mime = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
    };
    res.writeHead(200, { "Content-Type": mime[ext] || "text/html" });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`   Healthcheck: http://localhost:${PORT}/health`);
});
