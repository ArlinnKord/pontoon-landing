import { useState } from "react";
import type { Card } from "../../api/useCards";
import QuestionnaireModal from "../QuestionnaireModal/QuestionnaireModal";
import styles from "./Card.module.css";

interface Props {
  card: Card;
}

export default function Card({ card }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.photoWrap}>
          <img
            className={styles.photo}
            src={card.photo1}
            alt={`${card.title} — фото 1`}
          />
        </div>
        <dl className={styles.specs}>
          <div className={styles.specItem}>
            <dt>Длина</dt>
            <dd>{card.length}</dd>
          </div>
          <div className={styles.specItem}>
            <dt>Ширина</dt>
            <dd>{card.width}</dd>
          </div>
          <div className={styles.specItem}>
            <dt>Высота борта</dt>
            <dd>{card.boardHeight}</dd>
          </div>
          <div className={styles.specItem}>
            <dt>Осадка порожнём</dt>
            <dd>{card.draftEmpty}</dd>
          </div>
        </dl>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.photoWrap}>
          <img
            className={styles.photo}
            src={card.photo2}
            alt={`${card.title} — фото 2`}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.classBadge}>{card.class}</span>
          <p className={styles.description}>{card.description}</p>
          <p className={styles.price}>{card.price}</p>
          <button
            className={styles.btn}
            onClick={() => setShowModal(true)}
          >
            Заполнить опросный лист
          </button>
        </div>
      </div>

      {showModal && (
        <QuestionnaireModal
          card={card}
          onClose={() => setShowModal(false)}
        />
      )}
    </article>
  );
}
