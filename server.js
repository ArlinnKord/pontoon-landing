import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

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

  // API отправки письма через Web3Forms
  if (req.url === "/api/send-email" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const { name, phone, email, message } = JSON.parse(body);
        
        // Отправляем запрос к Web3Forms с правильным JSON форматом
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: "505f9fcc-ed9b-49d8-a953-088a09352009",
            name: name,
            phone: phone,
            email: email || "",
            message: message || "",
            subject: `Новая заявка с сайта от ${name}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Email sent successfully");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Письмо отправлено" }));
        } else {
          console.error("Web3Forms error:", result);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: result.message || "Ошибка отправки" }));
        }
      } catch (err) {
        console.error("Server error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Внутренняя ошибка сервера" }));
      }
    });
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
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});