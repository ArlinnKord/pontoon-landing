import Container from "../Container";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "Причал в Клязьме",
    text: "80 м², рассчитан на 4 катера",
    image: "/images/IMG_20260424_052110.png",
  },
  {
    title: "Платформа на Истре",
    text: "120 м², с зоной для купания",
    image: "/images/IMG_20260424_052111.png",
  },
  {
    title: "Мост через канал",
    text: "15 м, временная переправа",
    image: "/images/IMG_20260424_052113.png",
  },
  {
    title: "Яхт-клуб на Рублёвке",
    text: "200 м² причальная стенка",
    image: "/images/IMG_20260424_052114.png",
  },
  {
    title: "Рыбацкая платформа под Звенигородом",
    text: "10 посадочных мест",
    image: "/images/IMG_20260424_052116.png",
  },
  {
    title: "Индивидуальный понтон на заказ",
    text: "Под ключ, с доставкой",
    image: "/images/IMG_20260424_052118.png",
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
              <img
                className={styles.image}
                src={project.image}
                alt={project.title}
              />
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
