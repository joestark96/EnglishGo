import React, { useState } from 'react';
import { englishVocabulary } from '../data/vocabularyData';
import { PenTool, Volume2, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { sound } from '../services/sound';

export const WritingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<'guided' | 'memory'>('guided');
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [streak, setStreak] = useState(0);

  const currentItem = englishVocabulary[currentIndex] || englishVocabulary[0];

  const cleanTarget = currentItem.english.replace(/^to\s+/i, '').trim();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const normalizedInput = inputValue.trim().toLowerCase();
    const isMatch =
      normalizedInput === currentItem.english.toLowerCase() ||
      normalizedInput === cleanTarget.toLowerCase();

    if (isMatch) {
      sound.playCorrect();
      setStatus('correct');
      setStreak((s) => s + 1);
    } else {
      sound.playIncorrect();
      setStatus('incorrect');
      setStreak(0);
    }
  };

  const handleNext = () => {
    setStatus('idle');
    setInputValue('');
    setCurrentIndex((prev) => (prev + 1) % englishVocabulary.length);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
            <PenTool className="w-6 h-6 text-duo-orange" />
            Taller de Spelling y Dictado en Inglés
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Escucha la pronunciación y escribe correctamente en inglés sin errores ortográficos.
          </p>
        </div>
        <div className="px-3.5 py-2 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-duo-orange font-black text-sm">
          Racha: {streak} 🔥
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setMode('guided')}
          className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex items-center justify-center gap-2 transition ${
            mode === 'guided'
              ? 'border-duo-blue bg-duo-blue/10 text-duo-blue'
              : 'border-gray-200 dark:border-gray-700 text-gray-500'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Modo Guiado (Con pista IPA/ Iniciales)</span>
        </button>
        <button
          onClick={() => setMode('memory')}
          className={`p-3 rounded-2xl border-2 font-extrabold text-xs flex items-center justify-center gap-2 transition ${
            mode === 'memory'
              ? 'border-duo-purple bg-duo-purple/10 text-duo-purple'
              : 'border-gray-200 dark:border-gray-700 text-gray-500'
          }`}
        >
          <EyeOff className="w-4 h-4" />
          <span>Modo Dictado Puro (Sin pistas)</span>
        </button>
      </div>

      {/* Prompt Card */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-green-100 dark:bg-green-900/40 text-duo-green-dark">
            Nivel {currentItem.cefr} • Unidad {currentItem.unit}
          </span>
          <button
            type="button"
            onClick={() => sound.speakEnglish(currentItem.english)}
            className="px-4 py-2 rounded-xl bg-duo-blue text-white font-extrabold text-xs flex items-center gap-1.5 shadow-duo-blue"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar Palabra</span>
          </button>
        </div>

        <div className="text-center my-6">
          <p className="text-xs font-bold uppercase text-gray-400 mb-1">Escribe en inglés:</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white">
            "{currentItem.spanish}"
          </h2>

          {mode === 'guided' && (
            <div className="mt-3 space-y-1">
              <p className="text-sm font-mono text-purple-600 dark:text-purple-400">
                IPA: {currentItem.ipa}
              </p>
              <p className="text-xs font-mono text-gray-400">
                Pista: {cleanTarget[0]}
                {'_ '.repeat(Math.max(1, cleanTarget.length - 1))} ({cleanTarget.length} letras)
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleCheck} className="space-y-4">
          <input
            type="text"
            value={inputValue}
            disabled={status !== 'idle'}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe aquí en inglés..."
            aria-label="Respuesta en inglés"
            className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center text-lg font-extrabold text-gray-800 dark:text-white focus:border-duo-blue outline-none"
          />

          {status === 'idle' ? (
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-extrabold shadow-duo-btn"
            >
              COMPROBAR SPELLING
            </button>
          ) : (
            <div className="space-y-3">
              <div
                className={`p-4 rounded-2xl flex items-center gap-3 ${
                  status === 'correct'
                    ? 'bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-200'
                }`}
              >
                {status === 'correct' ? (
                  <CheckCircle2 className="w-6 h-6 text-duo-green shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-duo-red shrink-0" />
                )}
                <div>
                  <div className="font-extrabold text-sm">
                    {status === 'correct' ? '¡Ortografía perfecta!' : 'Así se escribe correctamente:'}
                  </div>
                  <div className="text-base font-black">{currentItem.english}</div>
                  <div className="text-xs opacity-80 mt-0.5">{currentItem.exampleEn}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 rounded-2xl bg-duo-blue text-white font-extrabold flex items-center justify-center gap-2 shadow-duo-blue"
              >
                <span>SIGUIENTE PALABRA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
