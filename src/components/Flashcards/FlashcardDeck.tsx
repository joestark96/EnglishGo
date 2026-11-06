import React, { useState } from 'react';
import { Flashcard, CEFRLevel } from '../../types';
import { Volume2, RotateCw, CheckCircle2, HelpCircle, Sparkles, Filter } from 'lucide-react';
import { sound } from '../../services/sound';
import { SpeechPracticeButton } from '../SpeechPracticeButton';

interface FlashcardDeckProps {
  cards: Flashcard[];
  showIpa: boolean;
  onReviewCard: (cardId: string, remembered: boolean) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  showIpa,
  onReviewCard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = cards.filter((c) => {
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchLevel = selectedLevel === 'all' || c.cefrLevel === selectedLevel;
    return matchCategory && matchLevel;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFeedback = (remembered: boolean) => {
    if (!currentCard) return;
    if (remembered) {
      sound.playCorrect();
    } else {
      sound.playTap();
    }
    onReviewCard(currentCard.id, remembered);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredCards.length));
  };

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'vocabulary', label: 'Vocabulario' },
    { id: 'phrasal-verbs', label: 'Phrasal Verbs' },
    { id: 'idioms', label: 'Idioms' },
    { id: 'phrases', label: 'Frases' },
    { id: 'phonetics', label: 'Fonética IPA' },
  ];

  const levels: ('all' | CEFRLevel)[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-duo-yellow fill-duo-yellow" />
          Flashcards con Repetición Espaciada (SRS)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Entrena vocabulario, phrasal verbs, idioms y fonética IPA.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-duo-blue text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CEFR Level Filter */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400" />
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
              selectedLevel === lvl
                ? 'bg-duo-green text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
            }`}
          >
            {lvl === 'all' ? 'Todos los niveles' : lvl}
          </button>
        ))}
      </div>

      {!currentCard ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 font-bold">No hay tarjetas para este filtro.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-2 px-1">
            <span>
              Tarjeta {currentIndex + 1} de {filteredCards.length}
            </span>
            <span>Nivel SRS: {currentCard.srsLevel}/3 ⭐</span>
          </div>

          {/* Card Container */}
          <div
            onClick={() => {
              sound.playTap();
              setIsFlipped(!isFlipped);
            }}
            className="cursor-pointer bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center shadow-lg hover:border-duo-blue transition-all relative"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-900/40 text-duo-blue">
                {currentCard.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-green-100 dark:bg-green-900/40 text-duo-green-dark">
                {currentCard.cefrLevel} • U{currentCard.unitNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.speakEnglish(currentCard.english);
              }}
              aria-label="Escuchar pronunciación"
              className="absolute top-4 right-4 p-3 rounded-2xl bg-duo-blue/10 text-duo-blue hover:bg-duo-blue hover:text-white transition-colors"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {!isFlipped ? (
              <div className="my-6">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-white mb-2">
                  {currentCard.english}
                </h2>
                {showIpa && (
                  <p className="text-base font-mono text-purple-600 dark:text-purple-400">
                    {currentCard.ipa}
                  </p>
                )}
                <div className="mt-8 flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400">
                  <RotateCw className="w-4 h-4" />
                  <span>Toca para voltear y ver significado</span>
                </div>
              </div>
            ) : (
              <div className="my-4 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-duo-green">
                  Traducción y Uso
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-duo-green-dark dark:text-duo-green">
                  {currentCard.spanish}
                </h3>
                {currentCard.exampleSentence && (
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-left">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      "{currentCard.exampleSentence}"
                    </p>
                    {currentCard.exampleTranslation && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {currentCard.exampleTranslation}
                      </p>
                    )}
                  </div>
                )}
                <div onClick={(e) => e.stopPropagation()} className="pt-2 flex justify-center">
                  <SpeechPracticeButton targetText={currentCard.english} compact />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => handleFeedback(false)}
              className="py-4 px-4 rounded-2xl bg-orange-100 dark:bg-orange-950/50 border-2 border-duo-orange text-duo-orange font-extrabold flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Repasar luego</span>
            </button>
            <button
              onClick={() => handleFeedback(true)}
              className="py-4 px-4 rounded-2xl bg-duo-green text-white font-extrabold flex items-center justify-center gap-2 shadow-duo-btn active:shadow-duo-btn-active active:translate-y-1 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>¡Ya me la sé!</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
