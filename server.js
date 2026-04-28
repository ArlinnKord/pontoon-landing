import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

const distIndex = path.join(__dirname, "dist", "index.html");

const server = http.createServer((req, res) => {
  // healthcheck
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  // API отправки письма
  if (req.url === "/api/send-email" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { name, phone } = JSON.parse(body);
      if (!name || !phone) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Заполните имя и телефон" }));
      }

      // nodemailer — пробуем импорт по требованию
      import("nodemailer").then((nodemailer) => {
        const transporter = nodemailer.createTransport({
          host: "ssl://smtp.reg.ru",
          port: 465,
          secure: true,
          auth: {
            user: "sales@magictechflot.ru",
            pass: process.env.EMAIL_PASSWORD || "",
          },
        });

        transporter
          .sendMail({
            from: "sales@magictechflot.ru",
            to: "sales@magictechflot.ru",
            subject: "Новая заявка с лендинга",
            html: `<h2>Новая заявка</h2><p><strong>Имя:</strong> ${name}</p><p><strong>Телефон:</strong> ${phone}</p>`,
          })
          .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Письмо отправлено" }));
          })
          .catch((err) => {
            console.error("Send error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Ошибка отправки" }));
          });
      });
    });
    return;
  }

  // статика
  const filePath = path.join(
    __dirname,
    "dist",
    req.url === "/" ? "index.html" : req.url
  );
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback
      fs.readFile(distIndex, (err2, data2) => {
        if (err2) {
          res.writeHead(500);
          return res.end("Internal error");
        }
        const ext = path.extname(req.url);
        const mime = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".svg": "image/svg+xml",
          ".ico": "image/x-icon",
        };
        res.writeHead(200, {
          "Content-Type": mime[ext] || "text/html",
        });
        res.end(data2);
      });
    } else {
      const ext = path.extname(req.url);
      const mime = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
      };
      res.writeHead(200, { "Content-Type": mime[ext] || "text/html" });
      res.end(data);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} (0.0.0.0)`);
});
