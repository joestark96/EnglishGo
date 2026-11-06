import React, { useState } from 'react';
import { englishVocabulary, VocabWord } from '../data/vocabularyData';
import { Library, Search, Volume2, Wand2, X } from 'lucide-react';
import { sound } from '../services/sound';

interface VocabularyPageProps {
  showIpa: boolean;
}

function getGerund(base: string, explicit?: string): string {
  if (explicit) return explicit;
  if (base === 'be') return 'being';
  if (base.endsWith('ie')) return base.slice(0, -2) + 'ying';
  if (base.endsWith('e') && !base.endsWith('ee')) return base.slice(0, -1) + 'ing';
  return base + 'ing';
}

function getThirdPerson(base: string, explicit?: string): string {
  if (explicit) return explicit;
  if (base === 'be') return 'is';
  if (base === 'have') return 'has';
  if (base === 'go' || base === 'do') return base + 'es';
  if (base.endsWith('y') && !/[aeiou]y$/.test(base)) return base.slice(0, -1) + 'ies';
  if (/(s|sh|ch|x|z)$/.test(base)) return base + 'es';
  return base + 's';
}

function conjugateEnglishVerb(verb: VocabWord) {
  const rawBase = verb.english.replace(/^to\s+/i, '').trim().toLowerCase();
  const past = verb.pastSimple || (rawBase.endsWith('e') ? `${rawBase}d` : `${rawBase}ed`);
  const part = verb.pastParticiple || past;
  const ing = getGerund(rawBase, verb.gerund);
  const third = getThirdPerson(rawBase, verb.thirdPerson);

  return [
    {
      tense: '1. Present Simple',
      formula: 'Subject + Base / -s',
      english: `I ${rawBase === 'be' ? 'am' : rawBase} / She ${third}`,
      spanish: 'Presente habitual o verdad general',
    },
    {
      tense: '2. Present Continuous',
      formula: 'am / is / are + V-ing',
      english: `I am ${ing} / She is ${ing}`,
      spanish: 'Acción ocurriendo ahora mismo',
    },
    {
      tense: '3. Past Simple',
      formula: 'Subject + V2 (Past)',
      english: `I ${past} / They ${past}`,
      spanish: 'Acción terminada en el pasado',
    },
    {
      tense: '4. Past Continuous',
      formula: 'was / were + V-ing',
      english: `I was ${ing} / They were ${ing}`,
      spanish: 'Acción en progreso en el pasado',
    },
    {
      tense: '5. Present Perfect',
      formula: 'have / has + V3 (Participle)',
      english: `I have ${part} / She has ${part}`,
      spanish: 'Experiencia o pasado conectado al presente',
    },
    {
      tense: '6. Present Perfect Continuous',
      formula: 'have / has been + V-ing',
      english: `I have been ${ing}`,
      spanish: 'Acción que inició en el pasado y continúa',
    },
    {
      tense: '7. Past Perfect',
      formula: 'had + V3 (Participle)',
      english: `I had ${part} before...`,
      spanish: 'Pasado del pasado (había hecho)',
    },
    {
      tense: '8. Future Simple (Will)',
      formula: 'will + Base Verb',
      english: `I will ${rawBase}`,
      spanish: 'Predicción o decisión espontánea',
    },
    {
      tense: '9. Future Plan (Going to)',
      formula: 'am / is / are + going to + V',
      english: `I am going to ${rawBase}`,
      spanish: 'Plan o intención futura',
    },
    {
      tense: '10. Conditional (Would)',
      formula: 'would + Base Verb',
      english: `I would ${rawBase}`,
      spanish: 'Situación hipotética (-ría)',
    },
    {
      tense: '11. Modal Advice / Obligation',
      formula: 'should / must + Base Verb',
      english: `You should ${rawBase} / You must ${rawBase}`,
      spanish: 'Consejo (deberías) / Obligación (debes)',
    },
    {
      tense: '12. Passive Voice',
      formula: 'be + V3 (Past Participle)',
      english: `It is ${part} / It was ${part}`,
      spanish: 'Voz pasiva (es/fue hecho)',
    },
  ];
}

export const VocabularyPage: React.FC<VocabularyPageProps> = ({ showIpa }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [conjugatedVerb, setConjugatedVerb] = useState<VocabWord | null>(null);

  const filteredVocab = englishVocabulary.filter((item) => {
    const matchesSearch =
      item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spanish.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPos = selectedPos === 'all' || item.pos === selectedPos;
    const matchesLevel = selectedLevel === 'all' || item.cefr === selectedLevel;
    return matchesSearch && matchesPos && matchesLevel;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <Library className="w-6 h-6 text-duo-green" />
          Diccionario y Conjugador de 12 Tiempos Verbales
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Explora el vocabulario por nivel CEFR y pulsa en cualquier verbo para abrir su tabla de 12 tiempos en inglés.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar palabra en inglés o español..."
          aria-label="Buscar vocabulario"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-white focus:border-duo-blue outline-none"
        />
      </div>

      {/* Part of Speech Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'verb-irr', label: 'Verbos Irregulares' },
          { id: 'verb-reg', label: 'Verbos Regulares' },
          { id: 'phrasal-verb', label: 'Phrasal Verbs' },
          { id: 'idiom', label: 'Idioms' },
          { id: 'noun', label: 'Sustantivos' },
          { id: 'adj', label: 'Adjetivos' },
          { id: 'connector', label: 'Conectores' },
        ].map((pos) => (
          <button
            key={pos.id}
            onClick={() => setSelectedPos(pos.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
              selectedPos === pos.id
                ? 'bg-duo-blue text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {pos.label}
          </button>
        ))}
      </div>

      {/* CEFR Level Filter */}
      <div className="flex gap-2 mb-6">
        {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition ${
              selectedLevel === lvl
                ? 'bg-duo-green text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}
          >
            {lvl === 'all' ? 'Todos' : lvl}
          </button>
        ))}
      </div>

      {/* Vocab List */}
      <div className="space-y-3">
        {filteredVocab.map((item) => {
          const isVerb = item.pos === 'verb-irr' || item.pos === 'verb-reg';
          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => sound.speakEnglish(item.english)}
                  aria-label={`Escuchar ${item.english}`}
                  className="p-3 rounded-2xl bg-duo-blue/10 text-duo-blue hover:bg-duo-blue hover:text-white transition shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-gray-800 dark:text-white">
                      {item.english}
                    </h3>
                    {showIpa && (
                      <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                        {item.ipa}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-green-100 dark:bg-green-900/40 text-duo-green-dark">
                      {item.cefr} • U{item.unit}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-duo-blue-dark dark:text-duo-blue">
                    {item.spanish}
                  </p>
                  {item.pastSimple && (
                    <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                      Past: <strong>{item.pastSimple}</strong> • Participle:{' '}
                      <strong>{item.pastParticiple}</strong>
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                    "{item.exampleEn}" — {item.exampleEs}
                  </p>
                </div>
              </div>

              {isVerb && (
                <button
                  onClick={() => {
                    sound.playTap();
                    setConjugatedVerb(item);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-duo-purple/15 hover:bg-duo-purple text-duo-purple hover:text-white font-extrabold text-xs flex items-center gap-1.5 self-start sm:self-center shrink-0 transition"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Conjugar 12 Tiempos</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 12-Tense Conjugator Modal */}
      {conjugatedVerb && (
        <div
          onClick={() => setConjugatedVerb(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full p-6 border-2 border-gray-200 dark:border-gray-700 shadow-2xl max-h-[85vh] flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-extrabold uppercase text-duo-purple">
                  Conjugador de 12 Tiempos Verbales
                </span>
                <h2 className="text-2xl font-black text-gray-800 dark:text-white">
                  {conjugatedVerb.english} — {conjugatedVerb.spanish}
                </h2>
              </div>
              <button
                onClick={() => setConjugatedVerb(null)}
                aria-label="Cerrar conjugador"
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {conjugateEnglishVerb(conjugatedVerb).map((row, idx) => (
                <div
                  key={idx}
                  onClick={() => sound.speakEnglish(row.english.replace(' / ', ', '))}
                  className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 hover:border-duo-purple cursor-pointer transition flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-duo-purple">{row.tense}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {row.formula}
                      </span>
                    </div>
                    <div className="text-sm font-black text-gray-800 dark:text-white mt-0.5">
                      {row.english}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{row.spanish}</div>
                  </div>
                  <Volume2 className="w-4 h-4 text-duo-blue shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
