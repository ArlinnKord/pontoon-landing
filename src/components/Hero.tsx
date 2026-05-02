import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Суда технического флота | MagicTechFlot — понтонные причалы, платформы, модули плавучести</title>
        <meta name="description" content="MagicTechFlot — проектирование и производство понтонных сооружений: причалы, плавучие платформы, переправы, модули плавучести (понтоны). Собственное производство. Гарантия качества. Доставка по РФ." />
      </Helmet>
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
