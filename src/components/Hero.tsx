import Container from "./Container";
import Button from "./Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToContacts = () => {
    const el = document.getElementById("contacts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Производство судов технического флота
          </h1>
          <p className={styles.subtitle}>
            Собственное проектирование. Поставка под ключ. Работаем по всей
            России
          </p>
          <Button onClick={scrollToContacts}>Связаться с нами</Button>
        </div>
      </Container>
    </section>
  );
}
