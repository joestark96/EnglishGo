import { LessonNode, Unit, Exercise, ExerciseOption, MatchPair } from '../types';
import { englishVocabulary } from '../data/vocabularyData';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function expandLessonExercises(
  node: LessonNode,
  unit?: Unit,
  targetCount: number = 8
): LessonNode {
  const isLecturaInicial =
    node.title.toLowerCase().includes('lectura inicial') ||
    node.exercises.some((ex) => ex.type === 'dialogue-reading');

  if (isLecturaInicial) {
    return {
      ...node,
      totalSteps: node.exercises.length,
      exercises: [...node.exercises]
    };
  }

  if (node.exercises.length >= targetCount) {
    const randomized = node.exercises.map((ex) => {
      if (
        (ex.type === 'multiple-choice' || ex.type === 'listening') &&
        ex.options &&
        ex.options.length > 1
      ) {
        return { ...ex, options: shuffle(ex.options) };
      }
      return { ...ex };
    });
    return {
      ...node,
      totalSteps: randomized.length,
      exercises: randomized
    };
  }

  const generatedExercises: Exercise[] = [];
  const baseExercises = node.exercises.map((ex) => ({ ...ex }));

  const allNodePairs: MatchPair[] = [];
  baseExercises.forEach((ex) => {
    if (ex.type === 'match-pairs' && ex.pairs) {
      allNodePairs.push(...ex.pairs);
    }
  });

  const siblingPairs: MatchPair[] = [];
  if (unit && unit.nodes) {
    unit.nodes.forEach((n) => {
      if (n.id !== node.id) {
        n.exercises.forEach((ex) => {
          if (ex.type === 'match-pairs' && ex.pairs) {
            siblingPairs.push(...ex.pairs);
          }
        });
      }
    });
  }

  const cleanEnglish = (str: string) =>
    str
      .replace(/\/.*?\//g, '')
      .replace(/\s*\([^)]*\)/g, '')
      .trim();

  const allRightOptions = Array.from(
    new Set([
      ...allNodePairs.map((p) => p.right.trim()),
      ...siblingPairs.map((p) => p.right.trim()),
      ...englishVocabulary.map((v) => v.spanish.trim())
    ])
  ).filter(Boolean);

  const allLeftOptions = Array.from(
    new Set([
      ...allNodePairs.map((p) => cleanEnglish(p.left)),
      ...siblingPairs.map((p) => cleanEnglish(p.left)),
      ...englishVocabulary.map((v) => v.english.trim())
    ])
  ).filter(Boolean);

  const buildOptions = (correctText: string, pool: string[]): ExerciseOption[] => {
    const distractors = shuffle(pool.filter((t) => t !== correctText)).slice(0, 3);
    const rawList: ExerciseOption[] = [
      {
        id: `opt-corr-${Math.random().toString(36).substring(2, 6)}`,
        text: correctText,
        isCorrect: true
      },
      ...distractors.map((d, i) => ({
        id: `opt-dist-${i}-${Math.random().toString(36).substring(2, 6)}`,
        text: d,
        isCorrect: false
      }))
    ];
    return shuffle(rawList);
  };

  allNodePairs.forEach((pair, idx) => {
    const cleanLeft = cleanEnglish(pair.left);
    const cleanRight = pair.right.trim();
    if (cleanLeft && cleanRight) {
      const options = buildOptions(cleanRight, allRightOptions);
      const correctOpt = options.find((o) => o.isCorrect)!;
      generatedExercises.push({
        id: `gen-listen-${node.id}-${idx}-${pair.id}`,
        type: 'listening',
        prompt: 'Escucha el audio en inglés y selecciona su significado o función:',
        promptSub: pair.leftSub,
        englishVoiceText: cleanLeft,
        options,
        correctAnswerId: correctOpt.id,
        explanation: `"${pair.left}" corresponde a "${cleanRight}".`
      });

      const leftOptions = buildOptions(cleanLeft, allLeftOptions);
      const correctLeftOpt = leftOptions.find((o) => o.isCorrect)!;
      generatedExercises.push({
        id: `gen-mc-rev-${node.id}-${idx}-${pair.id}`,
        type: 'multiple-choice',
        prompt: `¿Qué expresión en inglés corresponde a: "${cleanRight}"?`,
        englishVoiceText: cleanLeft,
        options: leftOptions,
        correctAnswerId: correctLeftOpt.id,
        explanation: `"${cleanRight}" corresponde a "${cleanLeft}".`
      });
    }
  });

  const unitVocab = englishVocabulary.filter((v) => v.unit === node.unitId);
  unitVocab.forEach((v, idx) => {
    const options = buildOptions(v.spanish, allRightOptions);
    const correctOpt = options.find((o) => o.isCorrect)!;
    generatedExercises.push({
      id: `gen-vocab-${node.id}-${idx}-${v.id}`,
      type: idx % 2 === 0 ? 'listening' : 'multiple-choice',
      prompt:
        idx % 2 === 0
          ? 'Escucha la palabra en inglés y selecciona su significado:'
          : `¿Qué significa "${v.english}" (${v.ipa})?`,
      promptSub: v.exampleEn,
      englishVoiceText: v.english,
      options,
      correctAnswerId: correctOpt.id,
      explanation: `"${v.english}" (${v.ipa}) significa "${v.spanish}". Ejemplo: ${v.exampleEn}`
    });
  });

  if (unit && unit.nodes) {
    const siblingExercises: Exercise[] = [];
    unit.nodes.forEach((n) => {
      if (n.id !== node.id) {
        n.exercises.forEach((ex) => {
          if (ex.type !== 'dialogue-reading') {
            siblingExercises.push(ex);
          }
        });
      }
    });
    const shuffledSiblings = shuffle(siblingExercises);
    for (const sib of shuffledSiblings) {
      if (baseExercises.length + generatedExercises.length >= targetCount + 4) break;
      generatedExercises.push({
        ...sib,
        id: `gen-sib-${sib.id}-${Math.random().toString(36).substring(2, 6)}`
      });
    }
  }

  const needed = Math.max(0, targetCount - baseExercises.length);
  const selectedGen = shuffle(generatedExercises).slice(0, needed);
  const combined = [...baseExercises, ...selectedGen];

  const finalExercises: Exercise[] = combined.slice(0, targetCount).map((ex) => {
    if (
      (ex.type === 'multiple-choice' || ex.type === 'listening') &&
      ex.options &&
      ex.options.length > 1
    ) {
      return { ...ex, options: shuffle(ex.options) };
    }
    return { ...ex };
  });

  return {
    ...node,
    totalSteps: finalExercises.length,
    exercises: finalExercises
  };
}
