import { LessonNode, Unit, Exercise, ExerciseOption, MatchPair } from '../types';
import { englishVocabulary } from '../data/vocabularyData';
import { cleanEnglishForSpeech } from '../services/sound';

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
  targetCount: number = 12
): LessonNode {
  const dialogueExercises = node.exercises.filter((ex) => ex.type === 'dialogue-reading');
  const nonDialogueBase = node.exercises
    .filter((ex) => ex.type !== 'dialogue-reading')
    .map((ex) => ({ ...ex }));

  const generatedExercises: Exercise[] = [];

  // 1. Extract dialogue lines from this node or unit to create listening & word-order exercises
  const unitDialogueLines =
    dialogueExercises[0]?.dialogueLines ||
    unit?.nodes
      .flatMap((n) => n.exercises)
      .find((e) => e.type === 'dialogue-reading' && e.dialogueLines)?.dialogueLines ||
    [];

  const allNodePairs: MatchPair[] = [];
  nonDialogueBase.forEach((ex) => {
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

  const allRightOptions = Array.from(
    new Set([
      ...allNodePairs.map((p) => p.right.trim()),
      ...siblingPairs.map((p) => p.right.trim()),
      ...unitDialogueLines.map((l) => l.spanish.trim()),
      ...englishVocabulary.map((v) => v.spanish.trim()),
    ])
  ).filter(Boolean);

  const allLeftOptions = Array.from(
    new Set([
      ...allNodePairs.map((p) => cleanEnglishForSpeech(p.left)),
      ...siblingPairs.map((p) => cleanEnglishForSpeech(p.left)),
      ...unitDialogueLines.map((l) => cleanEnglishForSpeech(l.english)),
      ...englishVocabulary.map((v) => v.english.trim()),
    ])
  ).filter(Boolean);

  const buildOptions = (correctText: string, pool: string[]): ExerciseOption[] => {
    const distractors = shuffle(pool.filter((t) => t && t !== correctText)).slice(0, 3);
    const rawList: ExerciseOption[] = [
      {
        id: `opt-corr-${Math.random().toString(36).substring(2, 6)}`,
        text: correctText,
        isCorrect: true,
      },
      ...distractors.map((d, i) => ({
        id: `opt-dist-${i}-${Math.random().toString(36).substring(2, 6)}`,
        text: d,
        isCorrect: false,
      })),
    ];
    return shuffle(rawList);
  };

  // 2. Generate exercises from dialogue lines (especially great for Lectura Inicial & Listening)
  unitDialogueLines.forEach((line, idx) => {
    const cleanEn = cleanEnglishForSpeech(line.english);
    if (!cleanEn || !line.spanish) return;

    const listenOpts = buildOptions(line.spanish, allRightOptions);
    const listenCorr = listenOpts.find((o) => o.isCorrect)!;
    generatedExercises.push({
      id: `gen-dlg-ls-${node.id}-${idx}`,
      type: 'listening',
      prompt: `Escucha a ${line.speaker} y selecciona qué dijo en español:`,
      promptSub: line.ipa,
      englishVoiceText: cleanEn,
      options: listenOpts,
      correctAnswerId: listenCorr.id,
      explanation: `${line.speaker} dijo: "${line.english}" (${line.spanish}).`,
    });

    const words = cleanEn
      .replace(/[.,!?]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    if (words.length >= 4 && words.length <= 11) {
      const extraDistractors = ['however', 'always', 'yesterday', 'already'].filter(
        (w) => !words.map((x) => x.toLowerCase()).includes(w)
      );
      generatedExercises.push({
        id: `gen-dlg-wo-${node.id}-${idx}`,
        type: 'word-order',
        prompt: `Ordena la frase del diálogo: "${line.spanish}"`,
        promptSub: line.ipa,
        englishVoiceText: cleanEn,
        wordBank: [...words, ...extraDistractors.slice(0, 2)],
        correctSentence: words,
        explanation: `Oración correcta: "${line.english}".`,
      });
    }
  });

  // 3. Generate exercises from node pairs
  allNodePairs.forEach((pair, idx) => {
    const cleanLeft = cleanEnglishForSpeech(pair.left);
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
        explanation: `"${pair.left}" corresponde a "${cleanRight}".`,
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
        explanation: `"${cleanRight}" se dice "${cleanLeft}" en inglés.`,
      });
    }
  });

  // 4. Generate exercises from unit vocabulary (plus adjacent units if needed)
  const unitVocab = englishVocabulary.filter(
    (v) => v.unit === node.unitId || v.unit === Math.max(1, node.unitId)
  );
  unitVocab.forEach((v, idx) => {
    const options = buildOptions(v.spanish, allRightOptions);
    const correctOpt = options.find((o) => o.isCorrect)!;
    generatedExercises.push({
      id: `gen-vocab-${node.id}-${idx}-${v.id}`,
      type: idx % 2 === 0 ? 'listening' : 'multiple-choice',
      prompt:
        idx % 2 === 0
          ? 'Escucha la palabra o frase en inglés y selecciona su significado:'
          : `¿Qué significa "${v.english}" (${v.ipa})?`,
      promptSub: v.exampleEn,
      englishVoiceText: v.english,
      options,
      correctAnswerId: correctOpt.id,
      explanation: `"${v.english}" (${v.ipa}) significa "${v.spanish}". Ejemplo: "${v.exampleEn}"`,
    });

    const exWords = v.exampleEn
      .replace(/[.,!?]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    if (exWords.length >= 4 && exWords.length <= 10) {
      generatedExercises.push({
        id: `gen-vocab-wo-${node.id}-${idx}-${v.id}`,
        type: 'word-order',
        prompt: `Traduce y ordena el ejemplo: "${v.exampleEs}"`,
        englishVoiceText: v.exampleEn,
        wordBank: [...exWords, 'never', 'being'],
        correctSentence: exWords,
        explanation: `"${v.exampleEn}" — ${v.exampleEs}`,
      });
    }
  });

  // 5. Pull sibling exercises from the same unit
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
      if (nonDialogueBase.length + generatedExercises.length >= targetCount + 6) break;
      generatedExercises.push({
        ...sib,
        id: `gen-sib-${sib.id}-${Math.random().toString(36).substring(2, 6)}`,
      });
    }
  }

  const desiredNonDialogue = Math.max(
    1,
    targetCount - dialogueExercises.length - nonDialogueBase.length
  );
  const selectedGen = shuffle(generatedExercises).slice(0, desiredNonDialogue);

  const randomizedNonDialogue = [...nonDialogueBase, ...selectedGen]
    .slice(0, targetCount - dialogueExercises.length)
    .map((ex) => {
      if (
        (ex.type === 'multiple-choice' || ex.type === 'listening') &&
        ex.options &&
        ex.options.length > 1
      ) {
        return { ...ex, options: shuffle(ex.options) };
      }
      return { ...ex };
    });

  // Always keep dialogue-reading first if present, followed by all interactive exercises
  const finalExercises: Exercise[] = [...dialogueExercises, ...randomizedNonDialogue];

  return {
    ...node,
    totalSteps: finalExercises.length,
    exercises: finalExercises,
  };
}
