import { useState } from "react";
import Container from "../Container";
import styles from "./Services.module.css";

interface EquipmentCard {
  title: string;
  description: string;
  images: string[];
}

const cards: EquipmentCard[] = [
  {
    title: "Баржа",
    description: "Для перевозки грузов по воде",
    images: [
      "/images/service_images/barga/main.jpg",
      "/images/service_images/barga/1.jpg",
      "/images/service_images/barga/2.jpg",
      "/images/service_images/barga/3.jpg",
      "/images/service_images/barga/4.jpg",
    ],
  },
  {
    title: "Половодье",
    description: "Спецтехника для работ в период половодья",
    images: [
      "/images/service_images/polovodie/main.jpg",
      "/images/service_images/polovodie/1.jpg",
      "/images/service_images/polovodie/2.jpg",
      "/images/service_images/polovodie/3.png",
    ],
  },
  {
    title: "Толкач",
    description: "Буксировка барж и составов",
    images: ["/images/service_images/tolkach/1.jpg"],
  },
  {
    title: "Земснаряд",
    description: "Для дноуглубительных работ",
    images: [
      "/images/service_images/zemsnaryad/main.PNG",
      "/images/service_images/zemsnaryad/3.PNG",
      "/images/service_images/zemsnaryad/4.PNG",
      "/images/service_images/zemsnaryad/5.PNG",
    ],
  },
  { title: "Плавкран", description: "Подъёмные работы на воде", images: [] },
  { title: "Паром", description: "Переправа автотранспорта и людей", images: [] },
  {
    title: "Буровая установка",
    description: "Бурение скважин с воды",
    images: [],
  },
  {
    title: "Мультикэт",
    description: "Универсальная рабочая платформа",
    images: [],
  },
  {
    title: "Платформа под экскаватор",
    description: "Рабочее место для спецтехники на воде",
    images: [],
  },
  {
    title: "Проект Новосибирск",
    description: "Пассажирское судно",
    images: [],
  },
];

export default function Services() {
  const [modalCard, setModalCard] = useState<EquipmentCard | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openModal = (card: EquipmentCard, imageIndex: number) => {
    setModalCard(card);
    setPhotoIndex(imageIndex);
  };

  const closeModal = () => {
    setModalCard(null);
    setPhotoIndex(0);
  };

  const prevPhoto = () => {
    if (!modalCard) return;
    setPhotoIndex((i) => (i === 0 ? modalCard.images.length - 1 : i - 1));
  };

  const nextPhoto = () => {
    if (!modalCard) return;
    setPhotoIndex((i) => (i === modalCard.images.length - 1 ? 0 : i + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  };

  return (
    <section className={styles.section} id="services">
      <Container>
        <h2 className={styles.heading}>Наши услуги</h2>
        <p className={styles.description}>
          Проектируем и устанавливаем понтонные сооружения любой сложности
        </p>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div
              key={card.title}
              className={styles.card}
              onClick={() => {
                if (card.images.length > 1) openModal(card, 0);
              }}
            >
              <div className={styles.cardImageWrapper}>
                {card.images.length > 0 ? (
                  <>
                    <img
                      className={styles.cardImage}
                      src={card.images[0]}
                      alt={card.title}
                    />
                    {card.images.length > 1 && (
                      <span className={styles.imageCountBadge}>
                        Ещё {card.images.length - 1} фото
                      </span>
                    )}
                  </>
                ) : (
                  <div className={styles.cardPlaceholder}>
                    <span className={styles.cardPlaceholderIcon}>📦</span>
                    <span>Изображение готовится</span>
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.description}</p>
                {card.images.length > 1 && (
                  <p className={styles.cardExtra}>
                    📷 {card.images.length} фото
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {modalCard && (
        <div
          className={styles.overlay}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              ✕
            </button>
            <div className={styles.modalImageWrapper}>
              <img
                className={styles.modalImage}
                src={modalCard.images[photoIndex]}
                alt={`${modalCard.title} — фото ${photoIndex + 1}`}
              />
            </div>
            <div className={styles.modalControls}>
              <button className={styles.modalNavBtn} onClick={prevPhoto}>
                ← Назад
              </button>
              <span className={styles.modalIndicator}>
                {photoIndex + 1} / {modalCard.images.length}
              </span>
              <button className={styles.modalNavBtn} onClick={nextPhoto}>
                Вперёд →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
