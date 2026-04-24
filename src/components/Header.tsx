import Container from "./Container";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <span className={styles.logo}>Понтонные сооружения</span>
          <nav>
            <ul className={styles.nav}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
