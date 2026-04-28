import { useState } from "react";
import Container from "../Container";
import Button from "../Button";
import styles from "./Contacts.module.css";

export default function Contacts() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.section} id="contacts">
      <Container>
        <h2 className={styles.heading}>Свяжитесь с нами</h2>
        <p className={styles.subtitle}>
          Оставьте заявку, и мы ответим в течение часа
        </p>
        <div className={styles.grid}>
          {status === "success" ? (
            <div className={styles.successMessage}>
              <h3>Спасибо за заявку!</h3>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Имя
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Телефон
                </label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Ваш Email
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ivan@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">
                  Сообщение
                </label>
                <textarea
                  className={styles.textarea}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваше сообщение"
                />
              </div>

              <Button variant="primary" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Отправка..." : "Отправить заявку"}
              </Button>

              {status === "error" && (
                <p className={styles.errorMessage}>
                  Ошибка отправки. Попробуйте позже или позвоните нам.
                </p>
              )}
            </form>
          )}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Телефон</span>
              <p className={styles.infoValue}>
                <a href="tel:+79332902299" className={styles.link}>
                  +7 (933) 290-22-99
                </a>
              </p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <p className={styles.infoValue}>
                <a href="mailto:sales@magictechflot.ru" className={styles.link}>
                  sales@magictechflot.ru
                </a>
              </p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Адрес</span>
              <p className={styles.infoValue}>
                МО, Истринский р-н, посёлок Первомайский, д.17 Территория
                Новоиерусалимского кирпичного завода
              </p>
            </div>
            <div className={styles.map}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?pt=36.793576,55.913007&z=16"
                width="100%"
                height="100%"
                style={{ border: "none", borderRadius: "12px" }}
                title="Карта проезда"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}