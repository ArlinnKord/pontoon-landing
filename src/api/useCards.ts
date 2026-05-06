import { useState, useEffect, useMemo } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";

export interface Card {
  id: string;
  title: string;
  photo1: string;
  length: string;
  width: string;
  boardHeight: string;
  draftEmpty: string;
  photo2: string;
  class: string;
  description: string;
  price: string;
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  description: string;
  cards: Card[];
}

export interface CardsData {
  sections: Section[];
}

const fuseOptions: IFuseOptions<Card & { sectionTitle: string }> = {
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
    { name: "class", weight: 1 },
    { name: "length", weight: 0.5 },
    { name: "width", weight: 0.5 },
    { name: "boardHeight", weight: 0.5 },
    { name: "draftEmpty", weight: 0.5 },
    { name: "price", weight: 0.5 },
    { name: "sectionTitle", weight: 0.5 },
  ],
  threshold: 0.4,
};

export function useCards() {
  const [data, setData] = useState<CardsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((json: CardsData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load cards:", err);
        setLoading(false);
      });
  }, []);

  const allCardsWithSection = useMemo(() => {
    if (!data) return [];
    return data.sections.flatMap((s) =>
      s.cards.map((c) => ({ ...c, sectionTitle: s.title, sectionSlug: s.slug }))
    );
  }, [data]);

  const fuse = useMemo(
    () => new Fuse(allCardsWithSection, fuseOptions),
    [allCardsWithSection]
  );

  function search(query: string) {
    if (!query.trim()) return allCardsWithSection;
    return fuse.search(query).map((r) => r.item);
  }

  return { data, loading, search, allCards: allCardsWithSection };
}
