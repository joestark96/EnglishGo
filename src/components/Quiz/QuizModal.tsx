import React, { useState, useEffect } from 'react';
import { LessonNode, UserProfile, Exercise, ExerciseOption, MatchPair } from '../../types';
import { X, Heart, Check, AlertCircle, Volume2, Award, ArrowRight, ShieldAlert } from 'lucide-react';
import { sound } from '../../services/sound';
import { SpeechPracticeButton } from '../SpeechPracticeButton';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  lesson: LessonNode;
  userProfile: UserProfile;
  onClose: () => void;
  onComplete: (xpEarned: number, mistakesMade: number) => void;
  onLoseHeart: () => void;
  isJumpAhead?: boolean;
  isPractice?: boolean;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  lesson,
  userProfile,
  onClose,
  onComplete,
  onLoseHeart,
  isJumpAhead = false,
  isPractice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<{ word: string; originalIdx: number }[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);

  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [mistakes, setMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const exercises = lesson.exercises || [];
  const currentExercise: Exercise | undefined = exercises[currentIndex];

  const [shuffledWords, setShuffledWords] = useState<{ word: string; idx: number }[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<MatchPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchPair[]>([]);

  useEffect(() => {
    if (!currentExercise) return;

    if (currentExercise.type === 'word-order' && currentExercise.wordBank) {
      const wordsWithIdx = currentExercise.wordBank.map((w, idx) => ({ word: w, idx }));
      setShuffledWords([...wordsWithIdx].sort(() => Math.random() - 0.5));
    }

    if (currentExercise.type === 'match-pairs' && currentExercise.pairs) {
      setShuffledLeft([...currentExercise.pairs].sort(() => Math.random() - 0.5));
      setShuffledRight([...currentExercise.pairs].sort(() => Math.random() - 0.5));
    }

    if (
      (currentExercise.type === 'listening' || currentExercise.type === 'multiple-choice') &&
      currentExercise.englishVoiceText
    ) {
      const timer = setTimeout(() => {
        sound.speakEnglish(currentExercise.englishVoiceText!);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentExercise]);

  useEffect(() => {
    if (selectedLeftId && selectedRightId && currentExercise?.type === 'match-pairs') {
      if (selectedLeftId === selectedRightId) {
        sound.playCorrect();
        const newMatched = [...matchedPairIds, selectedLeftId];
        setMatchedPairIds(newMatched);
        setSelectedLeftId(null);
        setSelectedRightId(null);

        if (newMatched.length === (currentExercise.pairs?.length || 0)) {
          setStatus('correct');
        }
      } else {
        sound.playIncorrect();
        setMistakes((m) => m + 1);
        if (!isJumpAhead && !isPractice) {
          onLoseHeart();
        }
        setTimeout(() => {
          setSelectedLeftId(null);
          setSelectedRightId(null);
        }, 450);
      }
    }
  }, [selectedLeftId, selectedRightId]);

  if (!currentExercise && !isFinished) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          Esta lección aún no tiene ejercicios configurados.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-duo-green text-white font-bold rounded-xl"
        >
          Volver al Mapa
        </button>
      </div>
    );
  }

  const getCorrectAnswerLabel = (): string => {
    if (!currentExercise) return '';
    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening') {
      const found = currentExercise.options?.find(
        (o) => o.id === currentExercise.correctAnswerId || o.isCorrect
      );
      return found ? found.text : '';
    }
    if (currentExercise.type === 'word-order') {
      return (currentExercise.correctSentence || []).join(' ');
    }
    return '';
  };

  const handleCheck = () => {
    if (status !== 'idle' || !currentExercise) return;

    if (currentExercise.type === 'dialogue-reading') {
      sound.playCorrect();
      setStatus('correct');
      return;
    }

    let isCorrect = false;
    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening') {
      const chosenOpt = currentExercise.options?.find((o) => o.id === selectedOptionId);
      isCorrect = Boolean(
        selectedOptionId === currentExercise.correctAnswerId || chosenOpt?.isCorrect
      );
    } else if (currentExercise.type === 'word-order') {
      const builtSentence = selectedWords.map((w) => w.word).join(' ');
      const targetSentence = (currentExercise.correctSentence || []).join(' ');
      const normalizedBuilt = builtSentence.replace(/\s+/g, ' ').trim().toLowerCase();
      const normalizedCorrect = targetSentence.replace(/\s+/g, ' ').trim().toLowerCase();
      isCorrect = normalizedBuilt === normalizedCorrect;
    } else if (currentExercise.type === 'match-pairs') {
      isCorrect = matchedPairIds.length === (currentExercise.pairs?.length || 0);
    }

    if (isCorrect) {
      sound.playCorrect();
      setStatus('correct');
    } else {
      sound.playIncorrect();
      setStatus('incorrect');
      setMistakes((m) => m + 1);
      if (!isJumpAhead && !isPractice) {
        onLoseHeart();
      }
    }
  };

  const handleNext = () => {
    if (!isJumpAhead && !isPractice && userProfile.hearts <= 0) {
      onClose();
      return;
    }

    if (isJumpAhead && mistakes > 3) {
      onClose();
      return;
    }

    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionId('');
      setSelectedWords([]);
      setMatchedPairIds([]);
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setStatus('idle');
    } else {
      sound.playLessonComplete();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsFinished(true);
    }
  };

  const progressPercent =
    ((currentIndex + (status === 'correct' ? 1 : 0)) / Math.max(1, exercises.length)) * 100;

  const xpReward = isJumpAhead ? 50 : isPractice ? 25 : 20;

  if (isFinished) {
    const accuracy = Math.max(
      0,
      Math.round(((exercises.length - mistakes) / Math.max(1, exercises.length)) * 100)
    );
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="w-28 h-28 bg-duo-yellow/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Award className="w-16 h-16 text-duo-yellow fill-duo-yellow" />
        </div>
        <h2 className="text-3xl font-extrabold text-duo-yellow mb-2 text-center">
          {isJumpAhead
            ? '¡Examen de Salto Superado!'
            : isPractice
            ? '¡Práctica Completada!'
            : '¡Lección Completada!'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 text-center">
          {lesson.title} • {lesson.englishTitle}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          <div className="bg-duo-yellow/10 border-2 border-duo-yellow rounded-2xl p-4 text-center">
            <div className="text-xs font-bold uppercase text-duo-yellow-dark mb-1">XP Ganada</div>
            <div className="text-2xl font-black text-duo-yellow-dark">+{xpReward} XP</div>
          </div>
          <div className="bg-duo-green/10 border-2 border-duo-green rounded-2xl p-4 text-center">
            <div className="text-xs font-bold uppercase text-duo-green-dark mb-1">Precisión</div>
            <div className="text-2xl font-black text-duo-green-dark">{accuracy}%</div>
          </div>
        </div>

        <button
          onClick={() => onComplete(xpReward, mistakes)}
          className="w-full max-w-sm py-4 bg-duo-green hover:bg-duo-green-dark text-white font-extrabold rounded-2xl shadow-duo-btn active:shadow-duo-btn-active active:translate-y-1 transition-all text-lg"
        >
          CONTINUAR
        </button>
      </div>
    );
  }

  if (!isJumpAhead && !isPractice && userProfile.hearts <= 0) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center">
        <Heart className="w-20 h-20 text-duo-red mb-4 animate-pulse" />
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2">
          ¡Te quedaste sin vidas!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
          Tus vidas se regeneran automáticamente 1 cada hora, o puedes recargarlas en tu Perfil
          usando gemas o practicando con el botón de pesas.
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3.5 bg-duo-blue text-white font-extrabold rounded-2xl shadow-duo-blue"
        >
          Entendido
        </button>
      </div>
    );
  }

  if (isJumpAhead && mistakes > 3) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-20 h-20 text-duo-red mb-4 animate-bounce" />
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2">
          ¡Examen de Salto No Superado!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
          Has cometido más de 3 errores en la prueba de nivel. ¡Repasa la guía teórica de la unidad
          o vuelve a intentarlo cuando estés listo!
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3.5 bg-duo-purple text-white font-extrabold rounded-2xl shadow-duo-purple"
        >
          Volver al Mapa
        </button>
      </div>
    );
  }

  const isCheckDisabled =
    currentExercise.type === 'dialogue-reading'
      ? false
      : (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening') &&
        !selectedOptionId
      ? true
      : currentExercise.type === 'word-order' && selectedWords.length === 0
      ? true
      : currentExercise.type === 'match-pairs' &&
        matchedPairIds.length < (currentExercise.pairs?.length || 0);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col justify-between overflow-y-auto">
      {/* Top Progress Bar */}
      <div className="max-w-2xl w-full mx-auto px-4 pt-6 pb-2 flex items-center gap-4">
        <button
          onClick={onClose}
          aria-label="Cerrar lección"
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-duo-green transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {isJumpAhead ? (
          <div className="flex items-center gap-1.5 text-duo-purple font-extrabold bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-xl text-sm">
            <span>Escudos: {Math.max(0, 3 - mistakes)}/3</span>
          </div>
        ) : isPractice ? (
          <div className="flex items-center gap-1.5 text-duo-blue font-extrabold bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-xl text-sm">
            <span>Práctica Libre</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-duo-red font-extrabold">
            <Heart className="w-6 h-6 fill-duo-red" />
            <span>{userProfile.hearts}</span>
          </div>
        )}
      </div>

      {/* Exercise Body */}
      <div className="max-w-xl w-full mx-auto px-6 py-4 flex-1 flex flex-col justify-center">
        <span className="text-xs font-extrabold uppercase tracking-wider text-duo-blue mb-1">
          {currentExercise.type === 'dialogue-reading' && 'Diálogo y Lectura Situacional'}
          {currentExercise.type === 'listening' && 'Comprensión Auditiva'}
          {currentExercise.type === 'multiple-choice' && 'Selección Múltiple'}
          {currentExercise.type === 'word-order' && 'Ordena la Oración'}
          {currentExercise.type === 'match-pairs' && 'Empareja los Pares'}
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
          {currentExercise.prompt}
        </h2>
        {currentExercise.promptSub && (
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">
            {currentExercise.promptSub}
          </p>
        )}

        {/* Speaker / Audio Prompt */}
        {currentExercise.englishVoiceText && currentExercise.type !== 'dialogue-reading' && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-duo-blue/10 border-2 border-duo-blue/30 rounded-2xl">
            <button
              onClick={() => sound.speakEnglish(currentExercise.englishVoiceText!)}
              aria-label="Reproducir pronunciación en inglés"
              className="w-14 h-14 bg-duo-blue hover:bg-duo-blue-dark text-white rounded-2xl flex items-center justify-center shadow-duo-blue active:translate-y-1 transition-all shrink-0"
            >
              <Volume2 className="w-7 h-7" />
            </button>
            <div className="flex-1">
              {currentExercise.type === 'listening' ? (
                <p className="text-sm font-bold text-duo-blue-dark dark:text-duo-blue">
                  Pulsa el altavoz para escuchar la frase en inglés
                </p>
              ) : (
                <p className="text-lg font-extrabold text-gray-800 dark:text-white">
                  {currentExercise.englishVoiceText}
                </p>
              )}
            </div>
            {currentExercise.type !== 'listening' && (
              <SpeechPracticeButton targetText={currentExercise.englishVoiceText} compact />
            )}
          </div>
        )}

        {/* DIALOGUE READING */}
        {currentExercise.type === 'dialogue-reading' && currentExercise.dialogueLines && (
          <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-2">
              {currentExercise.dialogueContext && (
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {currentExercise.dialogueContext}
                </span>
              )}
              <button
                onClick={() => {
                  currentExercise.dialogueLines?.forEach((line, i) => {
                    setTimeout(() => {
                      sound.speakEnglish(line.audioText || line.english, line.speaker);
                    }, i * 2500);
                  });
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-duo-blue/15 text-duo-blue font-bold text-xs hover:bg-duo-blue/25 transition shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                Escuchar Diálogo
              </button>
            </div>
            {currentExercise.dialogueLines.map((line, idx) => (
              <div
                key={idx}
                onClick={() => sound.speakEnglish(line.audioText || line.english, line.speaker)}
                className="p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 hover:border-duo-blue cursor-pointer transition-all flex items-start gap-3"
              >
                <button
                  type="button"
                  aria-label={`Escuchar línea de ${line.speaker}`}
                  className="p-2 rounded-xl bg-duo-blue text-white shrink-0 mt-0.5"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1">
                  <div className="text-xs font-extrabold uppercase text-duo-blue mb-0.5">
                    {line.speaker}
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-gray-100">
                    {line.english}
                  </div>
                  {userProfile.showIpa && line.ipa && (
                    <div className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                      {line.ipa}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {line.spanish}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MULTIPLE CHOICE & LISTENING */}
        {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening') &&
          currentExercise.options && (
            <div className="grid grid-cols-1 gap-3">
              {currentExercise.options.map((opt: ExerciseOption, idx: number) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={status !== 'idle'}
                    onClick={() => {
                      sound.playTap();
                      setSelectedOptionId(opt.id);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-duo-blue bg-duo-blue/10 text-duo-blue-dark dark:text-duo-blue'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <div>
                      <div>{opt.text}</div>
                      {userProfile.showIpa && opt.ipa && (
                        <div className="text-xs font-mono text-purple-500">{opt.ipa}</div>
                      )}
                    </div>
                    <span className="w-7 h-7 rounded-lg border-2 border-current flex items-center justify-center text-xs font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

        {/* WORD ORDER */}
        {currentExercise.type === 'word-order' && (
          <div>
            {/* Answer tray */}
            <div className="min-h-[72px] p-3 mb-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-wrap gap-2 items-center">
              {selectedWords.length === 0 && (
                <span className="text-sm text-gray-400">
                  Pulsa las palabras en orden para formar la oración...
                </span>
              )}
              {selectedWords.map((item, i) => (
                <button
                  key={i}
                  disabled={status !== 'idle'}
                  onClick={() => {
                    sound.playTap();
                    setSelectedWords(selectedWords.filter((_, idx) => idx !== i));
                  }}
                  className="px-3.5 py-2 bg-white dark:bg-gray-800 border-2 border-duo-blue text-gray-800 dark:text-gray-100 font-bold rounded-xl shadow-sm"
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2 justify-center">
              {shuffledWords.map((item) => {
                const isUsed = selectedWords.some((sw) => sw.originalIdx === item.idx);
                return (
                  <button
                    key={item.idx}
                    disabled={isUsed || status !== 'idle'}
                    onClick={() => {
                      sound.playTap();
                      sound.speakEnglish(item.word);
                      setSelectedWords([
                        ...selectedWords,
                        { word: item.word, originalIdx: item.idx },
                      ]);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold border-2 transition-all ${
                      isUsed
                        ? 'bg-gray-200 dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-transparent cursor-default'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-duo-blue text-gray-800 dark:text-gray-100 shadow-sm active:translate-y-0.5'
                    }`}
                  >
                    {item.word}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MATCH PAIRS */}
        {currentExercise.type === 'match-pairs' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              {shuffledLeft.map((pair) => {
                const isMatched = matchedPairIds.includes(pair.id);
                const isSelected = selectedLeftId === pair.id;
                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => {
                      sound.speakEnglish(pair.left);
                      setSelectedLeftId(pair.id);
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 font-bold text-center transition-all ${
                      isMatched
                        ? 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800/40 text-gray-400 opacity-50'
                        : isSelected
                        ? 'border-duo-blue bg-duo-blue/15 text-duo-blue'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <div>{pair.left}</div>
                    {userProfile.showIpa && pair.leftSub && (
                      <div className="text-[11px] font-mono text-gray-400">{pair.leftSub}</div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5">
              {shuffledRight.map((pair) => {
                const isMatched = matchedPairIds.includes(pair.id);
                const isSelected = selectedRightId === pair.id;
                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => {
                      sound.playTap();
                      setSelectedRightId(pair.id);
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 font-bold text-center transition-all ${
                      isMatched
                        ? 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800/40 text-gray-400 opacity-50'
                        : isSelected
                        ? 'border-duo-blue bg-duo-blue/15 text-duo-blue'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {pair.right}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div
        className={`border-t-2 p-4 sm:p-6 transition-colors ${
          status === 'correct'
            ? 'bg-green-100 dark:bg-green-950/80 border-duo-green'
            : status === 'incorrect'
            ? 'bg-red-100 dark:bg-red-950/80 border-duo-red'
            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
        }`}
      >
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {status === 'correct' && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-duo-green text-white flex items-center justify-center shrink-0">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-duo-green-dark dark:text-green-300 text-lg">
                  ¡Excelente trabajo!
                </h4>
                {currentExercise.explanation && (
                  <p className="text-xs text-green-800 dark:text-green-200 mt-0.5">
                    {currentExercise.explanation}
                  </p>
                )}
              </div>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-duo-red text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-duo-red-dark dark:text-red-300 text-sm">
                  Respuesta correcta:
                </h4>
                <p className="font-bold text-red-900 dark:text-red-100 text-base">
                  {getCorrectAnswerLabel()}
                </p>
                {currentExercise.explanation && (
                  <p className="text-xs text-red-800 dark:text-red-200 mt-0.5">
                    {currentExercise.explanation}
                  </p>
                )}
              </div>
            </div>
          )}

          {status === 'idle' ? (
            <button
              disabled={isCheckDisabled}
              onClick={handleCheck}
              className={`w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${
                isCheckDisabled
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-duo-green hover:bg-duo-green-dark text-white shadow-duo-btn active:shadow-duo-btn-active active:translate-y-1'
              }`}
            >
              {currentExercise.type === 'dialogue-reading'
                ? 'HE LEÍDO Y ESCUCHADO EL DIÁLOGO'
                : 'COMPROBAR'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white flex items-center justify-center gap-2 transition-all ${
                status === 'correct'
                  ? 'bg-duo-green hover:bg-duo-green-dark shadow-duo-btn'
                  : 'bg-duo-red hover:bg-duo-red-dark shadow-duo-red'
              }`}
            >
              <span>CONTINUAR</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
