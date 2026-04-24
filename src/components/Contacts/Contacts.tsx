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
              <p className={styles.infoValue}>+7 (XXX) XXX-XX-XX</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <p className={styles.infoValue}>info@pontoon-company.ru</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Адрес</span>
              <p className={styles.infoValue}>
                Московская область, г. Мытищи, ул. Строителей, 10
              </p>
            </div>
            <div className={styles.map}>Здесь будет карта Яндекса</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
