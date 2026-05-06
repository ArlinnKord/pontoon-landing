import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useCards } from "../../api/useCards";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const { data, loading } = useCards();

  if (loading) return <p className={styles.loading}>Загрузка…</p>;
  if (!data) return <p className={styles.loading}>Ошибка загрузки</p>;

  return (
    <>
      <Helmet>
        <title>Каталог судов технического флота | MagicTechFlot</title>
        <meta
          name="description"
          content="Производство судов технического флота из понтонных модулей: баржи, толкачи, земснаряды, паромы, плавкраны, платформы и другие плавучие конструкции."
        />
      </Helmet>
      <section className={styles.page}>
        <Container>
          <h1 className={styles.title}>Суда технического флота</h1>
          <p className={styles.subtitle}>
            Все плавучие конструкции производятся из модулей Magic Float.
            Выберите категорию для просмотра подробных характеристик.
          </p>
          <div className={styles.grid}>
            {data.sections.map((s) => (
              <Link key={s.id} to={`/catalog/${s.slug}`} className={styles.card}>
                <h2 className={styles.cardTitle}>{s.title}</h2>
                <p className={styles.cardDesc}>{s.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
