import React, { useState, useEffect } from 'react';
import { IonApp, IonContent, setupIonicReact } from '@ionic/react';
import { TopBar } from './components/TopBar';
import { BottomNav, NavTab } from './components/BottomNav';
import { RoadmapPage } from './pages/RoadmapPage';
import { TheoryPage } from './pages/TheoryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { PhoneticsPage } from './pages/PhoneticsPage';
import { ReadingsPage } from './pages/ReadingsPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { WritingPage } from './pages/WritingPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { MasteryPage } from './pages/MasteryPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuizModal } from './components/Quiz/QuizModal';
import { dbService, SavedLessonProgress } from './services/db';
import { englishCurriculum } from './data/englishCurriculum';
import { initialFlashcards } from './data/flashcardsData';
import { expandLessonExercises } from './utils/lessonExpander';
import { createMultiUnitJumpAheadLesson, JumpAheadLessonNode } from './utils/jumpAhead';
import { createPracticeLesson } from './utils/practiceLesson';
import { recordDailyLessonActivity } from './utils/dateUtils';
import { sound } from './services/sound';
import { LessonNode, Unit, UserProfile, Flashcard, CEFRLevel } from './types';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './theme/global.css';

setupIonicReact({
  mode: 'md',
});

const DEFAULT_PROFILE: UserProfile = {
  id: 'local_user',
  username: 'Alex Learner',
  xp: 0,
  streakDays: 1,
  lastActiveDate: '',
  hearts: 5,
  maxHearts: 5,
  gems: 150,
  soundEnabled: true,
  showIpa: true,
  darkMode: false,
  preferredVoiceId: 'emily',
};

function computeCEFRLevel(completedLessonsCount: number): CEFRLevel {
  if (completedLessonsCount >= 180) return 'C1';
  if (completedLessonsCount >= 120) return 'B2';
  if (completedLessonsCount >= 70) return 'B1';
  if (completedLessonsCount >= 30) return 'A2';
  return 'A1';
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [curriculum, setCurriculum] = useState<Unit[]>(englishCurriculum);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [activeLesson, setActiveLesson] = useState<LessonNode | null>(null);
  const [theoryTargetUnit, setTheoryTargetUnit] = useState<number | null>(null);

  const [jumpExamNode, setJumpExamNode] = useState<JumpAheadLessonNode | null>(null);
  const [isPracticeSession, setIsPracticeSession] = useState(false);

  const applySavedProgress = (
    baseUnits: Unit[],
    progressMap: Record<string, SavedLessonProgress>
  ): Unit[] => {
    let unlockedNext = true;
    return baseUnits.map((unit) => ({
      ...unit,
      nodes: unit.nodes.map((node) => {
        const saved = progressMap[node.id];
        if (saved && (saved.stars > 0 || saved.completedSteps >= node.totalSteps)) {
          unlockedNext = true;
          return {
            ...node,
            unlocked: true,
            completedSteps: saved.completedSteps,
            stars: saved.stars,
          };
        }
        if (unlockedNext) {
          unlockedNext = false;
          return {
            ...node,
            unlocked: true,
            completedSteps: saved?.completedSteps ?? 0,
            stars: saved?.stars ?? 0,
          };
        }
        return {
          ...node,
          unlocked: false,
          completedSteps: 0,
          stars: 0,
        };
      }),
    }));
  };

  useEffect(() => {
    const loadSavedData = async () => {
      await dbService.init();
      const savedProfile = await dbService.getUserProfile();
      if (savedProfile.preferredVoiceId) {
        sound.setDefaultVoice(savedProfile.preferredVoiceId);
      }
      sound.setEnabled(savedProfile.soundEnabled);
      setUserProfile(savedProfile);

      const savedProgress = await dbService.getLessonProgress();
      setCurriculum(applySavedProgress(englishCurriculum, savedProgress));

      const srsMap = await dbService.getFlashcardSRSMap();
      const mergedCards = initialFlashcards.map((c) => {
        const savedSrs = srsMap[c.id];
        return savedSrs ? { ...c, ...savedSrs } : c;
      });
      setFlashcards(mergedCards);
    };
    loadSavedData();
  }, []);

  useEffect(() => {
    if (userProfile.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userProfile.darkMode]);

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    dbService.saveUserProfile(updated);
  };

  const handleSoundToggle = () => {
    const nextSound = !userProfile.soundEnabled;
    sound.setEnabled(nextSound);
    handleUpdateProfile({ ...userProfile, soundEnabled: nextSound });
  };

  const handleLoseHeart = () => {
    setUserProfile((prev) => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      const updated: UserProfile = {
        ...prev,
        hearts: nextHearts,
      };
      dbService.saveUserProfile(updated);
      return updated;
    });
  };

  const handleSelectLesson = (lesson: LessonNode, unit: Unit) => {
    setJumpExamNode(null);
    setIsPracticeSession(false);
    setActiveLesson(expandLessonExercises(lesson, unit));
  };

  const handleStartJumpAhead = (targetUnitId: number, targetLessonId?: string) => {
    const examLesson = createMultiUnitJumpAheadLesson({
      units: curriculum,
      targetUnitId,
      targetNodeId: targetLessonId,
    });
    if (!examLesson) return;
    setJumpExamNode(examLesson);
    setIsPracticeSession(false);
    setActiveLesson(examLesson);
  };

  const handleStartPractice = () => {
    const practiceLesson = createPracticeLesson(curriculum);
    if (!practiceLesson) return;
    setJumpExamNode(null);
    setIsPracticeSession(true);
    setActiveLesson(practiceLesson);
  };

  const handleLessonComplete = async (xpEarned: number, mistakesMade: number) => {
    if (!activeLesson) return;

    if (jumpExamNode) {
      for (const skippedId of jumpExamNode.skippedNodeIds) {
        await dbService.saveLessonNodeProgress(skippedId, true, 8, 3);
      }
      if (jumpExamNode.targetNodeId) {
        await dbService.saveLessonNodeProgress(jumpExamNode.targetNodeId, true, 8, 3);
      }
    } else if (!isPracticeSession) {
      const stars = mistakesMade === 0 ? 3 : mistakesMade <= 2 ? 2 : 1;
      await dbService.saveLessonNodeProgress(
        activeLesson.id,
        true,
        activeLesson.totalSteps,
        stars
      );
    }

    const savedProgress = await dbService.getLessonProgress();
    setCurriculum(applySavedProgress(englishCurriculum, savedProgress));

    recordDailyLessonActivity(xpEarned, userProfile.hearts);

    const nextHearts = isPracticeSession
      ? Math.min(userProfile.maxHearts, userProfile.hearts + 1)
      : userProfile.hearts;

    const updatedProfile: UserProfile = {
      ...userProfile,
      xp: userProfile.xp + xpEarned,
      gems: userProfile.gems + (mistakesMade === 0 ? 10 : 5),
      hearts: nextHearts,
    };

    setUserProfile(updatedProfile);
    await dbService.saveUserProfile(updatedProfile);
    setActiveLesson(null);
    setJumpExamNode(null);
    setIsPracticeSession(false);
  };

  const handleReviewCard = (cardId: string, remembered: boolean) => {
    const updated = flashcards.map((card) => {
      if (card.id !== cardId) return card;
      const nextLevel = remembered
        ? Math.min(3, card.srsLevel + 1)
        : Math.max(0, card.srsLevel - 1);
      const updatedCard: Flashcard = {
        ...card,
        srsLevel: nextLevel,
        timesReviewed: card.timesReviewed + 1,
        timesCorrect: remembered ? card.timesCorrect + 1 : card.timesCorrect,
      };
      dbService.saveFlashcardSRS(updatedCard);
      return updatedCard;
    });
    setFlashcards(updated);
  };

  const handleResetProgress = async () => {
    const freshProfile = await dbService.resetAllData();
    setUserProfile(freshProfile);
    setCurriculum(applySavedProgress(englishCurriculum, {}));
    setFlashcards(initialFlashcards);
  };

  const completedLessonsCount = curriculum.reduce(
    (acc, u) =>
      acc + u.nodes.filter((n) => n.stars > 0 || n.completedSteps >= n.totalSteps).length,
    0
  );
  const currentCefrLevel = computeCEFRLevel(completedLessonsCount);

  return (
    <IonApp>
      <TopBar profile={userProfile} onSoundToggle={handleSoundToggle} />
      <IonContent fullscreen className="bg-slate-50 dark:bg-slate-900">
        <main>
          {activeTab === 'roadmap' && (
            <RoadmapPage
              curriculum={curriculum}
              onSelectLesson={handleSelectLesson}
              onOpenTheory={(unitNum) => {
                setTheoryTargetUnit(unitNum);
                setActiveTab('theory');
              }}
              onStartJumpAhead={handleStartJumpAhead}
              onStartPractice={handleStartPractice}
            />
          )}

          {activeTab === 'theory' && (
            <TheoryPage
              initialUnitNumber={theoryTargetUnit}
              showIpa={userProfile.showIpa}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsPage
              cards={flashcards}
              showIpa={userProfile.showIpa}
              onReviewCard={handleReviewCard}
            />
          )}

          {activeTab === 'phonetics' && <PhoneticsPage />}

          {activeTab === 'readings' && <ReadingsPage showIpa={userProfile.showIpa} />}

          {activeTab === 'vocabulary' && <VocabularyPage showIpa={userProfile.showIpa} />}

          {activeTab === 'writing' && <WritingPage />}

          {activeTab === 'speaking' && <SpeakingPage showIpa={userProfile.showIpa} />}

          {activeTab === 'mastery' && (
            <MasteryPage
              cards={flashcards}
              showIpa={userProfile.showIpa}
              onReviewCard={handleReviewCard}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilePage
              profile={userProfile}
              completedLessonsCount={completedLessonsCount}
              currentCefrLevel={currentCefrLevel}
              onUpdateProfile={handleUpdateProfile}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {activeLesson && (
          <QuizModal
            lesson={activeLesson}
            userProfile={userProfile}
            onClose={() => {
              setActiveLesson(null);
              setJumpExamNode(null);
              setIsPracticeSession(false);
            }}
            onComplete={handleLessonComplete}
            onLoseHeart={handleLoseHeart}
            isJumpAhead={Boolean(jumpExamNode)}
            isPractice={isPracticeSession}
          />
        )}
      </IonContent>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </IonApp>
  );
};

export default App;
