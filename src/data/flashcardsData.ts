import { Flashcard } from '../types';
import { englishPhonemesList } from './phoneticsData';
import { englishVocabulary } from './vocabularyData';

const nowIso = new Date().toISOString();

const phonemeCards: Flashcard[] = englishPhonemesList.slice(0, 14).map((p, idx) => ({
  id: `fc-phon-${idx + 1}`,
  category: 'phonetics',
  unitNumber: 0,
  cefrLevel: 'A1',
  english: `${p.symbol} — ${p.exampleWord}`,
  ipa: p.exampleIpa,
  spanish: `${p.name}: "${p.exampleSpanish}" (${p.minimalPair.wordA} vs ${p.minimalPair.wordB})`,
  partOfSpeech: 'Fonema IPA',
  exampleSentence: `Contrast: ${p.minimalPair.wordA} (${p.minimalPair.ipaA}) vs ${p.minimalPair.wordB} (${p.minimalPair.ipaB}).`,
  exampleTranslation: p.spanishTip,
  notes: `Grafías comunes: ${p.commonSpellings.join(', ')}`,
  srsLevel: 0,
  intervalDays: 0,
  nextReviewDate: nowIso,
  timesReviewed: 0,
  timesCorrect: 0
}));

const vocabCards: Flashcard[] = englishVocabulary.map((v) => ({
  id: `fc-voc-${v.id}`,
  category:
    v.pos === 'phrasal-verb'
      ? 'phrasal-verbs'
      : v.pos === 'idiom'
      ? 'idioms'
      : 'vocabulary',
  unitNumber: v.unit,
  cefrLevel: v.cefr,
  english: v.english,
  ipa: v.ipa,
  spanish: v.spanish,
  partOfSpeech: v.pos,
  exampleSentence: v.exampleEn,
  exampleTranslation: v.exampleEs,
  notes: v.pastSimple ? `Pasado: ${v.pastSimple} • Participio: ${v.pastParticiple}` : undefined,
  srsLevel: 0,
  intervalDays: 0,
  nextReviewDate: nowIso,
  timesReviewed: 0,
  timesCorrect: 0
}));

const curatedCards: Flashcard[] = [
  {
    id: 'fc-cur-1',
    category: 'phrasal-verbs',
    unitNumber: 17,
    cefrLevel: 'B1',
    english: 'figure out',
    ipa: '/ˈfɪɡ.jər aʊt/',
    spanish: 'resolver / entender / descifrar',
    partOfSpeech: 'Phrasal Verb',
    exampleSentence: 'We need to figure out why the server is responding slowly.',
    exampleTranslation: 'Necesitamos descifrar por qué el servidor responde lento.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-2',
    category: 'phrasal-verbs',
    unitNumber: 17,
    cefrLevel: 'B1',
    english: 'call off',
    ipa: '/kɔːl ɒf/',
    spanish: 'cancelar / suspender un evento',
    partOfSpeech: 'Phrasal Verb',
    exampleSentence: 'They had to call off the outdoor concert due to the storm.',
    exampleTranslation: 'Tuvieron que cancelar el concierto al aire libre debido a la tormenta.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-3',
    category: 'phrasal-verbs',
    unitNumber: 18,
    cefrLevel: 'B2',
    english: 'come up with',
    ipa: '/kʌm ʌp wɪð/',
    spanish: 'proponer / idear (una solución o plan)',
    partOfSpeech: 'Phrasal Verb',
    exampleSentence: 'She came up with a brilliant marketing strategy.',
    exampleTranslation: 'A ella se le ocurrió una estrategia de marketing brillante.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-4',
    category: 'idioms',
    unitNumber: 23,
    cefrLevel: 'C1',
    english: 'hit the nail on the head',
    ipa: '/hɪt ðə neɪl ɒn ðə hed/',
    spanish: 'dar en el clavo / acertar exactamente',
    partOfSpeech: 'Idiom',
    exampleSentence: 'You hit the nail on the head with that diagnosis.',
    exampleTranslation: 'Diste exactamente en el clavo con ese diagnóstico.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-5',
    category: 'idioms',
    unitNumber: 23,
    cefrLevel: 'C1',
    english: 'play devil’s advocate',
    ipa: '/pleɪ ˈdev.əlz ˈæd.və.kət/',
    spanish: 'hacer de abogado del diablo (probar un argumento)',
    partOfSpeech: 'Idiom',
    exampleSentence: 'Let me play devil’s advocate for a moment to test our assumptions.',
    exampleTranslation: 'Permíteme hacer de abogado del diablo un momento para probar nuestros supuestos.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-6',
    category: 'phrases',
    unitNumber: 1,
    cefrLevel: 'A1',
    english: 'Could you speak a bit slower, please?',
    ipa: '/kʊd ju spiːk ə bɪt ˈsləʊ.ər pliːz/',
    spanish: '¿Podrías hablar un poco más despacio, por favor?',
    partOfSpeech: 'Conversación',
    exampleSentence: 'Sorry, I am learning English. Could you speak a bit slower, please?',
    exampleTranslation: 'Disculpa, estoy aprendiendo inglés. ¿Podrías hablar un poco más despacio, por favor?',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  },
  {
    id: 'fc-cur-7',
    category: 'phrases',
    unitNumber: 13,
    cefrLevel: 'B1',
    english: 'Let us make sure we are on the same page.',
    ipa: '/let ʌs meɪk ʃʊr wi ɑːr ɒn ðə seɪm peɪdʒ/',
    spanish: 'Asegurémonos de que estamos en sintonía / de acuerdo.',
    partOfSpeech: 'Inglés Profesional',
    exampleSentence: 'Before we start the sprint, let us make sure we are on the same page.',
    exampleTranslation: 'Antes de iniciar el sprint, asegurémonos de estar en la misma sintonía.',
    srsLevel: 0,
    intervalDays: 0,
    nextReviewDate: nowIso,
    timesReviewed: 0,
    timesCorrect: 0
  }
];

export const initialFlashcards: Flashcard[] = [
  ...curatedCards,
  ...vocabCards,
  ...phonemeCards
];
