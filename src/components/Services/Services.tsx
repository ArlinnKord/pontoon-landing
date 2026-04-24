import Container from "../Container";
import styles from "./Services.module.css";

const cards = [
  {
    icon: "📦",
    title: "Понтонные причалы",
    text: "Для катеров, яхт и маломерных судов",
  },
  {
    icon: "🏖️",
    title: "Плавучие платформы",
    text: "Для купания, рыбалки и отдыха на воде",
  },
  {
    icon: "🌉",
    title: "Переправы и мосты",
    text: "Временные и постоянные сооружения",
  },
  {
    icon: "⚙️",
    title: "Индивидуальные проекты",
    text: "Разработаем под вашу задачу",
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <Container>
        <h2 className={styles.heading}>Наши услуги</h2>
        <p className={styles.description}>
          Проектируем и устанавливаем понтонные сооружения любой сложности
        </p>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.title} className={styles.card}>
              <span className={styles.icon}>{card.icon}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
