import React, { useState, useMemo } from 'react';
import { Flashcard } from '../types';
import {
  BarChart3,
  Volume2,
  RefreshCw,
  Search,
  Sparkles,
  X,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { sound } from '../services/sound';

interface MasteryPageProps {
  cards: Flashcard[];
  showIpa: boolean;
  onReviewCard: (cardId: string, remembered: boolean) => void;
}

export const MasteryPage: React.FC<MasteryPageProps> = ({ cards, showIpa, onReviewCard }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickReviewCards, setQuickReviewCards] = useState<Flashcard[] | null>(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const getStatus = (card: Flashcard) => {
    if (card.timesReviewed === 0 && card.srsLevel === 0) return 'unknown';
    if (card.srsLevel === 1) return 'learning';
    if (card.srsLevel === 2) return 'familiar';
    if (card.srsLevel >= 3) return 'mastered';
    return 'weak';
  };

  const getCardScore = (card: Flashcard) => {
    if (card.timesReviewed === 0 && card.srsLevel === 0) return 0;
    const accuracy =
      card.timesReviewed > 0 ? Math.min(1, card.timesCorrect / card.timesReviewed) : 0.5;
    return Math.min(100, Math.round(accuracy * 40 + (card.srsLevel / 3) * 60));
  };

  const totalPossible = cards.length * 3;
  const currentTotal = cards.reduce((acc, c) => acc + c.srsLevel, 0);
  const overallPercent = totalPossible > 0 ? Math.round((currentTotal / totalPossible) * 100) : 0;

  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchStatus = selectedFilter === 'all' || getStatus(c) === selectedFilter;
      const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        c.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.spanish.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchCat && matchSearch;
    });
  }, [cards, selectedFilter, selectedCategory, searchQuery]);

  const startQuickWeakReview = () => {
    const weakOrNew = cards.filter((c) => c.srsLevel < 3).slice(0, 12);
    if (weakOrNew.length === 0) return;
    sound.playTap();
    setQuickReviewCards(weakOrNew);
    setReviewIdx(0);
    setShowAnswer(false);
  };

  const activeReviewCard = quickReviewCards ? quickReviewCards[reviewIdx] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-duo-yellow" />
            Dominio Global del Idioma (Mastery Tracker)
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Visualiza qué palabras, phrasal verbs, idioms y sonidos IPA dominas al 100%.
          </p>
        </div>

        <button
          onClick={startQuickWeakReview}
          className="px-4 py-3 rounded-2xl bg-duo-purple hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-duo-purple self-start sm:self-center shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Entrenar Ítems Débiles</span>
        </button>
      </div>

      {/* Summary Progress Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-duo-green to-emerald-600 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-green-100">
            Índice de Dominio Acumulado
          </span>
          <span className="text-2xl font-black">{overallPercent}%</span>
        </div>
        <div className="w-full h-3.5 bg-black/20 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div className="bg-black/15 rounded-xl p-2">
            <div>Total Ítems</div>
            <div className="text-base font-black">{cards.length}</div>
          </div>
          <div className="bg-black/15 rounded-xl p-2">
            <div>En Progreso</div>
            <div className="text-base font-black">
              {cards.filter((c) => c.srsLevel > 0 && c.srsLevel < 3).length}
            </div>
          </div>
          <div className="bg-black/15 rounded-xl p-2">
            <div>Dominadas (100%)</div>
            <div className="text-base font-black">
              {cards.filter((c) => c.srsLevel >= 3).length}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar término en tu inventario de dominio..."
          aria-label="Buscar término en inventario de dominio"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white focus:border-duo-blue outline-none"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {[
          { id: 'all', label: 'Todas las Categorías' },
          { id: 'vocabulary', label: 'Vocabulario' },
          { id: 'phrasal-verbs', label: 'Phrasal Verbs' },
          { id: 'idioms', label: 'Idioms' },
          { id: 'phrases', label: 'Frases' },
          { id: 'phonetics', label: 'Fonética IPA' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-duo-purple text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Status Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {[
          { id: 'all', label: 'Todos los Estados' },
          { id: 'unknown', label: 'Por Descubrir (0%)' },
          { id: 'learning', label: 'Aprendiendo' },
          { id: 'familiar', label: 'En Repaso' },
          { id: 'mastered', label: 'Dominadas (100%)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
              selectedFilter === f.id
                ? 'bg-duo-blue text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-2.5">
        {filteredCards.map((card) => {
          const pct = getCardScore(card);
          return (
            <div
              key={card.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => sound.speakEnglish(card.english)}
                  aria-label={`Escuchar ${card.english}`}
                  className="p-2.5 rounded-xl bg-duo-blue/10 text-duo-blue hover:bg-duo-blue hover:text-white transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-gray-800 dark:text-white">
                      {card.english}
                    </span>
                    {showIpa && (
                      <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                        {card.ipa}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                      {card.cefrLevel}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{card.spanish}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-duo-green">{pct}%</div>
                  <div className="text-[10px] text-gray-400">{card.srsLevel}/3 ⭐</div>
                </div>
                <button
                  onClick={() => {
                    sound.playCorrect();
                    onReviewCard(card.id, true);
                  }}
                  title="Subir nivel de dominio"
                  aria-label={`Practicar ${card.english}`}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-duo-green hover:text-white text-gray-600 dark:text-gray-300 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Weak-Items Review Modal */}
      {quickReviewCards && activeReviewCard && (
        <div
          onClick={() => setQuickReviewCards(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 border-2 border-gray-200 dark:border-gray-700 shadow-2xl text-center"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold uppercase text-duo-purple">
                Repaso Intensivo ({reviewIdx + 1}/{quickReviewCards.length})
              </span>
              <button
                onClick={() => setQuickReviewCards(null)}
                aria-label="Cerrar repaso rápido"
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6">
              <button
                onClick={() => sound.speakEnglish(activeReviewCard.english)}
                aria-label="Escuchar pronunciación"
                className="mx-auto mb-3 p-3 rounded-2xl bg-duo-blue/10 text-duo-blue"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white">
                {activeReviewCard.english}
              </h3>
              {showIpa && (
                <p className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-1">
                  {activeReviewCard.ipa}
                </p>
              )}

              {showAnswer ? (
                <div className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-duo-green/40">
                  <div className="text-lg font-extrabold text-duo-green-dark dark:text-duo-green">
                    {activeReviewCard.spanish}
                  </div>
                  {activeReviewCard.exampleSentence && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">
                      "{activeReviewCard.exampleSentence}"
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-xs font-extrabold text-gray-700 dark:text-gray-200"
                >
                  Mostrar Significado
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => {
                  sound.playTap();
                  onReviewCard(activeReviewCard.id, false);
                  setShowAnswer(false);
                  if (reviewIdx + 1 < quickReviewCards.length) {
                    setReviewIdx(reviewIdx + 1);
                  } else {
                    setQuickReviewCards(null);
                  }
                }}
                className="py-3 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-duo-orange font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Aún me cuesta</span>
              </button>
              <button
                onClick={() => {
                  sound.playCorrect();
                  onReviewCard(activeReviewCard.id, true);
                  setShowAnswer(false);
                  if (reviewIdx + 1 < quickReviewCards.length) {
                    setReviewIdx(reviewIdx + 1);
                  } else {
                    setQuickReviewCards(null);
                  }
                }}
                className="py-3 rounded-2xl bg-duo-green text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-duo-btn"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Dominada!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
