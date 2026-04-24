import Container from "./Container";
import Button from "./Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Понтонные причалы и платформы под ключ
          </h1>
          <p className={styles.subtitle}>
            Собственное производство. Установка за 5 дней
          </p>
          <Button>Рассчитать проект</Button>
        </div>
      </Container>
    </section>
  );
}
