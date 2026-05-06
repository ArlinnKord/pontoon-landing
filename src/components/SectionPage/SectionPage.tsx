import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../Container";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import { useCards } from "../../api/useCards";
import styles from "./SectionPage.module.css";

export default function SectionPage() {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const { data, loading, search } = useCards();
  const [query, setQuery] = useState("");

  if (loading) return <p className={styles.loading}>Загрузка…</p>;
  if (!data) return <p className={styles.loading}>Ошибка загрузки</p>;

  const section = data.sections.find((s) => s.slug === sectionSlug);

  if (!section) {
    return (
      <Container>
        <p className={styles.loading}>Раздел не найден</p>
      </Container>
    );
  }

  const results = query.trim()
    ? search(query).filter((item) => item.sectionSlug === sectionSlug)
    : section.cards.map((c) => ({ ...c, sectionTitle: section.title, sectionSlug: section.slug }));

  return (
    <>
      <Helmet>
        <title>{section.title} | MagicTechFlot — суда технического флота</title>
        <meta name="description" content={section.description} />
      </Helmet>
      <section className={styles.page}>
        <Container>
          <Link to="/catalog" className={styles.back}>
            ← Все категории
          </Link>
          <h1 className={styles.title}>{section.title}</h1>
          <p className={styles.subtitle}>{section.description}</p>

          <SearchBar query={query} onChange={setQuery} />

          {results.length === 0 && (
            <p className={styles.empty}>Ничего не найдено</p>
          )}

          {results.map((item) => {
            const card = section.cards.find((c) => c.id === item.id);
            if (!card) return null;
            return <Card key={card.id} card={card} />;
          })}
        </Container>
      </section>
    </>
  );
}
