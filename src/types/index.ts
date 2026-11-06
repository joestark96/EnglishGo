export type ExerciseType =
  | 'multiple-choice'
  | 'word-order'
  | 'match-pairs'
  | 'listening'
  | 'dialogue-reading';

export interface DialogueLine {
  speaker: string;
  english: string;
  ipa?: string;
  spanish: string;
  audioText: string;
}

export interface ExerciseOption {
  id: string;
  text: string;
  ipa?: string;
  isCorrect?: boolean;
}

export interface MatchPair {
  id: string;
  left: string;      // e.g. "Nevertheless"
  leftSub?: string;  // e.g. "/ˌnev.ə.ðəˈles/"
  right: string;     // e.g. "No obstante / Sin embargo"
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  promptSub?: string;
  englishVoiceText?: string;       // Text to speak via TTS
  options?: ExerciseOption[];      // For multiple-choice & listening
  correctAnswerId?: string;        // For multiple-choice & listening
  wordBank?: string[];             // For word-order (scrambled words)
  correctSentence?: string[];      // For word-order (target order)
  pairs?: MatchPair[];             // For match-pairs
  dialogueTitle?: string;          // For dialogue-reading
  dialogueContext?: string;        // For dialogue-reading
  dialogueLines?: DialogueLine[];  // For dialogue-reading
  explanation: string;
}

export interface LessonNode {
  id: string;
  unitId: number;
  lessonNumber: number;
  title: string;
  englishTitle: string;
  description: string;
  icon: string;
  color: 'green' | 'blue' | 'orange' | 'purple' | 'red';
  totalSteps: number;
  unlocked: boolean;
  completedSteps: number;
  stars: number; // 0 to 3
  exercises: Exercise[];
}

export type CourseStage =
  | 'Fonética & IPA'
  | 'Cambridge A1'
  | 'Cambridge A2'
  | 'Oxford B1'
  | 'Oxford B2'
  | 'Mastery C1';

export interface Unit {
  id: number;
  stage: CourseStage;
  cefrLevel: CEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  nodes: LessonNode[];
}

export type FlashcardCategory =
  | 'phonetics'
  | 'vocabulary'
  | 'phrasal-verbs'
  | 'idioms'
  | 'phrases';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Flashcard {
  id: string;
  category: FlashcardCategory;
  unitNumber: number;
  cefrLevel: CEFRLevel;
  english: string;
  ipa: string;
  spanish: string;
  partOfSpeech?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  notes?: string;
  // SRS properties
  srsLevel: number; // 0: new, 1: learning, 2: reviewing, 3: mastered
  intervalDays: number;
  nextReviewDate: string; // ISO string
  timesReviewed: number;
  timesCorrect: number;
}

export interface UserProfile {
  id: string;
  username: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  hearts: number;
  maxHearts: number;
  gems: number;
  soundEnabled: boolean;
  showIpa: boolean;
  darkMode: boolean;
  preferredVoiceId?: string;
}
