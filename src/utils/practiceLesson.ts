import { Unit, LessonNode, Exercise } from '../types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createPracticeLesson(units: Unit[]): LessonNode | null {
  let pool: Exercise[] = [];
  units.forEach((unit) => {
    unit.nodes.forEach((node) => {
      if (node.stars > 0 || node.completedSteps >= node.totalSteps) {
        node.exercises
          .filter((ex) => ex.type !== 'dialogue-reading')
          .forEach((ex) => pool.push(ex));
      }
    });
  });

  if (pool.length === 0) {
    units.forEach((unit) => {
      unit.nodes.forEach((node) => {
        if (node.unlocked) {
          node.exercises
            .filter((ex) => ex.type !== 'dialogue-reading')
            .forEach((ex) => pool.push(ex));
        }
      });
    });
  }

  if (pool.length === 0 && units[0]?.nodes[0]?.exercises) {
    pool = [...units[0].nodes[0].exercises];
  }

  if (pool.length === 0) return null;

  const targetCount = Math.min(12, Math.max(8, pool.length));
  const selected = shuffle(pool).slice(0, targetCount);

  const randomizedExercises: Exercise[] = selected.map((ex, idx) => {
    const clone = {
      ...ex,
      id: `practice-${idx}-${ex.id}-${Math.random().toString(36).substring(2, 6)}`
    };
    if (
      (clone.type === 'multiple-choice' || clone.type === 'listening') &&
      clone.options &&
      clone.options.length > 1
    ) {
      clone.options = shuffle(clone.options);
    }
    return clone;
  });

  return {
    id: `practice-${Date.now()}`,
    unitId: 0,
    lessonNumber: 0,
    title: 'Entrenamiento de Repaso',
    englishTitle: 'Daily Rapid Review Session',
    description: `Sesión de entrenamiento con ${randomizedExercises.length} ejercicios aleatorios de tus lecciones cursadas.`,
    icon: 'Dumbbell',
    color: 'blue',
    totalSteps: randomizedExercises.length,
    unlocked: true,
    completedSteps: 0,
    stars: 0,
    exercises: randomizedExercises
  };
}

export function createUnitReviewLesson(unit: Unit): LessonNode | null {
  const pool: Exercise[] = [];
  unit.nodes.forEach((node) => {
    node.exercises
      .filter((ex) => ex.type !== 'dialogue-reading')
      .forEach((ex) => pool.push(ex));
  });

  if (pool.length === 0) return null;

  const targetCount = Math.min(pool.length, 10);
  const selected = shuffle(pool).slice(0, targetCount);

  const randomizedExercises: Exercise[] = selected.map((ex, idx) => {
    const clone = {
      ...ex,
      id: `review-${unit.id}-${idx}-${ex.id}`
    };
    if (
      (clone.type === 'multiple-choice' || clone.type === 'listening') &&
      clone.options &&
      clone.options.length > 1
    ) {
      clone.options = shuffle(clone.options);
    }
    return clone;
  });

  return {
    id: `unit-review-${unit.id}-${Date.now()}`,
    unitId: unit.id,
    lessonNumber: unit.id,
    title: `Repaso: ${unit.title}`,
    englishTitle: `${unit.subtitle} (Unit Review)`,
    description: `Repaso completo de los ejercicios de la ${unit.title}.`,
    icon: 'Sparkles',
    color: 'orange',
    totalSteps: randomizedExercises.length,
    unlocked: true,
    completedSteps: 0,
    stars: 3,
    exercises: randomizedExercises
  };
}
