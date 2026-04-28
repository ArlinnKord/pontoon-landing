import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  // Простая валидация
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Настройки SMTP Reg.ru
  const transporter = nodemailer.createTransporter({
    host: 'mail.hosting.reg.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'sales@magictechflot.ru',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: 'sales@magictechflot.ru',
      to: 'sales@magictechflot.ru',
      subject: `Новая заявка с сайта от ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'не указан'}</p>
        <p><strong>Сообщение:</strong> ${message || 'не указано'}</p>
      `,
    });

    res.status(200).json({ message: 'Письмо отправлено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка отправки письма' });
  }
}