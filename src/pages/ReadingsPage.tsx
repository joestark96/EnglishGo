import React, { useState, useRef } from 'react';
import { englishCurriculum } from '../data/englishCurriculum';
import { Volume2, Headphones, Square, BookOpen } from 'lucide-react';
import { sound } from '../services/sound';

interface ReadingsPageProps {
  showIpa: boolean;
}

export const ReadingsPage: React.FC<ReadingsPageProps> = ({ showIpa }) => {
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const unitsWithDialogues = englishCurriculum.filter((u) =>
    u.nodes.some((l) => l.exercises.some((e) => e.type === 'dialogue-reading' && e.dialogueLines))
  );

  const currentUnit =
    unitsWithDialogues.find((u) => u.id === selectedUnitNumber) || unitsWithDialogues[0];

  const dialogueExercise = currentUnit?.nodes
    .flatMap((l) => l.exercises)
    .find((e) => e.type === 'dialogue-reading' && e.dialogueLines);

  const lines = dialogueExercise?.dialogueLines || [];

  const stopPodcast = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    setIsPlayingPodcast(false);
    setActiveLineIdx(null);
    sound.stopSpeech();
  };

  const startPodcast = () => {
    stopPodcast();
    setIsPlayingPodcast(true);
    lines.forEach((line, idx) => {
      const t = window.setTimeout(() => {
        setActiveLineIdx(idx);
        sound.speakEnglish(line.audioText || line.english, line.speaker);
        if (idx === lines.length - 1) {
          const endTimer = window.setTimeout(() => {
            setIsPlayingPodcast(false);
            setActiveLineIdx(null);
          }, 3000);
          timersRef.current.push(endTimer);
        }
      }, idx * 3200);
      timersRef.current.push(t);
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <Headphones className="w-6 h-6 text-duo-purple" />
          Lecturas Situacionales y Modo Podcast
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Escucha diálogos reales de cada unidad con reproducción continua o línea por línea.
        </p>
      </div>

      {/* Unit Selector */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {unitsWithDialogues.map((u) => (
          <button
            key={u.id}
            onClick={() => {
              stopPodcast();
              setSelectedUnitNumber(u.id);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border-2 transition ${
              selectedUnitNumber === u.id
                ? 'bg-duo-purple text-white border-duo-purple shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
            }`}
          >
            U{u.id} • {u.cefrLevel}
          </button>
        ))}
      </div>

      {currentUnit && (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <span className="text-xs font-extrabold uppercase text-duo-purple">
                Unidad {currentUnit.id} • Nivel {currentUnit.cefrLevel}
              </span>
              <h2 className="text-xl font-black text-gray-800 dark:text-white mt-0.5">
                {dialogueExercise?.dialogueTitle || currentUnit.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {dialogueExercise?.dialogueContext || dialogueExercise?.prompt}
              </p>
            </div>

            {!isPlayingPodcast ? (
              <button
                onClick={startPodcast}
                className="px-5 py-3 rounded-2xl bg-duo-purple hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-duo-purple self-start sm:self-center shrink-0"
              >
                <Headphones className="w-4 h-4" />
                <span>REPRODUCIR MODO PODCAST</span>
              </button>
            ) : (
              <button
                onClick={stopPodcast}
                className="px-5 py-3 rounded-2xl bg-duo-red text-white font-extrabold text-xs flex items-center gap-2 shadow-duo-red self-start sm:self-center shrink-0"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>DETENER PODCAST</span>
              </button>
            )}
          </div>

          {/* Dialogue Lines */}
          <div className="space-y-3">
            {lines.map((line, idx) => {
              const isCurrent = activeLineIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => sound.speakEnglish(line.audioText || line.english, line.speaker)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                    isCurrent
                      ? 'border-duo-purple bg-purple-50 dark:bg-purple-950/40 scale-[1.01]'
                      : 'border-gray-200 dark:border-gray-700 hover:border-duo-blue bg-gray-50 dark:bg-gray-900/50'
                  }`}
                >
                  <button
                    type="button"
                    aria-label={`Escuchar línea de ${line.speaker}`}
                    className="p-2.5 rounded-xl bg-duo-blue text-white shrink-0 mt-0.5"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1">
                    <div className="text-xs font-extrabold uppercase text-duo-purple mb-0.5">
                      {line.speaker}
                    </div>
                    <div className="text-base font-extrabold text-gray-800 dark:text-white">
                      {line.english}
                    </div>
                    {showIpa && line.ipa && (
                      <div className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                        {line.ipa}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {line.spanish}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {dialogueExercise?.explanation && (
            <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 flex items-start gap-2.5">
              <BookOpen className="w-5 h-5 text-duo-blue shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700 dark:text-gray-200 font-medium">
                {dialogueExercise.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
