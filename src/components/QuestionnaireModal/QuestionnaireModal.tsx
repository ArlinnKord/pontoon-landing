import { useState, type FormEvent } from "react";
import type { Card } from "../../api/useCards";
import styles from "./QuestionnaireModal.module.css";

interface Props {
  card: Card;
  onClose: () => void;
}

interface FormData {
  location: string;
  purpose: string;
  crewCount: string;

  waterType: string;
  waterDepth: string;
  depthRange: string;
  currentSpeed: string;

  workVolume: string;
  requiredCapacity: string;
  slurryDistance: string;
  slurryHeight: string;

  soilType: string;
  granulometry: string;
  soilDensity: string;
  looseningFactor: string;

  driveType: string;
  extraEquipment: string;

  spudDevice: boolean;
  papilloningDevice: boolean;
  propulsion: boolean;
  sleepingPlaces: boolean;
  specialRequirements: string;
}

const initialForm: FormData = {
  location: "",
  purpose: "",
  crewCount: "",

  waterType: "",
  waterDepth: "",
  depthRange: "",
  currentSpeed: "",

  workVolume: "",
  requiredCapacity: "",
  slurryDistance: "",
  slurryHeight: "",

  soilType: "",
  granulometry: "",
  soilDensity: "",
  looseningFactor: "",

  driveType: "",
  extraEquipment: "",

  spudDevice: false,
  papilloningDevice: false,
  propulsion: false,
  sleepingPlaces: false,
  specialRequirements: "",
};

export default function QuestionnaireModal({ card, onClose }: Props) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Опросный лист для:", card.title, form);
    setSubmitted(true);
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (submitted) {
    return (
      <div className={styles.overlay} onClick={handleOverlay}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
          <div className={styles.success}>
            <h2>Спасибо!</h2>
            <p>
              Опросный лист для "{card.title}" отправлен. Мы свяжемся с вами в
              ближайшее время.
            </p>
            <button className={styles.submitBtn} onClick={onClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={handleOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>
          Опросный лист &mdash; {card.title}
        </h2>

        <form onSubmit={handleSubmit}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colNum}>№ п/п</th>
                <th className={styles.colQuestion}>Вопрос</th>
                <th className={styles.colAnswer}>Ответ</th>
              </tr>
            </thead>
            <tbody>
              {/* ===== Общие сведения ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Общие сведения</td>
              </tr>
              <tr>
                <td className={styles.colNum}>1</td>
                <td className={styles.colQuestion}>
                  Местоположение объекта (регион, водоём, координаты)
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>2</td>
                <td className={styles.colQuestion}>
                  Цель использования земснаряда
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.purpose}
                    onChange={(e) => update("purpose", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>3</td>
                <td className={styles.colQuestion}>Численность экипажа</td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.crewCount}
                    onChange={(e) => update("crewCount", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>

              {/* ===== Условия эксплуатации ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Условия эксплуатации</td>
              </tr>
              <tr>
                <td className={styles.colNum}>4</td>
                <td className={styles.colQuestion}>
                  Тип водоёма (река, озеро, море, канал и т.п.)
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.waterType}
                    onChange={(e) => update("waterType", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>5</td>
                <td className={styles.colQuestion}>
                  Глубина водоёма на участке работ, м
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.waterDepth}
                    onChange={(e) => update("waterDepth", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>6</td>
                <td className={styles.colQuestion}>
                  Диапазон рабочих глубин (мин./макс.), м
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.depthRange}
                    onChange={(e) => update("depthRange", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>7</td>
                <td className={styles.colQuestion}>
                  Скорость течения, м/с
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.currentSpeed}
                    onChange={(e) => update("currentSpeed", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>

              {/* ===== Параметры работ ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Параметры работ</td>
              </tr>
              <tr>
                <td className={styles.colNum}>8</td>
                <td className={styles.colQuestion}>
                  Объём дноуглубительных работ / добычи, м&sup3;
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.workVolume}
                    onChange={(e) => update("workVolume", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>9</td>
                <td className={styles.colQuestion}>
                  Требуемая производительность по грунту, м&sup3;/ч
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.requiredCapacity}
                    onChange={(e) => update("requiredCapacity", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>10</td>
                <td className={styles.colQuestion}>
                  Дальность транспортировки пульпы, м
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.slurryDistance}
                    onChange={(e) => update("slurryDistance", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>11</td>
                <td className={styles.colQuestion}>
                  Высота подъёма пульпы, м
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.slurryHeight}
                    onChange={(e) => update("slurryHeight", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>

              {/* ===== Характеристики грунта ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Характеристики грунта</td>
              </tr>
              <tr>
                <td className={styles.colNum}>12</td>
                <td className={styles.colQuestion}>
                  Тип грунта (песок, ил, глина, гравий и т.д.)
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.soilType}
                    onChange={(e) => update("soilType", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>13</td>
                <td className={styles.colQuestion}>
                  Гранулометрический состав грунта (фракции, мм)
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.granulometry}
                    onChange={(e) => update("granulometry", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>14</td>
                <td className={styles.colQuestion}>
                  Плотность грунта в естественном залегании, т/м&sup3;
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.soilDensity}
                    onChange={(e) => update("soilDensity", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>15</td>
                <td className={styles.colQuestion}>
                  Коэффициент разрыхления грунта
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.looseningFactor}
                    onChange={(e) => update("looseningFactor", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>

              {/* ===== Требования к оборудованию ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Требования к оборудованию</td>
              </tr>
              <tr>
                <td className={styles.colNum}>16</td>
                <td className={styles.colQuestion}>
                  Тип привода (электрический / гидравлический)
                </td>
                <td className={styles.colAnswer}>
                  <select
                    value={form.driveType}
                    onChange={(e) => update("driveType", e.target.value)}
                    className={styles.input}
                  >
                    <option value="">— выберите —</option>
                    <option value="electric">Электрический</option>
                    <option value="hydraulic">Гидравлический</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>17</td>
                <td className={styles.colQuestion}>
                  Дополнительное оборудование (фреза-рыхлитель, гидроразмыв)
                </td>
                <td className={styles.colAnswer}>
                  <input
                    type="text"
                    value={form.extraEquipment}
                    onChange={(e) => update("extraEquipment", e.target.value)}
                    className={styles.input}
                  />
                </td>
              </tr>

              {/* ===== Требования к оснащению ===== */}
              <tr className={styles.sectionRow}>
                <td colSpan={3}>Требования к оснащению</td>
              </tr>
              <tr>
                <td className={styles.colNum}>18</td>
                <td className={styles.colQuestion}>Закольное устройство</td>
                <td className={styles.colAnswer}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={form.spudDevice}
                      onChange={(e) => update("spudDevice", e.target.checked)}
                    />
                    Да
                  </label>
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>19</td>
                <td className={styles.colQuestion}>
                  Папильонажное устройство
                </td>
                <td className={styles.colAnswer}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={form.papilloningDevice}
                      onChange={(e) =>
                        update("papilloningDevice", e.target.checked)
                      }
                    />
                    Да
                  </label>
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>20</td>
                <td className={styles.colQuestion}>Движители</td>
                <td className={styles.colAnswer}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={form.propulsion}
                      onChange={(e) => update("propulsion", e.target.checked)}
                    />
                    Да
                  </label>
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>21</td>
                <td className={styles.colQuestion}>Наличие спальных мест</td>
                <td className={styles.colAnswer}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={form.sleepingPlaces}
                      onChange={(e) =>
                        update("sleepingPlaces", e.target.checked)
                      }
                    />
                    Да
                  </label>
                </td>
              </tr>
              <tr>
                <td className={styles.colNum}>22</td>
                <td className={styles.colQuestion}>
                  Специальные требования (наличие дополнительных помещений,
                  отопление/кондиционирование, оснащение промерным комплексом и
                  т.п.)
                </td>
                <td className={styles.colAnswer}>
                  <textarea
                    value={form.specialRequirements}
                    onChange={(e) =>
                      update("specialRequirements", e.target.value)
                    }
                    className={styles.textarea}
                    rows={3}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              Отправить
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
