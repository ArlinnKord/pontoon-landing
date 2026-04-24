import Container from "../Container";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Причал в Клязьме",
    text: "80 м², рассчитан на 4 катера",
  },
  {
    title: "Платформа на Истре",
    text: "120 м², с зоной для купания",
  },
  {
    title: "Мост через канал",
    text: "15 м, временная переправа",
  },
  {
    title: "Яхт-клуб на Рублёвке",
    text: "200 м² причальная стенка",
  },
  {
    title: "Рыбацкая платформа под Звенигородом",
    text: "10 посадочных мест",
  },
  {
    title: "Индивидуальный понтон на заказ",
    text: "Под ключ, с доставкой",
  },
];

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <Container>
        <h2 className={styles.heading}>Наши проекты</h2>
        <p className={styles.description}>
          Примеры выполненных работ
        </p>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.card}>
              <div className={styles.image}>Изображение</div>
              <div className={styles.body}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.text}>{project.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
