import React, { useState, useEffect } from 'react';
import { unitTheories } from '../data/theoryData';
import { BookOpen, Volume2, Search, Sparkles } from 'lucide-react';
import { sound } from '../services/sound';

interface TheoryPageProps {
  initialUnitNumber?: number | null;
  showIpa: boolean;
}

export const TheoryPage: React.FC<TheoryPageProps> = ({ initialUnitNumber, showIpa }) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(initialUnitNumber ?? 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (initialUnitNumber !== null && initialUnitNumber !== undefined) {
      setSelectedUnit(initialUnitNumber);
    }
  }, [initialUnitNumber]);

  const currentTheory =
    unitTheories.find((u) => u.unitId === selectedUnit) || unitTheories[0];

  const filteredSections = searchQuery.trim()
    ? unitTheories.flatMap((u) =>
        u.sections
          .filter(
            (s) =>
              (selectedCategory === 'all' || s.category === selectedCategory) &&
              (s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (s.formula && s.formula.toLowerCase().includes(searchQuery.toLowerCase())))
          )
          .map((s) => ({ ...s, unitNumber: u.unitId, unitTitle: u.title }))
      )
    : currentTheory.sections
        .filter((s) => selectedCategory === 'all' || s.category === selectedCategory)
        .map((s) => ({
          ...s,
          unitNumber: currentTheory.unitId,
          unitTitle: currentTheory.title,
        }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-duo-blue" />
          Enciclopedia Gramatical y Teoría (Unidades 0–23)
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Fórmulas gramaticales, pronunciación IPA, consejos de examen Cambridge/Oxford y ejemplos con voz nativa.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar tema gramatical (ej. Present Perfect, Passive, Phrasal Verbs, IPA...)"
          aria-label="Buscar tema gramatical"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white focus:border-duo-blue outline-none"
        />
      </div>

      {/* Unit Selector Pills */}
      {!searchQuery.trim() && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {unitTheories.map((u) => (
            <button
              key={u.unitId}
              onClick={() => {
                sound.playTap();
                setSelectedUnit(u.unitId);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border-2 transition-all ${
                selectedUnit === u.unitId
                  ? 'bg-duo-blue text-white border-duo-blue shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              U{u.unitId} • {u.stageLabel}
            </button>
          ))}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {[
          { id: 'all', label: 'Todo' },
          { id: 'grammar', label: 'Gramática' },
          { id: 'phonetics', label: 'Fonética IPA' },
          { id: 'vocabulary', label: 'Vocabulario' },
          { id: 'culture', label: 'Cultura & Uso' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat.id
                ? 'bg-duo-green text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Current Unit Banner */}
      {!searchQuery.trim() && (
        <div className="mb-6 p-5 rounded-3xl bg-duo-blue/10 border-2 border-duo-blue/30">
          <div className="text-xs font-extrabold uppercase text-duo-blue">
            Unidad {currentTheory.unitId} • {currentTheory.stageLabel}
          </div>
          <h2 className="text-xl font-black text-gray-800 dark:text-white mt-0.5">
            {currentTheory.title}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {currentTheory.description}
          </p>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {filteredSections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-900/40 text-duo-blue">
                Unidad {sec.unitNumber} • {sec.category}
              </span>
            </div>

            <h3 className="text-lg font-black text-gray-800 dark:text-white mb-1">{sec.title}</h3>
            <p className="text-xs font-bold text-duo-blue mb-3">{sec.englishSubtitle}</p>

            <div className="space-y-2 mb-4">
              {sec.content.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {sec.formula && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-duo-yellow/50 mb-4 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-duo-yellow shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-duo-yellow-dark">
                    Fórmula / Regla Clave
                  </div>
                  <div className="text-sm font-mono font-bold text-gray-800 dark:text-amber-100">
                    {sec.formula}
                  </div>
                </div>
              </div>
            )}

            {/* Examples */}
            <div className="space-y-2.5">
              {sec.examples.map((ex, i) => (
                <div
                  key={i}
                  onClick={() => sound.speakEnglish(ex.english)}
                  className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 hover:border-duo-blue cursor-pointer transition flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-extrabold text-gray-800 dark:text-white">
                      {ex.english}
                    </div>
                    {showIpa && ex.ipa && (
                      <div className="text-xs font-mono text-purple-600 dark:text-purple-400">
                        {ex.ipa}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {ex.spanish}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Escuchar ejemplo: ${ex.english}`}
                    className="p-2.5 rounded-xl bg-duo-blue/10 text-duo-blue hover:bg-duo-blue hover:text-white transition shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
