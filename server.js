import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
      const { createTransport } = await import("nodemailer");
      // Пароль от почтового ящика на reg.ru — в переменной EMAIL_PASSWORD
      const transporter = createTransport({
        host: "mail.hosting.reg.ru",
        port: 465,
        secure: true,
        auth: {
          user: "sales@magictechflot.ru",
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: `"${body.name || "Аноним"}" <sales@magictechflot.ru>`,
        to: "sales@magictechflot.ru",
        subject: `Сообщение от ${body.name || "Аноним"}`,
        html: `
          <h2>Новое обращение в MagicTechFlot</h2>
          <p><strong>Имя:</strong> ${body.name || "Не указано"}</p>
          <p><strong>Телефон:</strong> ${body.phone || "Не указан"}</p>
          <p><strong>Почта:</strong> ${body.email || "Не указана"}</p>
          <p><strong>Сообщение:</strong> ${body.message || "Пусто"}</p>
        `,
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      console.error("Email error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Ошибка отправки" }));
    }
    return;
  }

  // статика
  let filePath = path.join(__dirname, "dist", req.url === "/" ? "index.html" : req.url);
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
  console.log(`Server started on port ${PORT}`);
});
