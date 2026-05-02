import Container from "../Container";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <p className={styles.logo}>Суда технического флота</p>
            <p className={styles.description}>
              Проектирование и установка понтонных сооружений и комплексов под ключ
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
            <a href="tel:+79332902299" className={styles.contactItem}>
              +7 (933) 290-22-99
            </a>
            <a href="mailto:sales@magictechflot.ru" className={styles.contactItem}>
              sales@magictechflot.ru
            </a>
          </div>
        </div>
        <hr className={styles.divider} />
        <p className={styles.copyright}>
          &copy; {year} Суда технического флота. Все права защищены.
        </p>
      </Container>
    </footer>
  );
}
