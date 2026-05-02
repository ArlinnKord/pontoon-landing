import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  // === РЕДИРЕКТ С WWW НА БЕЗ WWW (САМЫЙ ПЕРВЫЙ) ===
  const host = req.headers.host;
  if (host && host.startsWith('www.')) {
    const newHost = host.slice(4);
    const target = `https://${newHost}${req.url}`;
    res.writeHead(301, { Location: target });
    res.end();
    return;
  }

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

  // API отправки письма (ОБЯЗАТЕЛЬНО ВЕРНИ ЭТУ ЧАСТЬ!)
  if (req.url === "/api/send-email" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const { name, phone, email, message } = JSON.parse(body);
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "ТВОЙ_КЛЮЧ",
            name: name,
            phone: phone,
            email: email || "",
            message: message || "",
            subject: `Новая заявка с сайта от ${name}`,
          }),
        });

        const result = await response.json();

        if (result.success) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Письмо отправлено" }));
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        console.error("Email error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Ошибка отправки письма" }));
      }
    });
    return;
  }

  // статика
  let filePath = path.join(__dirname, "dist", req.url === "/" ? "index.html" : req.url);

  // Проверяем, не API ли это (на случай если будут ещё API-роуты)
  if (req.url.startsWith("/api/")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: если файл не найден, отдаём index.html
      // React Router сам разберётся с роутингом
      const spaPath = path.join(__dirname, "dist", "index.html");
      fs.readFile(spaPath, (spaErr, spaData) => {
        if (spaErr) {
          res.writeHead(500);
          res.end("Internal error");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(spaData);
      });
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