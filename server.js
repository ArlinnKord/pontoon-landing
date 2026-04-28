import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;
const distIndex = path.join(__dirname, "dist", "index.html");

const server = http.createServer((req, res) => {
  // healthcheck
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  // API (пока без nodemailer)
  if (req.url === "/api/send-email" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { name, phone } = JSON.parse(body);
      console.log("Заявка получена:", { name, phone });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "OK (тест)" }));
    });
    return;
  }

  // статика
  const filePath = path.join(__dirname, "dist", req.url === "/" ? "index.html" : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(distIndex, (err2, data2) => {
        if (err2) {
          res.writeHead(500);
          return res.end("Internal error");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data2);
      });
    } else {
      const ext = path.extname(req.url);
      const mime = {
        ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
        ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
      };
      res.writeHead(200, { "Content-Type": mime[ext] || "text/html" });
      res.end(data);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});