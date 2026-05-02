import { Helmet } from "react-helmet-async";
import Container from "../Container";
import styles from "./Pontoons.module.css";

interface PontoonSpec {
  model: string;
  size: string;
  weight: string;
  feature: string;
}

const models: PontoonSpec[] = [
  { model: "SF II 260", size: "500×500×260 мм", weight: "5 кг", feature: "Базовая модель, низкий профиль" },
  { model: "SF II 400", size: "500×500×400 мм", weight: "7 кг", feature: "Базовая модель, высокая" },
  { model: "SB-105 II", size: "500×500×400 мм", weight: "7 кг", feature: "Усиленная плавучесть" },
  { model: "SF II 260 Double", size: "1000×500×260 мм", weight: "8 кг", feature: "Сдвоенный модуль, низкий" },
  { model: "SF II 400 Double", size: "1000×500×400 мм", weight: "11 кг", feature: "Сдвоенный модуль, высокий" },
  { model: "SB-101 IV", size: "1000×500×400 мм", weight: "11 кг", feature: "Усиленный сдвоенный модуль" },
  { model: "SU-101 U-SLIDE", size: "500×500×290 мм", weight: "6.5 кг", feature: "U-образный паз для направляющих" },
  { model: "SV-101 V-SHAPE", size: "500×500×300 мм", weight: "5 кг", feature: "V-образный профиль" },
];

export default function Pontoons() {
  return (
    <section className={styles.page}>
      <Helmet>
        <title>Модули плавучести Magic Float | MagicTechFlot — понтонные блоки из HDPE</title>
        <meta name="description" content="Модули плавучести Magic Float — пластиковые понтонные блоки для сборки причалов, платформ, переправ. Без сварки и регистрации в ГИМС. Срок службы до 50 лет." />
      </Helmet>
      <Container>
        <h1 className={styles.title}>Модули плавучести</h1>
        <p className={styles.subtitle}>
          Мы используем понтонные блоки Magic Float — это модульная система из
          пластиковых кубиков, которые собираются как конструктор. Никакой сварки,
          специальной подготовки или регистрации в ГИМС.
        </p>

        {/* Преимущества */}
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>⚡</span>
            <h3>Быстрый монтаж</h3>
            <p>До 10 м² в час собирается двумя людьми без спецподготовки</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🧊</span>
            <h3>Всепогодный материал</h3>
            <p>HDPE работает от −70°C до +60°C, не вмерзает в лёд, не гниёт</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>♾️</span>
            <h3>Срок службы до 50 лет</h3>
            <p>Бесшовная конструкция, устойчивость к УФ, маслу и солёной воде</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📋</span>
            <h3>Без регистрации</h3>
            <p>Временные несамоходные сооружения не требуют учёта в ГИМС</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔗</span>
            <h3>Модульность</h3>
            <p>Любая конфигурация — пирсы, сцены, паромы, плавучие дома</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🌊</span>
            <h3>Выдерживает волнение</h3>
            <p>До 5 баллов, грузоподъёмность — 376 кг/м²</p>
          </div>
        </div>

        {/* Таблица моделей */}
        <h2 className={styles.sectionTitle}>Модельный ряд</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Модель</th>
                <th>Размер (Д×Ш×В)</th>
                <th>Вес</th>
                <th>Особенность</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.model}>
                  <td className={styles.modelName}>{m.model}</td>
                  <td>{m.size}</td>
                  <td>{m.weight}</td>
                  <td>{m.feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Детали материала */}
        <h2 className={styles.sectionTitle}>О материале</h2>
        <div className={styles.materialInfo}>
          <p>
            Все кубики производятся из <strong>HDPE (полиэтилен низкого давления)</strong>{" "}
            марки Lupolen 5261Z методом экструзионно-выдувного формования. Корпус
            бесшовный — без внутренних напряжений и слабых мест.
          </p>
          <ul className={styles.materialList}>
            <li><strong>Толщина стенки:</strong> 0.8–1 см</li>
            <li><strong>Цвета:</strong> синий, оранжевый, серый</li>
            <li><strong>Срок службы:</strong> до 50 лет</li>
            <li><strong>Стойкость:</strong> к УФ, маслу, бензину, щелочам, солёной воде</li>
          </ul>
        </div>

        {/* Фурнитура */}
        <h2 className={styles.sectionTitle}>Фурнитура</h2>
        <p className={styles.text}>
          Модули соединяются между собой штифтами и винтами. Никакой сварки,
          клея или герметиков — всё держится на пластиковых креплениях. Если
          один модуль повреждается — его можно заменить по отдельности.
        </p>
      </Container>
    </section>
  );
}
