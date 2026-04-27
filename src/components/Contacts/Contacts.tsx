import Container from "../Container";
import Button from "../Button";
import styles from "./Contacts.module.css";

export default function Contacts() {
  const handleSubmit = () => {
    console.log("Форма отправлена");
  };

  return (
    <section className={styles.section} id="contacts">
      <Container>
        <h2 className={styles.heading}>Свяжитесь с нами</h2>
        <p className={styles.subtitle}>
          Оставьте заявку, и мы ответим в течение часа
        </p>
        <div className={styles.grid}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Имя
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                placeholder="Ваше имя"
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
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Сообщение
              </label>
              <textarea
                className={styles.textarea}
                id="message"
                placeholder="Ваше сообщение"
              />
            </div>
            <Button variant="primary" onClick={handleSubmit}>
              Отправить заявку
            </Button>
          </form>
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
