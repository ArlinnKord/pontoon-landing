import Container from "../Container";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <p className={styles.logo}>Понтонные сооружения</p>
            <p className={styles.description}>
              Проектирование и установка понтонных сооружений под ключ
            </p>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Навигация</h3>
            <nav className={styles.nav}>
              <a className={styles.link} href="#services">
                Услуги
              </a>
              <a className={styles.link} href="#projects">
                Проекты
              </a>
              <a className={styles.link} href="#contacts">
                Контакты
              </a>
            </nav>
          </div>
          <div>
            <h3 className={styles.columnTitle}>Контакты</h3>
            <p className={styles.contactItem}>+7 (XXX) XXX-XX-XX</p>
            <p className={styles.contactItem}>info@pontoon-company.ru</p>
          </div>
        </div>
        <hr className={styles.divider} />
        <p className={styles.copyright}>
          &copy; {year} Понтонные сооружения. Все права защищены.
        </p>
      </Container>
    </footer>
  );
}
