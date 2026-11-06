import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonBadge
} from '@ionic/react';
import {
  flameOutline,
  flashOutline,
  trophyOutline,
  downloadOutline,
  cloudUploadOutline,
  trashOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import {
  CefrLevel,
  CEFR_LEVEL_INFO,
  LESSONS_DATA,
  CONVERSATION_SCENARIOS
} from '../data/englishData';
import { useProgress } from '../context/ProgressContext';
import { TopStatsHeader } from '../components/TopStatsHeader';

export const ProgressTab: React.FC = () => {
  const {
    state,
    currentLevel,
    nextLevelInfo,
    allFlashcards,
    updateDailyGoal,
    resetAllProgress,
    importProgressJson
  } = useProgress();

  const [backupNotice, setBackupNotice] = useState('');

  useEffect(() => {
    document.title = 'Mi Progreso y Datos Locales | LinguaFlow';
  }, []);

  const completedLessonsCount = Object.keys(state.completedLessons).length;
  const masteredCardsCount = Object.values(state.srsStates).filter((s) => s.box >= 3).length;

  const handleExportBackup = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguaflow-progreso-${state.lastActiveDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupNotice('Respaldo JSON exportado correctamente a tu dispositivo.');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || '');
      const ok = importProgressJson(content);
      setBackupNotice(
        ok
          ? '¡Progreso restaurado exitosamente desde el archivo local!'
          : 'El archivo seleccionado no tiene un formato de respaldo válido.'
      );
    };
    reader.readAsText(file);
  };

  const levelMeta = CEFR_LEVEL_INFO[currentLevel];

  return (
    <IonPage>
      <TopStatsHeader title="Estadísticas y Guardado Local" />
      <IonContent className="ion-padding">
        <main className="app-container">
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            {backupNotice}
          </div>

          <section className="hero-banner">
            <div className="hero-banner-top">
              <div>
                <h1 className="page-main-heading">Panel de Progreso Personal</h1>
                <p className="hero-subtitle">
                  Todo tu avance se almacena localmente en tu dispositivo para estudiar 100% sin conexión.
                </p>
              </div>
              <IonBadge color="success">Modo Offline Activo</IonBadge>
            </div>

            {/* Nivel CEFR Actual y Barra al siguiente nivel */}
            <div className="cefr-progress-banner">
              <div className="cefr-banner-header">
                <div>
                  <span className="cefr-tag" style={{ color: levelMeta.color }}>
                    Nivel Actual: {levelMeta.name}
                  </span>
                  <p className="cefr-desc">{levelMeta.description}</p>
                </div>
                <div className="xp-target-summary">
                  {nextLevelInfo.nextLevel ? (
                    <span>
                      Faltan <strong>{nextLevelInfo.xpRemaining} XP</strong> para subir a{' '}
                      <strong>{nextLevelInfo.nextLevel}</strong>
                    </span>
                  ) : (
                    <span>¡Has alcanzado el nivel máximo C1!</span>
                  )}
                </div>
              </div>
              <IonProgressBar value={nextLevelInfo.progressPercent / 100} color="primary" />
            </div>
          </section>

          {/* Tarjetas de métricas clave */}
          <section className="kpi-cards-grid" aria-label="Indicadores de aprendizaje">
            <div className="kpi-card">
              <IonIcon icon={flameOutline} color="warning" aria-hidden="true" />
              <div>
                <span>Racha de Estudio</span>
                <strong>{state.streak} días seguidos</strong>
              </div>
            </div>

            <div className="kpi-card">
              <IonIcon icon={flashOutline} color="primary" aria-hidden="true" />
              <div>
                <span>Experiencia Total</span>
                <strong>{state.xp} XP</strong>
              </div>
            </div>

            <div className="kpi-card">
              <IonIcon icon={trophyOutline} color="secondary" aria-hidden="true" />
              <div>
                <span>Lecciones Superadas</span>
                <strong>
                  {completedLessonsCount} / {LESSONS_DATA.length}
                </strong>
              </div>
            </div>

            <div className="kpi-card">
              <IonIcon icon={checkmarkCircleOutline} color="success" aria-hidden="true" />
              <div>
                <span>Flashcards Dominadas</span>
                <strong>
                  {masteredCardsCount} / {allFlashcards.length}
                </strong>
              </div>
            </div>
          </section>

          {/* Configuración de Meta Diaria */}
          <section className="settings-section-card">
            <h2>Meta Diaria de Experiencia (XP)</h2>
            <p>
              Hoy has acumulado <strong>{state.todayXp} XP</strong> de tu meta de{' '}
              <strong>{state.dailyGoalXp} XP</strong>.
            </p>
            <div className="level-filter-bar" role="group" aria-label="Seleccionar meta diaria de XP">
              {[50, 100, 150, 250].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  className={`level-pill-btn ${state.dailyGoalXp === goal ? 'active' : ''}`}
                  aria-pressed={state.dailyGoalXp === goal}
                  onClick={() => updateDailyGoal(goal)}
                >
                  {goal === 50 && 'Relajado (50 XP/día)'}
                  {goal === 100 && 'Constante (100 XP/día)'}
                  {goal === 150 && 'Intensivo (150 XP/día)'}
                  {goal === 250 && 'Inmersión (250 XP/día)'}
                </button>
              ))}
            </div>
          </section>

          {/* Tabla Semántica de Escalafón CEFR */}
          <section className="settings-section-card">
            <h2>Escalafón de Niveles (A1 a C1)</h2>
            <div className="table-responsive-wrap">
              <table className="accessible-data-table">
                <caption>Requisitos de experiencia y estado de desbloqueo por nivel CEFR</caption>
                <thead>
                  <tr>
                    <th scope="col">Nivel</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">XP Requerido</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {(['A1', 'A2', 'B1', 'B2', 'C1'] as CefrLevel[]).map((lvl) => {
                    const info = CEFR_LEVEL_INFO[lvl];
                    const unlocked = state.xp >= info.minXp;
                    return (
                      <tr key={lvl}>
                        <th scope="row">{lvl}</th>
                        <td>{info.name}</td>
                        <td>{info.minXp} XP</td>
                        <td>
                          {unlocked ? (
                            <IonBadge color="success">Alcanzado</IonBadge>
                          ) : (
                            <IonBadge color="medium">En progreso</IonBadge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Gestión de Datos Locales (Exportar / Importar / Reiniciar) */}
          <section className="settings-section-card">
            <h2>Respaldo y Almacenamiento Local (Offline)</h2>
            <p>
              Tus lecciones, tarjetas personalizadas ({state.customFlashcards.length}), diálogos ({state.completedConversations.length}/{CONVERSATION_SCENARIOS.length}) y repeticiones SRS están guardados en <code>localStorage</code>.
            </p>

            {backupNotice && <p className="backup-status-msg">{backupNotice}</p>}

            <div className="backup-actions-row">
              <IonButton fill="outline" onClick={handleExportBackup}>
                <IonIcon slot="start" icon={downloadOutline} aria-hidden="true" />
                Exportar Progreso (.json)
              </IonButton>

              <label htmlFor="import-backup-file" className="file-upload-btn">
                <IonIcon icon={cloudUploadOutline} aria-hidden="true" />
                <span>Importar Respaldo (.json)</span>
                <input
                  id="import-backup-file"
                  type="file"
                  accept="application/json"
                  onChange={handleImportFile}
                />
              </label>

              <IonButton
                color="danger"
                fill="clear"
                onClick={() => {
                  resetAllProgress();
                  setBackupNotice('Se ha reiniciado el progreso local a cero.');
                }}
              >
                <IonIcon slot="start" icon={trashOutline} aria-hidden="true" />
                Reiniciar Progreso
              </IonButton>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};
