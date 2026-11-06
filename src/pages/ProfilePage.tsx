import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CHARACTER_VOICES } from '../services/sound';
import { getDailyQuestStats, getLocalDateKey } from '../utils/dateUtils';
import {
  Flame,
  Zap,
  Gem,
  Heart,
  Volume2,
  Moon,
  Sun,
  RotateCcw,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { sound } from '../services/sound';

interface ProfilePageProps {
  profile: UserProfile;
  completedLessonsCount: number;
  currentCefrLevel: string;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetProgress: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  completedLessonsCount,
  currentCefrLevel,
  onUpdateProfile,
  onResetProgress,
}) => {
  const dailyStats = getDailyQuestStats(getLocalDateKey());
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);

  const quests = [
    {
      id: 'daily-xp-50',
      title: 'Gana 50 XP hoy',
      progress: Math.min(50, dailyStats.xpEarned),
      target: 50,
      rewardGems: 15,
    },
    {
      id: 'daily-lessons-2',
      title: 'Completa 2 lecciones hoy',
      progress: Math.min(2, dailyStats.lessonsCompleted),
      target: 2,
      rewardGems: 20,
    },
    {
      id: 'daily-hearts',
      title: 'Mantén 3 o más vidas en tu sesión',
      progress: dailyStats.maintainedHearts ? 1 : 0,
      target: 1,
      rewardGems: 25,
    },
  ];

  const handleClaimQuest = (questId: string, rewardGems: number) => {
    if (claimedQuests.includes(questId)) return;
    sound.playLessonComplete();
    setClaimedQuests([...claimedQuests, questId]);
    onUpdateProfile({
      ...profile,
      gems: profile.gems + rewardGems,
    });
  };

  const handleRefillHearts = () => {
    if (profile.hearts >= profile.maxHearts || profile.gems < 50) return;
    sound.playCorrect();
    onUpdateProfile({
      ...profile,
      hearts: profile.maxHearts,
      gems: profile.gems - 50,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div>
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold uppercase bg-blue-100 dark:bg-blue-900/40 text-duo-blue">
            Nivel Actual: CEFR {currentCefrLevel}
          </span>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white mt-2">
            {profile.username}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estudiante de Inglés • {completedLessonsCount} lecciones completadas
          </p>
        </div>
        <div className="w-16 h-16 rounded-3xl bg-duo-green text-white font-black text-2xl flex items-center justify-center shadow-duo-btn">
          {currentCefrLevel}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <Flame className="w-6 h-6 text-duo-orange mb-1" />
          <div className="text-xl font-black text-gray-800 dark:text-white">
            {profile.streakDays}
          </div>
          <div className="text-xs text-gray-400 font-bold">Días de Racha</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <Zap className="w-6 h-6 text-duo-yellow mb-1" />
          <div className="text-xl font-black text-gray-800 dark:text-white">{profile.xp}</div>
          <div className="text-xs text-gray-400 font-bold">XP Total</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <Gem className="w-6 h-6 text-duo-blue mb-1" />
          <div className="text-xl font-black text-gray-800 dark:text-white">{profile.gems}</div>
          <div className="text-xs text-gray-400 font-bold">Gemas</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <Heart className="w-6 h-6 text-duo-red mb-1" />
          <div className="text-xl font-black text-gray-800 dark:text-white">
            {profile.hearts}/{profile.maxHearts}
          </div>
          <div className="text-xs text-gray-400 font-bold">Vidas</div>
        </div>
      </div>

      {/* Refill Hearts */}
      {profile.hearts < profile.maxHearts && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border-2 border-duo-red/40 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-sm text-gray-800 dark:text-white">
              Recargar todas las vidas ({profile.hearts}/{profile.maxHearts})
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Usa 50 gemas o entrena gratis con el botón de pesas en el mapa.
            </p>
          </div>
          <button
            disabled={profile.gems < 50}
            onClick={handleRefillHearts}
            className="px-4 py-2.5 rounded-xl bg-duo-red disabled:opacity-40 text-white font-extrabold text-xs shrink-0"
          >
            Recargar (50 💎)
          </button>
        </div>
      )}

      {/* Daily Quests */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-duo-yellow" />
          Misiones Diarias
        </h2>
        <div className="space-y-4">
          {quests.map((q) => {
            const isDone = q.progress >= q.target;
            const isClaimed = claimedQuests.includes(q.id);
            const pct = Math.round((q.progress / q.target) * 100);
            return (
              <div key={q.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-gray-800 dark:text-white">
                    {q.title}
                  </span>
                  {isClaimed ? (
                    <span className="text-xs font-extrabold text-duo-green flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Reclamada
                    </span>
                  ) : isDone ? (
                    <button
                      onClick={() => handleClaimQuest(q.id, q.rewardGems)}
                      className="px-3 py-1 rounded-xl bg-duo-yellow text-gray-900 font-extrabold text-xs animate-bounce"
                    >
                      Reclamar +{q.rewardGems} 💎
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-gray-400">+{q.rewardGems} 💎</span>
                  )}
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-duo-green rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accent & Voice Settings */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 space-y-4">
        <h2 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-duo-blue" />
          Voz Nativa y Preferencias de Estudio
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CHARACTER_VOICES.map((voice) => {
            const isSelected = (profile.preferredVoiceId || 'emily') === voice.id;
            return (
              <button
                key={voice.id}
                onClick={() => {
                  sound.setDefaultVoice(voice.id);
                  sound.speakEnglish(voice.samplePhrase, voice.id);
                  onUpdateProfile({ ...profile, preferredVoiceId: voice.id });
                }}
                className={`p-3 rounded-2xl border-2 text-left transition ${
                  isSelected
                    ? 'border-duo-blue bg-duo-blue/10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm font-extrabold text-gray-800 dark:text-white">
                  {voice.avatar} {voice.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{voice.role}</div>
              </button>
            );
          })}
        </div>

        {/* Toggles */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold text-gray-800 dark:text-white">
                Mostrar Transcripción Fonética (IPA)
              </div>
              <div className="text-xs text-gray-500">
                Muestra símbolos como /ˈwɔː.tɚ/ debajo de las frases en inglés
              </div>
            </div>
            <button
              onClick={() => onUpdateProfile({ ...profile, showIpa: !profile.showIpa })}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs ${
                profile.showIpa ? 'bg-duo-green text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
              }`}
            >
              {profile.showIpa ? 'Activado' : 'Desactivado'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold text-gray-800 dark:text-white">
                Modo Oscuro
              </div>
              <div className="text-xs text-gray-500">Interfaz cómoda para estudiar de noche</div>
            </div>
            <button
              onClick={() => onUpdateProfile({ ...profile, darkMode: !profile.darkMode })}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-extrabold text-xs flex items-center gap-1.5"
            >
              {profile.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{profile.darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Progress */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onResetProgress}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-duo-red hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar todo el progreso local</span>
        </button>
      </div>
    </div>
  );
};
