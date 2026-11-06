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
  IonBadge
} from '@ionic/react';
import {
  micOutline,
  volumeHighOutline,
  chatbubblesOutline,
  checkmarkCircle,
  arrowForwardOutline,
  speedometerOutline,
  sparklesOutline
} from 'ionicons/icons';
import {
  CONVERSATION_SCENARIOS,
  ConversationScenario
} from '../data/englishData';
import { useProgress } from '../context/ProgressContext';
import { TopStatsHeader } from '../components/TopStatsHeader';
import {
  calculateSimilarityScore,
  isSpeechRecognitionSupported,
  recognizeEnglishSpeech,
  speakEnglish
} from '../services/speechService';

const PRONUNCIATION_DRILLS = [
  {
    en: 'Could you please schedule a meeting for Thursday afternoon?',
    es: '¿Podrías agendar una reunión para el jueves por la tarde?',
    ipa: '/kʊd ju pliːz ˈskedʒuːl ə ˈmiːtɪŋ fɔːr ˈθɜːrzdeɪ ˌæftərˈnuːn/'
  },
  {
    en: 'Throughout the entire world, technology continues to evolve.',
    es: 'En todo el mundo, la tecnología continúa evolucionando.',
    ipa: '/θruːˈaʊt ðə ɪnˈtaɪər wɜːrld tekˈnɑːlədʒi kənˈtɪnjuːz tu ɪˈvɑːlv/'
  },
  {
    en: 'I would really appreciate your feedback on this architecture.',
    es: 'Agradecería mucho tus comentarios sobre esta arquitectura.',
    ipa: '/aɪ wʊd ˈrɪəli əˈpriːʃieɪt jʊr ˈfiːdbæk ɑːn ðɪs ˈɑːrkɪtektʃər/'
  }
];

export const ConversationTab: React.FC = () => {
  const { state, completeConversation, recordPronunciation } = useProgress();
  const [activeScenario, setActiveScenario] = useState<ConversationScenario | null>(null);
  const [turnIndex, setTurnIndex] = useState(0);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Standalone pronunciation lab state
  const [labPhrase, setLabPhrase] = useState(PRONUNCIATION_DRILLS[0].en);
  const [labSpoken, setLabSpoken] = useState('');
  const [labScore, setLabScore] = useState<number | null>(null);
  const [isLabListening, setIsLabListening] = useState(false);

  const speechSupported = isSpeechRecognitionSupported();

  useEffect(() => {
    document.title = activeScenario
      ? `${activeScenario.title} | Conversación`
      : 'Conversación y Pronunciación | LinguaFlow';
  }, [activeScenario]);

  const startScenario = (scenario: ConversationScenario) => {
    setActiveScenario(scenario);
    setTurnIndex(0);
    setSpokenTranscript('');
    setSimilarityScore(null);
    setStatusMessage('');
    if (scenario.turns[0]?.speaker === 'tutor') {
      setTimeout(() => speakEnglish(scenario.turns[0].en, 0.94), 250);
    }
  };

  const evaluateUserTurn = (textToEvaluate: string, targetEn: string) => {
    const score = calculateSimilarityScore(textToEvaluate, targetEn);
    setSpokenTranscript(textToEvaluate);
    setSimilarityScore(score);
    recordPronunciation(targetEn, textToEvaluate, score);
    setStatusMessage(
      score >= 75
        ? `¡Pronunciación clara! Precisión fonética estimada: ${score}%.`
        : `Se detectó "${textToEvaluate}" (${score}% de coincidencia). Puedes repetirlo o avanzar.`
    );
  };

  const handleStartMicTurn = (targetEn: string) => {
    setIsListening(true);
    setStatusMessage('Escuchando tu pronunciación en inglés...');
    recognizeEnglishSpeech(
      (transcript) => {
        setIsListening(false);
        evaluateUserTurn(transcript, targetEn);
      },
      (errMsg) => {
        setIsListening(false);
        setStatusMessage(errMsg);
      }
    );
  };

  const advanceScenarioTurn = () => {
    if (!activeScenario) return;
    const nextIdx = turnIndex + 1;
    setSpokenTranscript('');
    setSimilarityScore(null);
    setStatusMessage('');

    if (nextIdx < activeScenario.turns.length) {
      setTurnIndex(nextIdx);
      const nextTurn = activeScenario.turns[nextIdx];
      if (nextTurn.speaker === 'tutor') {
        setTimeout(() => speakEnglish(nextTurn.en, 0.95), 200);
      }
    } else {
      completeConversation(activeScenario.id, activeScenario.xpReward);
      setActiveScenario(null);
    }
  };

  const handleLabMic = () => {
    setIsLabListening(true);
    recognizeEnglishSpeech(
      (transcript) => {
        setIsLabListening(false);
        setLabSpoken(transcript);
        const sc = calculateSimilarityScore(transcript, labPhrase);
        setLabScore(sc);
        recordPronunciation(labPhrase, transcript, sc);
      },
      (err) => {
        setIsLabListening(false);
        setStatusMessage(err);
      }
    );
  };

  return (
    <IonPage>
      <TopStatsHeader title="Conversación y Pronunciación" />
      <IonContent className="ion-padding">
        <main className="app-container">
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            {statusMessage}
          </div>

          {!activeScenario ? (
            <>
              <section className="hero-banner">
                <h1 className="page-main-heading">Simulador de Diálogos y Pronunciación</h1>
                <p className="hero-subtitle">
                  Escucha voces en inglés mediante Web Speech API y practica hablando en escenarios reales de viaje y trabajo.
                </p>
              </section>

              <section aria-label="Escenarios de conversación" className="lessons-grid">
                {CONVERSATION_SCENARIOS.map((sc) => {
                  const isDone = state.completedConversations.includes(sc.id);
                  return (
                    <IonCard key={sc.id} className="lesson-card">
                      <IonCardHeader>
                        <div className="lesson-card-top-row">
                          <span className="cefr-tag">
                            {sc.level} • {sc.setting}
                          </span>
                          <IonBadge color="primary">+{sc.xpReward} XP</IonBadge>
                        </div>
                        <IonCardTitle className="lesson-title">
                          <h2>{sc.title}</h2>
                        </IonCardTitle>
                        <IonCardSubtitle>{sc.description}</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div className="lesson-meta-row">
                          <span>{sc.turns.length} intervenciones guiadas</span>
                          {isDone && (
                            <span className="completed-badge">
                              <IonIcon icon={checkmarkCircle} color="success" aria-hidden="true" /> Completado
                            </span>
                          )}
                        </div>
                        <IonButton
                          expand="block"
                          className="ion-margin-top"
                          onClick={() => startScenario(sc)}
                        >
                          <IonIcon slot="start" icon={chatbubblesOutline} aria-hidden="true" />
                          Iniciar Diálogo Interactivo
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </section>

              {/* Laboratorio Libre de Pronunciación */}
              <section className="pronunciation-lab-card" aria-label="Laboratorio de pronunciación">
                <div className="lab-header">
                  <div>
                    <h2>Laboratorio de Pronunciación y Fonética</h2>
                    <p>
                      Elige una frase desafiante o escribe cualquier oración en inglés para escucharla y medir tu pronunciación.
                    </p>
                  </div>
                </div>

                <div className="drill-chips-list" role="group" aria-label="Frases sugeridas">
                  {PRONUNCIATION_DRILLS.map((drill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      lang="en"
                      className={`level-pill-btn ${labPhrase === drill.en ? 'active' : ''}`}
                      aria-pressed={labPhrase === drill.en}
                      onClick={() => {
                        setLabPhrase(drill.en);
                        setLabSpoken('');
                        setLabScore(null);
                        speakEnglish(drill.en, 0.94);
                      }}
                    >
                      Frase #{idx + 1}: “{drill.en.slice(0, 34)}...”
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label htmlFor="custom-pron-input" className="field-label">
                    Frase objetivo en inglés:
                  </label>
                  <input
                    id="custom-pron-input"
                    type="text"
                    lang="en"
                    className="modern-text-input"
                    value={labPhrase}
                    onChange={(e) => setLabPhrase(e.target.value)}
                  />
                </div>

                <div className="audio-controls-row">
                  <IonButton
                    fill="outline"
                    onClick={() => speakEnglish(labPhrase, 0.95)}
                  >
                    <IonIcon slot="start" icon={volumeHighOutline} aria-hidden="true" />
                    Escuchar Normal
                  </IonButton>
                  <IonButton
                    fill="clear"
                    onClick={() => speakEnglish(labPhrase, 0.65)}
                  >
                    <IonIcon slot="start" icon={speedometerOutline} aria-hidden="true" />
                    Escuchar Lento (0.65x)
                  </IonButton>
                  <IonButton
                    color={isLabListening ? 'danger' : 'secondary'}
                    onClick={handleLabMic}
                  >
                    <IonIcon slot="start" icon={micOutline} aria-hidden="true" />
                    {isLabListening ? 'Escuchando...' : 'Hablar con Micrófono'}
                  </IonButton>
                  {!speechSupported && (
                    <IonButton
                      fill="outline"
                      color="tertiary"
                      onClick={() => {
                        setLabSpoken(labPhrase);
                        setLabScore(100);
                        recordPronunciation(labPhrase, labPhrase, 100);
                      }}
                    >
                      Simular Práctica Oral
                    </IonButton>
                  )}
                </div>

                {labScore !== null && (
                  <div className={`feedback-banner ${labScore >= 75 ? 'correct' : 'incorrect'}`}>
                    <IonIcon icon={sparklesOutline} aria-hidden="true" />
                    <div>
                      <strong>Puntaje de Pronunciación: {labScore}%</strong>
                      <p>
                        Detectado: <span lang="en">“{labSpoken}”</span>
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </>
          ) : (
            <section className="dialogue-stage-card" aria-label="Diálogo en curso">
              <div className="runner-header">
                <IonButton fill="clear" size="small" onClick={() => setActiveScenario(null)}>
                  Volver a escenarios
                </IonButton>
                <span>
                   Intervención {turnIndex + 1} de {activeScenario.turns.length}
                </span>
                <IonBadge color="primary">{activeScenario.setting}</IonBadge>
              </div>

              {/* Historial de turnos hasta el actual */}
              <div className="dialogue-bubbles-list">
                {activeScenario.turns.slice(0, turnIndex + 1).map((turn, idx) => {
                  const isCurrent = idx === turnIndex;
                  return (
                    <div
                      key={idx}
                      className={`chat-bubble ${turn.speaker === 'tutor' ? 'tutor' : 'user'} ${
                        isCurrent ? 'current-turn' : ''
                      }`}
                    >
                      <div className="bubble-top">
                        <strong>{turn.speakerName}</strong>
                        <IonButton
                          fill="clear"
                          size="small"
                          aria-label={`Escuchar audio de ${turn.speakerName}`}
                          onClick={() => speakEnglish(turn.en, 0.94)}
                        >
                          <IonIcon icon={volumeHighOutline} aria-hidden="true" />
                        </IonButton>
                      </div>
                      <p className="bubble-en" lang="en">
                        “{turn.en}”
                      </p>
                      <p className="bubble-es">{turn.es}</p>
                      {turn.phoneticHint && (
                        <p className="bubble-ipa">Guía fonética: /{turn.phoneticHint}/</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {(() => {
                const currentTurn = activeScenario.turns[turnIndex];
                if (currentTurn.speaker === 'tutor') {
                  return (
                    <div className="turn-controls">
                      <IonButton
                        expand="block"
                        onClick={advanceScenarioTurn}
                      >
                        Continuar a tu turno de respuesta
                        <IonIcon slot="end" icon={arrowForwardOutline} aria-hidden="true" />
                      </IonButton>
                    </div>
                  );
                }

                return (
                  <div className="user-turn-panel">
                    <h2>Tu turno de hablar en inglés:</h2>
                    <p className="turn-instruction">
                      Escucha el modelo o presiona el micrófono para leer en voz alta tu respuesta. También puedes practicar escribiéndola.
                    </p>

                    <div className="audio-controls-row">
                      <IonButton
                        fill="outline"
                        onClick={() => speakEnglish(currentTurn.en, 0.92)}
                      >
                        <IonIcon slot="start" icon={volumeHighOutline} aria-hidden="true" />
                        Escuchar Modelo
                      </IonButton>

                      <IonButton
                        color={isListening ? 'danger' : 'primary'}
                        onClick={() => handleStartMicTurn(currentTurn.en)}
                      >
                        <IonIcon slot="start" icon={micOutline} aria-hidden="true" />
                        {isListening ? 'Escuchando...' : 'Pronunciar con Micrófono'}
                      </IonButton>
                    </div>

                    <div className="manual-speech-fallback">
                      <label htmlFor="manual-speech-input" className="field-label">
                        O escribe / ajusta tu respuesta para evaluar precisión:
                      </label>
                      <div className="input-with-btn">
                        <input
                          id="manual-speech-input"
                          type="text"
                          lang="en"
                          className="modern-text-input"
                          placeholder={currentTurn.en}
                          value={spokenTranscript}
                          onChange={(e) => setSpokenTranscript(e.target.value)}
                        />
                        <IonButton
                          onClick={() =>
                            evaluateUserTurn(
                              spokenTranscript.trim() || currentTurn.en,
                              currentTurn.en
                            )
                          }
                        >
                          Evaluar
                        </IonButton>
                      </div>
                    </div>

                    {similarityScore !== null && (
                      <div
                        className={`feedback-banner ${
                          similarityScore >= 75 ? 'correct' : 'incorrect'
                        }`}
                      >
                        <IonIcon icon={checkmarkCircle} aria-hidden="true" />
                        <div>
                          <strong>Coincidencia: {similarityScore}%</strong>
                          <p>{statusMessage}</p>
                        </div>
                      </div>
                    )}

                    <IonButton
                      expand="block"
                      color="success"
                      className="ion-margin-top"
                      onClick={advanceScenarioTurn}
                    >
                      {turnIndex + 1 < activeScenario.turns.length
                        ? 'Siguiente Intervención'
                        : `Completar Diálogo (+${activeScenario.xpReward} XP)`}
                      <IonIcon slot="end" icon={arrowForwardOutline} aria-hidden="true" />
                    </IonButton>
                  </div>
                );
              })()}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};
