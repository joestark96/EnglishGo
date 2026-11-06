import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonChip,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { flame, flash, ribbonOutline } from 'ionicons/icons';
import { useProgress } from '../context/ProgressContext';
import { CEFR_LEVEL_INFO } from '../data/englishData';

interface TopStatsHeaderProps {
  title: string;
}

export const TopStatsHeader: React.FC<TopStatsHeaderProps> = ({ title }) => {
  const { state, currentLevel } = useProgress();
  const levelInfo = CEFR_LEVEL_INFO[currentLevel];

  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end" className="stats-header-chips">
          <IonChip
            color="warning"
            aria-label={`Racha activa de ${state.streak} días`}
            className="stat-chip"
          >
            <IonIcon icon={flame} aria-hidden="true" />
            <IonLabel>
              <strong>{state.streak}</strong> d
            </IonLabel>
          </IonChip>

          <IonChip
            color="primary"
            aria-label={`Puntos de experiencia totales: ${state.xp} XP`}
            className="stat-chip"
          >
            <IonIcon icon={flash} aria-hidden="true" />
            <IonLabel>
              <strong>{state.xp}</strong> XP
            </IonLabel>
          </IonChip>

          <IonChip
            style={{
              '--background': `${levelInfo.color}22`,
              '--color': levelInfo.color,
              border: `1px solid ${levelInfo.color}55`
            }}
            aria-label={`Nivel actual del Marco Común Europeo: ${currentLevel}`}
            className="stat-chip"
          >
            <IonIcon icon={ribbonOutline} aria-hidden="true" style={{ color: levelInfo.color }} />
            <IonLabel>
              <strong>{currentLevel}</strong>
            </IonLabel>
          </IonChip>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
