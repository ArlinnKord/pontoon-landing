import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
console.log("Booting server.js...");
console.log("CWD:", process.cwd());
console.log("PORT:", process.env.PORT);
const PORT = process.env.PORT || 8080;

// парсинг JSON и form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// healthcheck для Timeweb
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// раздача статики (собранный сайт)
app.use(express.static(path.join(__dirname, "dist")));

// API отправки письма
app.post("/api/send-email", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Заполните имя и телефон" });
  }

  const transporter = nodemailer.createTransport({
    host: "ssl://smtp.reg.ru",
    port: 465,
    secure: true,
    auth: {
      user: "sales@magictechflot.ru",
      pass: process.env.EMAIL_PASSWORD || "",
    },
  });

  try {
    await transporter.sendMail({
      from: "sales@magictechflot.ru",
      to: "sales@magictechflot.ru",
      subject: "Новая заявка с лендинга",
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
      `,
    });
    res.json({ message: "Письмо отправлено" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ message: "Ошибка отправки" });
  }
});

// все остальные пути — отдаём index.html (SPA)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} (0.0.0.0)`);
});
