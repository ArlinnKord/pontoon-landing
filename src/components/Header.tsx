import { useLocation, Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            Суда технического флота
          </Link>
          <nav>
            <ul className={styles.nav}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  {isHome ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <a href={"/" + link.href}>{link.label}</a>
                  )}
                </li>
              ))}
              <li>
                <Link to="/modules">Модули плавучести</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
