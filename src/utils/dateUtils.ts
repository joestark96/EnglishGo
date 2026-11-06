export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface DailyQuestStats {
  lessonsCompleted: number;
  xpEarned: number;
  maintainedHearts: boolean;
}

const DAILY_STATS_PREFIX = 'english_dojo_daily_stats_';

export function getDailyQuestStats(dateKey: string = getLocalDateKey()): DailyQuestStats {
  try {
    const raw = localStorage.getItem(`${DAILY_STATS_PREFIX}${dateKey}`);
    if (raw) {
      return JSON.parse(raw) as DailyQuestStats;
    }
  } catch {
    // ignore
  }
  return {
    lessonsCompleted: 0,
    xpEarned: 0,
    maintainedHearts: false
  };
}

export function recordDailyLessonActivity(
  earnedXp: number,
  currentHearts: number,
  dateKey: string = getLocalDateKey()
): DailyQuestStats {
  const prev = getDailyQuestStats(dateKey);
  const updated: DailyQuestStats = {
    lessonsCompleted: prev.lessonsCompleted + 1,
    xpEarned: prev.xpEarned + earnedXp,
    maintainedHearts: prev.maintainedHearts || currentHearts >= 3
  };
  try {
    localStorage.setItem(`${DAILY_STATS_PREFIX}${dateKey}`, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}
