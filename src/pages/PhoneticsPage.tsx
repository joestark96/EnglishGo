import React, { useState } from 'react';
import { englishPhonemesList, IpaPhonemeItem } from '../data/phoneticsData';
import { Volume2, Languages, Sparkles, ArrowLeftRight } from 'lucide-react';
import { sound } from '../services/sound';
import { SpeechPracticeButton } from '../components/SpeechPracticeButton';

export const PhoneticsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'short-vowels' | 'long-vowels' | 'diphthongs' | 'consonants'
  >('all');
  const [activePhoneme, setActivePhoneme] = useState<IpaPhonemeItem>(englishPhonemesList[0]);

  const filteredPhonemes = englishPhonemesList.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <Languages className="w-6 h-6 text-pink-500" />
          Tabla Interactiva de Fonética Inglesa (IPA)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Domina las vocales cortas, vocales largas, diptongos, el sonido Schwa /ə/ y pares mínimos con voz y micrófono.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {[
          { id: 'all', label: 'Todos los Sonidos' },
          { id: 'short-vowels', label: 'Vocales Cortas' },
          { id: 'long-vowels', label: 'Vocales Largas' },
          { id: 'diphthongs', label: 'Diptongos' },
          { id: 'consonants', label: 'Consonantes Clave' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setSelectedCategory(tab.id as typeof selectedCategory);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Phoneme Inspector Card */}
      {activePhoneme && (
        <div className="bg-white dark:bg-gray-800 border-2 border-pink-500/40 rounded-3xl p-6 mb-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => sound.speakEnglish(activePhoneme.exampleWord)}
                aria-label={`Escuchar fonema ${activePhoneme.symbol}`}
                className="w-20 h-20 rounded-3xl bg-pink-600 hover:bg-pink-700 text-white font-mono text-3xl font-black flex items-center justify-center shadow-lg active:translate-y-0.5 transition"
              >
                {activePhoneme.symbol}
              </button>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 dark:bg-pink-900/40 text-pink-600">
                  {activePhoneme.name}
                </span>
                <h2 className="text-2xl font-black text-gray-800 dark:text-white mt-1">
                  {activePhoneme.exampleWord}{' '}
                  <span className="text-sm font-mono text-purple-600 dark:text-purple-400">
                    {activePhoneme.exampleIpa}
                  </span>
                </h2>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Significado: "{activePhoneme.exampleSpanish}" • Grafías:{' '}
                  {activePhoneme.commonSpellings.join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => sound.speakEnglish(activePhoneme.exampleWord)}
                className="px-4 py-2.5 rounded-2xl bg-duo-blue text-white font-extrabold text-xs flex items-center gap-1.5 shadow-duo-blue"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar</span>
              </button>
              <SpeechPracticeButton targetText={activePhoneme.exampleWord} compact />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800/50 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-pink-700 dark:text-pink-300 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Cómo articular este sonido (Tip para hispanohablantes):</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
              {activePhoneme.spanishTip}
            </p>
          </div>

          {activePhoneme.minimalPair && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200 flex-wrap">
                <ArrowLeftRight className="w-4 h-4 text-duo-purple shrink-0" />
                <span>Par Mínimo:</span>
                <span className="font-mono font-extrabold text-duo-purple">
                  {activePhoneme.minimalPair.wordA} ({activePhoneme.minimalPair.ipaA} -{' '}
                  {activePhoneme.minimalPair.meaningA}) vs {activePhoneme.minimalPair.wordB} (
                  {activePhoneme.minimalPair.ipaB} - {activePhoneme.minimalPair.meaningB})
                </span>
              </div>
              <button
                onClick={() =>
                  sound.speakEnglish(
                    `${activePhoneme.minimalPair.wordA}, ${activePhoneme.minimalPair.wordB}`
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-duo-purple/15 text-duo-purple font-extrabold text-xs hover:bg-duo-purple/25 transition shrink-0"
              >
                Comparar Audio
              </button>
            </div>
          )}
        </div>
      )}

      {/* Phoneme Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filteredPhonemes.map((item) => {
          const isSelected = activePhoneme.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.speakEnglish(item.exampleWord);
                setActivePhoneme(item);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl font-mono font-black text-pink-600 dark:text-pink-400">
                  {item.symbol}
                </span>
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-gray-800 dark:text-white">
                  {item.exampleWord}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {item.exampleSpanish}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
