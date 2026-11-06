import { UserProfile, Flashcard } from '../types';

export interface SavedLessonProgress {
  nodeId: string;
  unlocked: boolean;
  completedSteps: number;
  stars: number;
}

export interface SavedFlashcardSRS {
  cardId: string;
  srsLevel: number;
  intervalDays: number;
  nextReviewDate: string;
  timesReviewed: number;
  timesCorrect: number;
}

const PROFILE_KEY = 'english_dojo_profile_v2';
const PROGRESS_KEY = 'english_dojo_lesson_progress_v2';
const SRS_KEY = 'english_dojo_flashcard_srs_v2';

const DEFAULT_PROFILE: UserProfile = {
  id: 'local_user',
  username: 'Estudiante EnglishGo!',
  xp: 0,
  streakDays: 0,
  lastActiveDate: '',
  hearts: 5,
  maxHearts: 5,
  gems: 100,
  soundEnabled: true,
  showIpa: true,
  darkMode: false,
  preferredVoiceId: 'emily'
};

class LocalDatabaseService {
  public async init(): Promise<void> {
    // LocalStorage ready immediately
  }

  public async getUserProfile(): Promise<UserProfile> {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
      }
    } catch {}
    return { ...DEFAULT_PROFILE };
  }

  public async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {}
  }

  public async getLessonProgress(): Promise<Record<string, SavedLessonProgress>> {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return {};
  }

  public async saveLessonNodeProgress(
    nodeId: string,
    unlocked: boolean,
    completedSteps: number,
    stars: number
  ): Promise<void> {
    try {
      const map = await this.getLessonProgress();
      map[nodeId] = { nodeId, unlocked, completedSteps, stars };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
    } catch {}
  }

  public async getFlashcardSRSMap(): Promise<Record<string, SavedFlashcardSRS>> {
    try {
      const raw = localStorage.getItem(SRS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return {};
  }

  public async saveFlashcardSRS(card: Flashcard): Promise<void> {
    try {
      const map = await this.getFlashcardSRSMap();
      map[card.id] = {
        cardId: card.id,
        srsLevel: card.srsLevel,
        intervalDays: card.intervalDays,
        nextReviewDate: card.nextReviewDate,
        timesReviewed: card.timesReviewed,
        timesCorrect: card.timesCorrect
      };
      localStorage.setItem(SRS_KEY, JSON.stringify(map));
    } catch {}
  }

  public async resetAllData(): Promise<UserProfile> {
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(SRS_KEY);
    } catch {}
    return { ...DEFAULT_PROFILE };
  }
}

export const dbService = new LocalDatabaseService();
