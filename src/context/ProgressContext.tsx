import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CefrLevel,
  CEFR_LEVEL_INFO,
  FlashcardItem,
  INITIAL_FLASHCARDS
} from '../data/englishData';

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface SrsCardState {
  cardId: string;
  box: number; // 0 to 5
  intervalMinutes: number;
  nextReviewAt: number; // timestamp ms
  reviewCount: number;
  lastRating?: SrsRating;
}

export interface PronunciationRecord {
  id: string;
  phrase: string;
  spoken: string;
  score: number;
  timestamp: string;
}

export interface UserProgressState {
  xp: number;
  todayXp: number;
  dailyGoalXp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: Record<string, { bestScore: number; completedAt: string; attempts: number }>;
  completedConversations: string[];
  srsStates: Record<string, SrsCardState>;
  customFlashcards: FlashcardItem[];
  pronunciationHistory: PronunciationRecord[];
}

interface ProgressContextValue {
  state: UserProgressState;
  currentLevel: CefrLevel;
  nextLevelInfo: { nextLevel: CefrLevel | null; progressPercent: number; xpRemaining: number };
  allFlashcards: FlashcardItem[];
  completeLesson: (lessonId: string, scorePercent: number, xpEarned: number) => void;
  reviewFlashcard: (cardId: string, rating: SrsRating) => void;
  addCustomFlashcard: (card: Omit<FlashcardItem, 'id'>) => void;
  completeConversation: (scenarioId: string, xpEarned: number) => void;
  recordPronunciation: (phrase: string, spoken: string, score: number) => void;
  updateDailyGoal: (goalXp: number) => void;
  resetAllProgress: () => void;
  importProgressJson: (rawJson: string) => boolean;
}

const STORAGE_KEY = 'linguaflow_local_state_v1';

function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createDefaultState(): UserProgressState {
  return {
    xp: 120,
    todayXp: 40,
    dailyGoalXp: 100,
    streak: 3,
    lastActiveDate: getTodayIsoDate(),
    completedLessons: {},
    completedConversations: [],
    srsStates: {},
    customFlashcards: [],
    pronunciationHistory: []
  };
}

export function computeCefrLevel(xp: number): CefrLevel {
  if (xp >= CEFR_LEVEL_INFO.C1.minXp) return 'C1';
  if (xp >= CEFR_LEVEL_INFO.B2.minXp) return 'B2';
  if (xp >= CEFR_LEVEL_INFO.B1.minXp) return 'B1';
  if (xp >= CEFR_LEVEL_INFO.A2.minXp) return 'A2';
  return 'A1';
}

export function computeNextLevelProgress(xp: number): {
  nextLevel: CefrLevel | null;
  progressPercent: number;
  xpRemaining: number;
} {
  const order: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const current = computeCefrLevel(xp);
  const idx = order.indexOf(current);
  if (idx === order.length - 1) {
    return { nextLevel: null, progressPercent: 100, xpRemaining: 0 };
  }
  const nextLevel = order[idx + 1];
  const currentFloor = CEFR_LEVEL_INFO[current].minXp;
  const nextFloor = CEFR_LEVEL_INFO[nextLevel].minXp;
  const span = nextFloor - currentFloor;
  const gainedInLevel = Math.max(0, xp - currentFloor);
  const progressPercent = Math.min(100, Math.round((gainedInLevel / span) * 100));
  return {
    nextLevel,
    progressPercent,
    xpRemaining: Math.max(0, nextFloor - xp)
  };
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserProgressState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultState();
      const parsed = JSON.parse(raw) as UserProgressState;
      const today = getTodayIsoDate();
      const yesterday = getYesterdayIsoDate();

      let updatedStreak = parsed.streak || 1;
      let updatedTodayXp = parsed.todayXp || 0;

      if (parsed.lastActiveDate !== today) {
        updatedTodayXp = 0;
        if (parsed.lastActiveDate !== yesterday) {
          // Si dejó pasar más de un día, la racha vuelve a 1 cuando estudie hoy
          updatedStreak = parsed.streak > 0 ? 1 : 0;
        }
      }

      return {
        ...createDefaultState(),
        ...parsed,
        streak: updatedStreak,
        todayXp: updatedTodayXp
      };
    } catch {
      return createDefaultState();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state]);

  const registerActivityAndXp = (prev: UserProgressState, addedXp: number): UserProgressState => {
    const today = getTodayIsoDate();
    const yesterday = getYesterdayIsoDate();
    let streak = prev.streak;
    if (prev.lastActiveDate === yesterday) {
      streak += 1;
    } else if (prev.lastActiveDate !== today) {
      streak = Math.max(1, streak);
    }

    return {
      ...prev,
      xp: prev.xp + addedXp,
      todayXp: (prev.lastActiveDate === today ? prev.todayXp : 0) + addedXp,
      streak,
      lastActiveDate: today
    };
  };

  const completeLesson = (lessonId: string, scorePercent: number, xpEarned: number) => {
    setState((prev) => {
      const existing = prev.completedLessons[lessonId];
      const base = registerActivityAndXp(prev, xpEarned);
      return {
        ...base,
        completedLessons: {
          ...base.completedLessons,
          [lessonId]: {
            bestScore: existing ? Math.max(existing.bestScore, scorePercent) : scorePercent,
            completedAt: new Date().toISOString(),
            attempts: existing ? existing.attempts + 1 : 1
          }
        }
      };
    });
  };

  const reviewFlashcard = (cardId: string, rating: SrsRating) => {
    setState((prev) => {
      const current = prev.srsStates[cardId] || {
        cardId,
        box: 0,
        intervalMinutes: 0,
        nextReviewAt: 0,
        reviewCount: 0
      };

      let nextBox = current.box;
      let intervalMinutes = 10;
      let xpBonus = 5;

      if (rating === 'again') {
        nextBox = 0;
        intervalMinutes = 1; // 1 minuto
        xpBonus = 3;
      } else if (rating === 'hard') {
        nextBox = Math.max(1, current.box);
        intervalMinutes = 60 * 6; // 6 horas
        xpBonus = 5;
      } else if (rating === 'good') {
        nextBox = Math.min(5, current.box + 1);
        intervalMinutes = 60 * 24 * Math.max(1, nextBox); // 1-5 días
        xpBonus = 8;
      } else if (rating === 'easy') {
        nextBox = Math.min(5, current.box + 2);
        intervalMinutes = 60 * 24 * Math.max(3, nextBox * 2); // 3-10 días
        xpBonus = 10;
      }

      const base = registerActivityAndXp(prev, xpBonus);
      return {
        ...base,
        srsStates: {
          ...base.srsStates,
          [cardId]: {
            cardId,
            box: nextBox,
            intervalMinutes,
            nextReviewAt: Date.now() + intervalMinutes * 60 * 1000,
            reviewCount: current.reviewCount + 1,
            lastRating: rating
          }
        }
      };
    });
  };

  const addCustomFlashcard = (card: Omit<FlashcardItem, 'id'>) => {
    const newCard: FlashcardItem = {
      ...card,
      id: `custom-${Date.now()}`
    };
    setState((prev) => {
      const base = registerActivityAndXp(prev, 15);
      return {
        ...base,
        customFlashcards: [newCard, ...base.customFlashcards]
      };
    });
  };

  const completeConversation = (scenarioId: string, xpEarned: number) => {
    setState((prev) => {
      const base = registerActivityAndXp(prev, xpEarned);
      const list = base.completedConversations.includes(scenarioId)
        ? base.completedConversations
        : [...base.completedConversations, scenarioId];
      return {
        ...base,
        completedConversations: list
      };
    });
  };

  const recordPronunciation = (phrase: string, spoken: string, score: number) => {
    setState((prev) => {
      const xpBonus = score >= 80 ? 12 : 6;
      const base = registerActivityAndXp(prev, xpBonus);
      const entry: PronunciationRecord = {
        id: `pron-${Date.now()}`,
        phrase,
        spoken,
        score,
        timestamp: new Date().toISOString()
      };
      return {
        ...base,
        pronunciationHistory: [entry, ...base.pronunciationHistory].slice(0, 25)
      };
    });
  };

  const updateDailyGoal = (goalXp: number) => {
    setState((prev) => ({
      ...prev,
      dailyGoalXp: Math.max(20, goalXp)
    }));
  };

  const resetAllProgress = () => {
    const fresh: UserProgressState = {
      xp: 0,
      todayXp: 0,
      dailyGoalXp: 100,
      streak: 1,
      lastActiveDate: getTodayIsoDate(),
      completedLessons: {},
      completedConversations: [],
      srsStates: {},
      customFlashcards: [],
      pronunciationHistory: []
    };
    setState(fresh);
  };

  const importProgressJson = (rawJson: string): boolean => {
    try {
      const parsed = JSON.parse(rawJson) as UserProgressState;
      if (typeof parsed.xp !== 'number') return false;
      setState({
        ...createDefaultState(),
        ...parsed
      });
      return true;
    } catch {
      return false;
    }
  };

  const currentLevel = computeCefrLevel(state.xp);
  const nextLevelInfo = computeNextLevelProgress(state.xp);
  const allFlashcards = [...state.customFlashcards, ...INITIAL_FLASHCARDS];

  return (
    <ProgressContext.Provider
      value={{
        state,
        currentLevel,
        nextLevelInfo,
        allFlashcards,
        completeLesson,
        reviewFlashcard,
        addCustomFlashcard,
        completeConversation,
        recordPronunciation,
        updateDailyGoal,
        resetAllProgress,
        importProgressJson
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress debe usarse dentro de un ProgressProvider');
  }
  return ctx;
}
