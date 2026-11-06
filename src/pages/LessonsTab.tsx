import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonProgressBar,
  IonChip,
  IonLabel
} from '@ionic/react';
import {
  volumeHighOutline,
  checkmarkCircle,
  closeCircle,
  sparklesOutline,
  arrowForwardOutline,
  refreshOutline,
  headsetOutline,
  schoolOutline,
  speedometerOutline
} from 'ionicons/icons';
import {
  CefrLevel,
  CEFR_LEVEL_INFO,
  Exercise,
  Lesson,
  LESSONS_DATA
} from '../data/englishData';
import { useProgress } from '../context/ProgressContext';
import { TopStatsHeader } from '../components/TopStatsHeader';
import { normalizeEnglishText, speakEnglish } from '../services/speechService';

export const LessonsTab: React.FC = () => {
  const { state, completeLesson } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>('ALL');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lessonFinished, setLessonFinished] = useState(false);

  // Per-exercise state
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [writtenAnswer, setWrittenAnswer] = useState<string>('');
  const [selectedEnPair, setSelectedEnPair] = useState<string | null>(null);
  const [selectedEsPair, setSelectedEsPair] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [shuffledEsPairs, setShuffledEsPairs] = useState<{ id: string; es: string }[]>([]);

  const [feedback, setFeedback] = useState<{
    checked: boolean;
    isCorrect: boolean;
    message: string;
  }>({ checked: false, isCorrect: false, message: '' });

  useEffect(() => {
    document.title = activeLesson
      ? `${activeLesson.title} | LinguaFlow`
      : 'Ruta de Lecciones | LinguaFlow';
  }, [activeLesson]);

  const initExerciseState = (exercise: Exercise) => {
    setSelectedOption('');
    setWrittenAnswer('');
    setSelectedEnPair(null);
    setSelectedEsPair(null);
    setMatchedPairIds([]);
    setFeedback({ checked: false, isCorrect: false, message: '' });

    if (exercise.type === 'order_sentence' && exercise.wordsBank) {
      setOrderedWords([]);
      setAvailableWords([...exercise.wordsBank]);
    }
    if (exercise.type === 'match_pairs' && exercise.pairs) {
      const copy = exercise.pairs.map((p) => ({ id: p.id, es: p.es }));
      copy.sort(() => Math.random() - 0.5);
      setShuffledEsPairs(copy);
    }
    if (exercise.englishAudioText && exercise.type === 'listen_write') {
      setTimeout(() => speakEnglish(exercise.englishAudioText || '', 0.92), 250);
    }
  };

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentExIndex(0);
    setCorrectCount(0);
    setLessonFinished(false);
    initExerciseState(lesson.exercises[0]);
  };

  const handlePairSelection = (side: 'en' | 'es', pairId: string, exercise: Exercise) => {
    if (matchedPairIds.includes(pairId) || feedback.checked) return;

    const nextEn = side === 'en' ? pairId : selectedEnPair;
    const nextEs = side === 'es' ? pairId : selectedEsPair;

    setSelectedEnPair(nextEn);
    setSelectedEsPair(nextEs);

    if (nextEn && nextEs) {
      if (nextEn === nextEs) {
        const pairObj = exercise.pairs?.find((p) => p.id === nextEn);
        if (pairObj) {
          speakEnglish(pairObj.en, 0.95);
        }
        const updated = [...matchedPairIds, nextEn];
        setMatchedPairIds(updated);
        setSelectedEnPair(null);
        setSelectedEsPair(null);

        if (exercise.pairs && updated.length === exercise.pairs.length) {
          setCorrectCount((c) => c + 1);
          setFeedback({
            checked: true,
            isCorrect: true,
            message: `¡Excelente! Emparejaste todos los conceptos. ${exercise.explanation}`
          });
        }
      } else {
        setTimeout(() => {
          setSelectedEnPair(null);
          setSelectedEsPair(null);
        }, 400);
      }
    }
  };

  const verifyCurrentExercise = () => {
    if (!activeLesson) return;
    const ex = activeLesson.exercises[currentExIndex];
    let isCorrect = false;

    if (ex.type === 'multiple_choice') {
      isCorrect = selectedOption === ex.correctAnswer;
    } else if (ex.type === 'order_sentence') {
      const built = normalizeEnglishText(orderedWords.join(' '));
      const target = normalizeEnglishText(ex.targetSentence || '');
      isCorrect = built === target;
    } else if (ex.type === 'listen_write') {
      const userNorm = normalizeEnglishText(writtenAnswer);
      const expectedNorm = normalizeEnglishText(ex.expectedTranscript || '');
      isCorrect = userNorm === expectedNorm;
    }

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      if (ex.englishAudioText) {
        speakEnglish(ex.englishAudioText, 0.96);
      }
    }

    setFeedback({
      checked: true,
      isCorrect,
      message: isCorrect
        ? `¡Correcto! ${ex.explanation}`
        : `Respuesta esperada: "${
            ex.correctAnswer || ex.targetSentence || ex.expectedTranscript
          }". ${ex.explanation}`
    });
  };

  const goToNextExercise = () => {
    if (!activeLesson) return;
    const nextIdx = currentExIndex + 1;
    if (nextIdx < activeLesson.exercises.length) {
      setCurrentExIndex(nextIdx);
      initExerciseState(activeLesson.exercises[nextIdx]);
    } else {
      const total = activeLesson.exercises.length;
      const pct = Math.round((correctCount / total) * 100);
      completeLesson(activeLesson.id, pct, activeLesson.xpReward);
      setLessonFinished(true);
    }
  };

  const filteredLessons =
    selectedLevel === 'ALL'
      ? LESSONS_DATA
      : LESSONS_DATA.filter((l) => l.level === selectedLevel);

  const dailyGoalRatio = Math.min(1, state.todayXp / state.dailyGoalXp);

  return (
    <IonPage>
      <TopStatsHeader title="Lecciones Interactivas" />
      <IonContent className="ion-padding">
        <main className="app-container">
          {/* Live region centralizada para anunciar resultados de ejercicios */}
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            {feedback.checked ? feedback.message : ''}
          </div>

          {!activeLesson && (
            <>
              <section className="hero-banner">
                <div className="hero-banner-top">
                  <div>
                    <h1 className="page-main-heading">Ruta de Inglés por Niveles (A1–C1)</h1>
                    <p className="hero-subtitle">
                      Domina gramática, escucha activa, construcción de frases y vocabulario con guardado 100% local.
                    </p>
                  </div>
                  <div className="daily-goal-box">
                    <span>
                      Meta diaria: <strong>{state.todayXp}</strong> / {state.dailyGoalXp} XP
                    </span>
                    <IonProgressBar value={dailyGoalRatio} color="success" />
                  </div>
                </div>

                <nav aria-label="Filtrar lecciones por nivel CEFR" className="level-filter-bar">
                  {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`level-pill-btn ${selectedLevel === lvl ? 'active' : ''}`}
                      aria-pressed={selectedLevel === lvl}
                      onClick={() => setSelectedLevel(lvl)}
                    >
                      {lvl === 'ALL' ? 'Todos los niveles' : `Nivel ${lvl}`}
                    </button>
                  ))}
                </nav>
              </section>

              <section className="lessons-grid" aria-label="Listado de lecciones disponibles">
                {filteredLessons.map((lesson) => {
                  const completedInfo = state.completedLessons[lesson.id];
                  const levelMeta = CEFR_LEVEL_INFO[lesson.level];
                  return (
                    <IonCard key={lesson.id} className="lesson-card">
                      <IonCardHeader>
                        <div className="lesson-card-top-row">
                          <span
                            className="cefr-tag"
                            style={{
                              backgroundColor: `${levelMeta.color}20`,
                              color: levelMeta.color
                            }}
                          >
                            {lesson.level} • {lesson.category}
                          </span>
                          <IonBadge color="primary">+{lesson.xpReward} XP</IonBadge>
                        </div>
                        <IonCardTitle className="lesson-title">
                          <h2>{lesson.title}</h2>
                        </IonCardTitle>
                        <IonCardSubtitle>{lesson.subtitle}</IonCardSubtitle>
                      </IonCardHeader>

                      <IonCardContent>
                        <div className="lesson-meta-row">
                          <span>{lesson.exercises.length} ejercicios variados</span>
                          {completedInfo ? (
                            <span className="completed-badge">
                              <IonIcon icon={checkmarkCircle} color="success" aria-hidden="true" /> Mejor puntaje:{' '}
                              <strong>{completedInfo.bestScore}%</strong>
                            </span>
                          ) : (
                            <span className="pending-badge">Nuevo módulo</span>
                          )}
                        </div>

                        <IonButton
                          expand="block"
                          className="ion-margin-top"
                          onClick={() => startLesson(lesson)}
                        >
                          <IonIcon slot="start" icon={schoolOutline} aria-hidden="true" />
                          {completedInfo ? 'Repasar Lección' : 'Comenzar Lección'}
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </section>
            </>
          )}

          {activeLesson && !lessonFinished && (
            <section className="exercise-runner-card" aria-label="Ejercicio en curso">
              <div className="runner-header">
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={() => setActiveLesson(null)}
                >
                  Salir a la ruta
                </IonButton>
                <div className="runner-progress-wrap">
                  <span>
                    Ejercicio {currentExIndex + 1} de {activeLesson.exercises.length}
                  </span>
                  <IonProgressBar
                    value={(currentExIndex + 1) / activeLesson.exercises.length}
                    color="primary"
                  />
                </div>
                <IonBadge color="secondary">{activeLesson.level}</IonBadge>
              </div>

              {(() => {
                const ex = activeLesson.exercises[currentExIndex];
                return (
                  <div className="exercise-body">
                    <span className="exercise-type-tag">
                      {ex.type === 'multiple_choice' && 'Opción Múltiple'}
                      {ex.type === 'order_sentence' && 'Ordenar Oración'}
                      {ex.type === 'listen_write' && 'Escuchar y Escribir'}
                      {ex.type === 'match_pairs' && 'Emparejar Pares'}
                    </span>

                    <h1 className="exercise-prompt">{ex.promptEs}</h1>

                    {ex.englishAudioText && (
                      <div className="audio-controls-row">
                        <IonButton
                          fill="outline"
                          size="small"
                          onClick={() => speakEnglish(ex.englishAudioText || '', 0.95)}
                        >
                          <IonIcon slot="start" icon={volumeHighOutline} aria-hidden="true" />
                          Escuchar pronunciación
                        </IonButton>
                        <IonButton
                          fill="clear"
                          size="small"
                          onClick={() => speakEnglish(ex.englishAudioText || '', 0.68)}
                        >
                          <IonIcon slot="start" icon={speedometerOutline} aria-hidden="true" />
                          Lento (0.7x)
                        </IonButton>
                      </div>
                    )}

                    {/* 1. Multiple Choice */}
                    {ex.type === 'multiple_choice' && (
                      <div className="mc-container">
                        {ex.questionEn && (
                          <p className="english-quote" lang="en">
                            “{ex.questionEn}”
                          </p>
                        )}
                        <div className="mc-options-grid" role="group" aria-label="Opciones de respuesta">
                          {ex.options?.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              lang="en"
                              disabled={feedback.checked}
                              aria-pressed={selectedOption === opt}
                              className={`mc-option-btn ${
                                selectedOption === opt ? 'selected' : ''
                              }`}
                              onClick={() => {
                                setSelectedOption(opt);
                                speakEnglish(opt, 0.95);
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Order Sentence */}
                    {ex.type === 'order_sentence' && (
                      <div className="order-sentence-container">
                        <div
                          className="sentence-dropzone"
                          aria-label="Oración formada hasta ahora"
                        >
                          {orderedWords.length === 0 ? (
                            <span className="placeholder-hint">
                              Toca las palabras de abajo en orden para formar la oración en inglés...
                            </span>
                          ) : (
                            orderedWords.map((word, idx) => (
                              <button
                                key={`${word}-${idx}`}
                                type="button"
                                lang="en"
                                disabled={feedback.checked}
                                className="word-chip selected-word"
                                aria-label={`Quitar palabra ${word}`}
                                onClick={() => {
                                  const nextOrdered = [...orderedWords];
                                  nextOrdered.splice(idx, 1);
                                  setOrderedWords(nextOrdered);
                                  setAvailableWords([...availableWords, word]);
                                }}
                              >
                                {word}
                              </button>
                            ))
                          )}
                        </div>

                        <div className="word-bank" aria-label="Banco de palabras disponibles">
                          {availableWords.map((word, idx) => (
                            <button
                              key={`${word}-${idx}`}
                              type="button"
                              lang="en"
                              disabled={feedback.checked}
                              className="word-chip"
                              aria-label={`Añadir palabra ${word}`}
                              onClick={() => {
                                speakEnglish(word, 1.0);
                                const nextAvail = [...availableWords];
                                nextAvail.splice(idx, 1);
                                setAvailableWords(nextAvail);
                                setOrderedWords([...orderedWords, word]);
                              }}
                            >
                              {word}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Listen & Write */}
                    {ex.type === 'listen_write' && (
                      <div className="listen-write-container">
                        {ex.hintEs && (
                          <p id="listen-hint-desc" className="hint-box">
                            Pista: {ex.hintEs}
                          </p>
                        )}
                        <label htmlFor="listen-write-input" className="field-label">
                          Escribe en inglés lo que escuchaste:
                        </label>
                        <input
                          id="listen-write-input"
                          type="text"
                          lang="en"
                          disabled={feedback.checked}
                          aria-describedby={ex.hintEs ? 'listen-hint-desc' : undefined}
                          className="modern-text-input"
                          placeholder="Ej. I work as a..."
                          value={writtenAnswer}
                          onChange={(e) => setWrittenAnswer(e.target.value)}
                        />
                      </div>
                    )}

                    {/* 4. Match Pairs */}
                    {ex.type === 'match_pairs' && ex.pairs && (
                      <div className="match-pairs-grid">
                        <div className="match-column">
                          <h2>Inglés</h2>
                          {ex.pairs.map((p) => {
                            const isMatched = matchedPairIds.includes(p.id);
                            const isSelected = selectedEnPair === p.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                lang="en"
                                disabled={isMatched}
                                aria-pressed={isSelected}
                                className={`pair-btn ${isSelected ? 'selected' : ''} ${
                                  isMatched ? 'matched' : ''
                                }`}
                                onClick={() => handlePairSelection('en', p.id, ex)}
                              >
                                {p.en}
                              </button>
                            );
                          })}
                        </div>

                        <div className="match-column">
                          <h2>Español</h2>
                          {shuffledEsPairs.map((p) => {
                            const isMatched = matchedPairIds.includes(p.id);
                            const isSelected = selectedEsPair === p.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                disabled={isMatched}
                                aria-pressed={isSelected}
                                className={`pair-btn ${isSelected ? 'selected' : ''} ${
                                  isMatched ? 'matched' : ''
                                }`}
                                onClick={() => handlePairSelection('es', p.id, ex)}
                              >
                                {p.es}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Feedback Banner */}
                    {feedback.checked && (
                      <div
                        className={`feedback-banner ${
                          feedback.isCorrect ? 'correct' : 'incorrect'
                        }`}
                      >
                        <IonIcon
                          icon={feedback.isCorrect ? checkmarkCircle : closeCircle}
                          aria-hidden="true"
                        />
                        <div>
                          <strong>
                            {feedback.isCorrect ? '¡Excelente trabajo!' : 'Revisa la explicación:'}
                          </strong>
                          <p>{feedback.message}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="exercise-actions">
                      {!feedback.checked && ex.type !== 'match_pairs' && (
                        <IonButton
                          expand="block"
                          disabled={
                            (ex.type === 'multiple_choice' && !selectedOption) ||
                            (ex.type === 'order_sentence' && orderedWords.length === 0) ||
                            (ex.type === 'listen_write' && writtenAnswer.trim().length === 0)
                          }
                          onClick={verifyCurrentExercise}
                        >
                          Comprobar Respuesta
                        </IonButton>
                      )}

                      {feedback.checked && (
                        <IonButton expand="block" color="success" onClick={goToNextExercise}>
                          {currentExIndex + 1 < activeLesson.exercises.length
                            ? 'Siguiente Ejercicio'
                            : 'Finalizar Lección y Reclamar XP'}
                          <IonIcon slot="end" icon={arrowForwardOutline} aria-hidden="true" />
                        </IonButton>
                      )}
                    </div>
                  </div>
                );
              })()}
            </section>
          )}

          {activeLesson && lessonFinished && (
            <section className="lesson-summary-card">
              <IonIcon icon={sparklesOutline} className="summary-trophy-icon" aria-hidden="true" />
              <h1>¡Lección Completada!</h1>
              <p className="summary-subtitle">{activeLesson.title}</p>

              <div className="summary-metrics-grid">
                <div className="summary-metric">
                  <span>Precisión</span>
                  <strong>
                    {Math.round((correctCount / activeLesson.exercises.length) * 100)}%
                  </strong>
                </div>
                <div className="summary-metric">
                  <span>Experiencia Ganada</span>
                  <strong>+{activeLesson.xpReward} XP</strong>
                </div>
                <div className="summary-metric">
                  <span>Racha Actual</span>
                  <strong>{state.streak} días</strong>
                </div>
              </div>

              <div className="summary-buttons">
                <IonButton expand="block" onClick={() => startLesson(activeLesson)}>
                  <IonIcon slot="start" icon={refreshOutline} aria-hidden="true" />
                  Practicar de Nuevo
                </IonButton>
                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={() => setActiveLesson(null)}
                >
                  Volver a todas las lecciones
                </IonButton>
              </div>
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};
