import styles from "./SearchBar.module.css";

interface Props {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск по характеристикам, названию, классу…"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
