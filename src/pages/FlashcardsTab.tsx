import React, { useState, useRef, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonBadge
} from '@ionic/react';
import {
  volumeHighOutline,
  syncOutline,
  addCircleOutline,
  layersOutline,
  checkmarkDoneCircleOutline
} from 'ionicons/icons';
import { CefrLevel } from '../data/englishData';
import { SrsRating, useProgress } from '../context/ProgressContext';
import { TopStatsHeader } from '../components/TopStatsHeader';
import { speakEnglish } from '../services/speechService';

export const FlashcardsTab: React.FC = () => {
  const { state, allFlashcards, reviewFlashcard, addCustomFlashcard } = useProgress();
  const [filterMode, setFilterMode] = useState<'DUE' | 'ALL'>('DUE');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [srsAnnouncement, setSrsAnnouncement] = useState('');

  // Native <dialog> reference for creating custom flashcards locally
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [newEn, setNewEn] = useState('');
  const [newEs, setNewEs] = useState('');
  const [newIpa, setNewIpa] = useState('');
  const [newExampleEn, setNewExampleEn] = useState('');
  const [newExampleEs, setNewExampleEs] = useState('');
  const [newLevel, setNewLevel] = useState<CefrLevel>('B1');

  useEffect(() => {
    document.title = 'Flashcards SRS | LinguaFlow';
  }, []);

  const now = Date.now();
  const dueCards = allFlashcards.filter((card) => {
    const srs = state.srsStates[card.id];
    if (!srs) return true;
    return srs.nextReviewAt <= now;
  });

  const activeDeck = filterMode === 'DUE' ? dueCards : allFlashcards;
  const safeIndex = activeDeck.length > 0 ? currentIndex % activeDeck.length : 0;
  const currentCard = activeDeck[safeIndex];

  const handleRateCard = (rating: SrsRating) => {
    if (!currentCard) return;
    reviewFlashcard(currentCard.id, rating);
    setIsFlipped(false);

    const ratingLabels: Record<SrsRating, string> = {
      again: 'programada para repetir en 1 minuto',
      hard: 'programada para repaso en 6 horas',
      good: 'dominada, próximo repaso en días',
      easy: 'memorizada fácilmente, intervalo extendido'
    };
    setSrsAnnouncement(`Tarjeta ${currentCard.en} ${ratingLabels[rating]}.`);

    if (activeDeck.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % activeDeck.length);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleCreateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEn.trim() || !newEs.trim()) return;

    addCustomFlashcard({
      en: newEn.trim(),
      es: newEs.trim(),
      ipa: newIpa.trim() || '/—/',
      exampleEn: newExampleEn.trim() || `Example using ${newEn.trim()}.`,
      exampleEs: newExampleEs.trim() || `Ejemplo usando ${newEs.trim()}.`,
      level: newLevel,
      category: 'Personalizada'
    });

    setNewEn('');
    setNewEs('');
    setNewIpa('');
    setNewExampleEn('');
    setNewExampleEs('');
    dialogRef.current?.close();
    setSrsAnnouncement(`Nueva tarjeta ${newEn.trim()} guardada localmente (+15 XP).`);
  };

  const masteredCount = Object.values(state.srsStates).filter((s) => s.box >= 3).length;

  return (
    <IonPage>
      <TopStatsHeader title="Flashcards con Repaso Espaciado (SRS)" />
      <IonContent className="ion-padding">
        <main className="app-container">
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            {srsAnnouncement}
          </div>

          <section className="hero-banner">
            <div className="hero-banner-top">
              <div>
                <h1 className="page-main-heading">Mazo Inteligente SRS</h1>
                <p className="hero-subtitle">
                  Algoritmo de repetición espaciada local: repasa justo antes de olvidar y añade tu propio vocabulario.
                </p>
              </div>
              <div className="srs-stats-pills">
                <IonBadge color="warning">{dueCards.length} pendientes hoy</IonBadge>
                <IonBadge color="success">{masteredCount} dominadas</IonBadge>
                <IonBadge color="tertiary">{allFlashcards.length} totales</IonBadge>
              </div>
            </div>

            <div className="flashcard-toolbar">
              <div className="level-filter-bar" role="group" aria-label="Filtro de mazo SRS">
                <button
                  type="button"
                  className={`level-pill-btn ${filterMode === 'DUE' ? 'active' : ''}`}
                  aria-pressed={filterMode === 'DUE'}
                  onClick={() => {
                    setFilterMode('DUE');
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                >
                  Pendientes hoy ({dueCards.length})
                </button>
                <button
                  type="button"
                  className={`level-pill-btn ${filterMode === 'ALL' ? 'active' : ''}`}
                  aria-pressed={filterMode === 'ALL'}
                  onClick={() => {
                    setFilterMode('ALL');
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                >
                  Explorar todo el mazo ({allFlashcards.length})
                </button>
              </div>

              <IonButton
                size="small"
                color="secondary"
                onClick={() => dialogRef.current?.showModal()}
              >
                <IonIcon slot="start" icon={addCircleOutline} aria-hidden="true" />
                Nueva Tarjeta (+15 XP)
              </IonButton>
            </div>
          </section>

          {currentCard ? (
            <section className="srs-stage" aria-label="Tarjeta de estudio">
              <div className="flashcard-box">
                <div className="flashcard-top-bar">
                  <span className="cefr-tag">
                    {currentCard.level} • {currentCard.category}
                  </span>
                  <span className="card-counter">
                    Tarjeta {safeIndex + 1} de {activeDeck.length} ({
                      state.srsStates[currentCard.id]
                        ? `Caja SRS ${state.srsStates[currentCard.id].box}/5`
                        : 'Nueva'
                    })
                  </span>
                </div>

                <div className="flashcard-front">
                  <h2 className="flashcard-term" lang="en">
                    {currentCard.en}
                  </h2>
                  <p className="flashcard-ipa">{currentCard.ipa}</p>

                  <div className="audio-controls-row">
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => speakEnglish(currentCard.en, 0.92)}
                    >
                      <IonIcon slot="start" icon={volumeHighOutline} aria-hidden="true" />
                      Escuchar Palabra
                    </IonButton>
                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => speakEnglish(currentCard.exampleEn, 0.92)}
                    >
                      <IonIcon slot="start" icon={layersOutline} aria-hidden="true" />
                      Escuchar Ejemplo
                    </IonButton>
                  </div>
                </div>

                {!isFlipped ? (
                  <div className="flip-cta-area">
                    <p className="example-preview" lang="en">
                      “{currentCard.exampleEn}”
                    </p>
                    <IonButton
                      expand="block"
                      size="large"
                      onClick={() => setIsFlipped(true)}
                    >
                      <IonIcon slot="start" icon={syncOutline} aria-hidden="true" />
                      Mostrar Significado y Evaluar
                    </IonButton>
                  </div>
                ) : (
                  <div className="flashcard-back">
                    <div className="translation-reveal">
                      <span className="reveal-label">Significado en español:</span>
                      <p className="translation-main">{currentCard.es}</p>
                      <p className="example-en-text" lang="en">
                        “{currentCard.exampleEn}”
                      </p>
                      <p className="example-es-text">“{currentCard.exampleEs}”</p>
                    </div>

                    <div className="srs-rating-grid" role="group" aria-label="Calificar retención de memoria">
                      <button
                        type="button"
                        className="srs-btn again"
                        onClick={() => handleRateCard('again')}
                      >
                        <strong>Otra vez</strong>
                        <span>&lt; 1 min • +3 XP</span>
                      </button>
                      <button
                        type="button"
                        className="srs-btn hard"
                        onClick={() => handleRateCard('hard')}
                      >
                        <strong>Difícil</strong>
                        <span>6 horas • +5 XP</span>
                      </button>
                      <button
                        type="button"
                        className="srs-btn good"
                        onClick={() => handleRateCard('good')}
                      >
                        <strong>Bien</strong>
                        <span>1–5 días • +8 XP</span>
                      </button>
                      <button
                        type="button"
                        className="srs-btn easy"
                        onClick={() => handleRateCard('easy')}
                      >
                        <strong>Fácil</strong>
                        <span>3–10 días • +10 XP</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="empty-srs-card">
              <IonIcon
                icon={checkmarkDoneCircleOutline}
                className="summary-trophy-icon"
                aria-hidden="true"
              />
              <h2>¡Estás al día con tus repasos SRS!</h2>
              <p>
                Has completado todas las tarjetas programadas para este momento. Puedes repasar el mazo completo o agregar vocabulario nuevo.
              </p>
              <IonButton onClick={() => setFilterMode('ALL')}>
                Practicar con Todo el Mazo
              </IonButton>
            </section>
          )}

          {/* Native HTML <dialog> modal para crear tarjeta personalizada */}
          <dialog
            ref={dialogRef}
            className="native-modal-dialog"
            aria-labelledby="new-card-dialog-title"
          >
            <form onSubmit={handleCreateCardSubmit} className="dialog-form">
              <h2 id="new-card-dialog-title">Añadir Nueva Tarjeta al Mazo Local</h2>

              <div className="form-group">
                <label htmlFor="fc-en-input">Palabra o frase en inglés:</label>
                <input
                  id="fc-en-input"
                  type="text"
                  lang="en"
                  required
                  className="modern-text-input"
                  placeholder="Ej. Serendipity"
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fc-es-input">Traducción al español:</label>
                <input
                  id="fc-es-input"
                  type="text"
                  required
                  className="modern-text-input"
                  placeholder="Ej. Hallazgo afortunado e inesperado"
                  value={newEs}
                  onChange={(e) => setNewEs(e.target.value)}
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="fc-ipa-input">Fonética (opcional):</label>
                  <input
                    id="fc-ipa-input"
                    type="text"
                    className="modern-text-input"
                    placeholder="Ej. /ˌser.ənˈdɪp.ə.ti/"
                    value={newIpa}
                    onChange={(e) => setNewIpa(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fc-level-select">Nivel CEFR:</label>
                  <select
                    id="fc-level-select"
                    className="modern-text-input"
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as CefrLevel)}
                  >
                    <option value="A1">A1 - Principiante</option>
                    <option value="A2">A2 - Elemental</option>
                    <option value="B1">B1 - Intermedio</option>
                    <option value="B2">B2 - Intermedio Alto</option>
                    <option value="C1">C1 - Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="fc-ex-en-input">Oración de ejemplo en inglés (opcional):</label>
                <input
                  id="fc-ex-en-input"
                  type="text"
                  lang="en"
                  className="modern-text-input"
                  placeholder="Ej. Finding that book was pure serendipity."
                  value={newExampleEn}
                  onChange={(e) => setNewExampleEn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fc-ex-es-input">Traducción del ejemplo (opcional):</label>
                <input
                  id="fc-ex-es-input"
                  type="text"
                  className="modern-text-input"
                  placeholder="Ej. Encontrar ese libro fue pura casualidad afortunada."
                  value={newExampleEs}
                  onChange={(e) => setNewExampleEs(e.target.value)}
                />
              </div>

              <div className="dialog-actions">
                <IonButton
                  type="button"
                  fill="clear"
                  onClick={() => dialogRef.current?.close()}
                >
                  Cancelar
                </IonButton>
                <IonButton type="submit" color="primary">
                  Guardar Tarjeta
                </IonButton>
              </div>
            </form>
          </dialog>
        </main>
      </IonContent>
    </IonPage>
  );
};
