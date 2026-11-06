import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Volume2,
  MessageSquare,
  Briefcase,
  Plane,
  Sparkles,
  Users,
  Trophy,
  Play,
  RefreshCw,
  CheckCircle2,
  Utensils,
} from 'lucide-react';
import { sound } from '../services/sound';
import { SpeechPracticeButton } from '../components/SpeechPracticeButton';
import { englishCurriculum } from '../data/englishCurriculum';

interface SpeakingPhrase {
  id: string;
  category: 'survival' | 'restaurant' | 'travel' | 'business' | 'debate';
  cefr: string;
  english: string;
  ipa: string;
  spanish: string;
  tip: string;
}

const SPEAKING_PHRASES: SpeakingPhrase[] = [
  {
    id: 'sp-1',
    category: 'survival',
    cefr: 'A1',
    english: 'Could you please speak a little bit slower?',
    ipa: '/kʊd juː pliːz spiːk ə ˈlɪt.əl bɪt ˈsloʊ.ɚ/',
    spanish: '¿Podría hablar un poquito más despacio, por favor?',
    tip: 'Une "Could you" como /kʊdʒu/ para sonar natural.',
  },
  {
    id: 'sp-2',
    category: 'survival',
    cefr: 'A1',
    english: 'Excuse me, how do I get to the nearest subway station?',
    ipa: '/ɪkˈskjuːz miː haʊ duː aɪ ɡet tuː ðə ˈnɪr.ɪst ˈsʌb.weɪ ˈsteɪ.ʃən/',
    spanish: 'Disculpe, ¿cómo llego a la estación de metro más cercana?',
    tip: 'No pronuncies una "e" antes de "station" (/ˈsteɪ.ʃən/, no /esˈteɪ.ʃən/).',
  },
  {
    id: 'sp-3',
    category: 'restaurant',
    cefr: 'A1',
    english: 'Could we have the menu and two glasses of water, please?',
    ipa: '/kʊd wiː hæv ðə ˈmen.juː ænd tuː ˈɡlæs.ɪz əv ˈwɔː.tɚ pliːz/',
    spanish: '¿Nos podría traer el menú y dos vasos de agua, por favor?',
    tip: 'Reduce "of" a un sonido Schwa muy suave: /əv/.',
  },
  {
    id: 'sp-4',
    category: 'restaurant',
    cefr: 'A2',
    english: 'Everything was delicious. Could we get the check, please?',
    ipa: '/ˈev.ri.θɪŋ wɒz dɪˈlɪʃ.əs kʊd wiː ɡet ðə tʃek pliːz/',
    spanish: 'Todo estuvo delicioso. ¿Nos trae la cuenta, por favor?',
    tip: 'En EE. UU. se dice "the check"; en Reino Unido "the bill".',
  },
  {
    id: 'sp-5',
    category: 'travel',
    cefr: 'A2',
    english: 'I have a reservation under the name Martinez for two nights.',
    ipa: '/aɪ hæv ə ˌrez.ɚˈveɪ.ʃən ˈʌn.dɚ ðə neɪm mɑːrˈtiː.nez fɔːr tuː naɪts/',
    spanish: 'Tengo una reservación a nombre de Martínez por dos noches.',
    tip: 'Usa la preposición "under the name..." en hoteles y restaurantes.',
  },
  {
    id: 'sp-6',
    category: 'travel',
    cefr: 'B1',
    english: 'My connecting flight was delayed, so I missed my boarding gate.',
    ipa: '/maɪ kəˈnek.tɪŋ flaɪt wɒz dɪˈleɪd soʊ aɪ mɪst maɪ ˈbɔːr.dɪŋ ɡeɪt/',
    spanish: 'Mi vuelo de conexión se retrasó, así que perdí mi puerta de embarque.',
    tip: '"Missed" termina con sonido /t/ (/mɪst/), nunca /mɪsed/.',
  },
  {
    id: 'sp-7',
    category: 'business',
    cefr: 'B2',
    english: 'Let us circle back to the budget proposal before wrapping up the meeting.',
    ipa: '/let ʌs ˈsɜː.kəl bæk tuː ðə ˈbʌdʒ.ɪt prəˈpoʊ.zəl bɪˈfɔːr ˈræp.ɪŋ ʌp ðə ˈmiː.tɪŋ/',
    spanish: 'Volvamos a la propuesta de presupuesto antes de concluir la reunión.',
    tip: '"Circle back" y "wrap up" son phrasal verbs esenciales en reuniones corporativas.',
  },
  {
    id: 'sp-8',
    category: 'business',
    cefr: 'B2',
    english: 'I would appreciate it if you could send over the updated report by Friday.',
    ipa: '/aɪ wʊd əˈpriː.ʃi.eɪt ɪt ɪf juː kʊd send ˈoʊ.vɚ ði ʌpˈdeɪ.tɪd rɪˈpɔːrt baɪ ˈfraɪ.deɪ/',
    spanish: 'Le agradecería mucho si pudiera enviarme el informe actualizado antes del viernes.',
    tip: 'Estructura formal perfecta para correos y llamadas de negocios.',
  },
  {
    id: 'sp-9',
    category: 'debate',
    cefr: 'C1',
    english: 'Not only does this approach improve efficiency, but it also reduces costs.',
    ipa: '/nɒt ˈoʊn.li dʌz ðɪs əˈproʊtʃ ɪmˈpruːv ɪˈfɪʃ.ən.si bʌt ɪt ˈɔːl.soʊ rɪˈdjuː.sɪz kɒsts/',
    spanish: 'Este enfoque no solo mejora la eficiencia, sino que también reduce los costos.',
    tip: 'Observa la inversión C1: "Not only does this approach improve...".',
  },
  {
    id: 'sp-10',
    category: 'debate',
    cefr: 'C1',
    english: 'Had we anticipated the market shift earlier, we would have adapted our strategy.',
    ipa: '/hæd wiː ænˈtɪs.ɪ.peɪ.tɪd ðə ˈmɑːr.kɪt ʃɪft ˈɜː.li.ɚ wiː wʊd hæv əˈdæp.tɪd aʊɚ ˈstræt.ə.dʒi/',
    spanish: 'Si hubiéramos anticipado antes el cambio del mercado, habríamos adaptado nuestra estrategia.',
    tip: 'Inversión del Tercer Condicional sin "if" ("Had we anticipated...").',
  },
];

interface SpeakingPageProps {
  showIpa: boolean;
}

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ showIpa }) => {
  const [activeSubTab, setActiveSubTab] = useState<'phrases' | 'roleplay' | 'challenge'>('phrases');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Roleplay state
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [userRoleSpeaker, setUserRoleSpeaker] = useState<string | null>(null);

  // Challenge state
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const filteredPhrases = SPEAKING_PHRASES.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const unitsWithDialogues = useMemo(
    () =>
      englishCurriculum.filter((u) =>
        u.nodes.some((n) => n.exercises.some((e) => e.type === 'dialogue-reading' && e.dialogueLines))
      ),
    []
  );

  const currentRoleplayUnit =
    unitsWithDialogues.find((u) => u.id === selectedUnitId) || unitsWithDialogues[0];

  const roleplayExercise = currentRoleplayUnit?.nodes
    .flatMap((n) => n.exercises)
    .find((e) => e.type === 'dialogue-reading' && e.dialogueLines);

  const roleplayLines = roleplayExercise?.dialogueLines || [];
  const speakers = Array.from(new Set(roleplayLines.map((l) => l.speaker)));
  const activeRole = userRoleSpeaker || speakers[1] || speakers[0];

  const currentChallenge = SPEAKING_PHRASES[challengeIdx] || SPEAKING_PHRASES[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
          <Mic className="w-6 h-6 text-duo-green" />
          Laboratorio de Speaking, Roleplay & Pronunciación
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Practica frases situacionales, interpreta personajes en diálogos reales o supera el reto de pronunciación.
        </p>
      </div>

      {/* Mode Sub-Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
        <button
          onClick={() => {
            sound.playTap();
            setActiveSubTab('phrases');
          }}
          className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'phrases'
              ? 'bg-white dark:bg-gray-900 text-duo-green shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Frases Clave</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveSubTab('roleplay');
          }}
          className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'roleplay'
              ? 'bg-white dark:bg-gray-900 text-duo-blue shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Roleplay Diálogos</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setActiveSubTab('challenge');
          }}
          className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'challenge'
              ? 'bg-white dark:bg-gray-900 text-duo-orange shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Reto Oral</span>
        </button>
      </div>

      {/* TAB 1: PHRASES */}
      {activeSubTab === 'phrases' && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {[
              { id: 'all', label: 'Todas', icon: Sparkles },
              { id: 'survival', label: 'Supervivencia (A1)', icon: MessageSquare },
              { id: 'restaurant', label: 'Restaurante (A1-A2)', icon: Utensils },
              { id: 'travel', label: 'Viajes & Hotel (A2-B1)', icon: Plane },
              { id: 'business', label: 'Business (B2)', icon: Briefcase },
              { id: 'debate', label: 'Debate & C1', icon: Mic },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap flex items-center gap-1.5 transition ${
                    selectedCategory === cat.id
                      ? 'bg-duo-green text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {filteredPhrases.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-900/40 text-duo-blue">
                      CEFR {item.cefr} • {item.category}
                    </span>
                    <h3 className="text-lg font-black text-gray-800 dark:text-white mt-1">
                      {item.english}
                    </h3>
                    {showIpa && (
                      <p className="text-xs font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                        {item.ipa}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.spanish}</p>
                  </div>

                  <button
                    onClick={() => sound.speakEnglish(item.english)}
                    aria-label={`Escuchar frase: ${item.english}`}
                    className="p-3 rounded-2xl bg-duo-blue text-white shadow-duo-blue shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-gray-700 dark:text-gray-200 mb-3">
                  <strong>Tip de pronunciación:</strong> {item.tip}
                </div>

                <SpeechPracticeButton targetText={item.english} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB 2: INTERACTIVE ROLEPLAY */}
      {activeSubTab === 'roleplay' && (
        <div>
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
            {unitsWithDialogues.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  setSelectedUnitId(u.id);
                  setUserRoleSpeaker(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap border-2 transition ${
                  selectedUnitId === u.id
                    ? 'bg-duo-blue text-white border-duo-blue'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                U{u.id} • {u.cefrLevel}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs font-extrabold uppercase text-duo-blue">
                  Simulador de Conversación • Unidad {currentRoleplayUnit?.id}
                </span>
                <h2 className="text-lg font-black text-gray-800 dark:text-white">
                  {roleplayExercise?.dialogueTitle || currentRoleplayUnit?.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Tu rol:</span>
                {speakers.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setUserRoleSpeaker(sp)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                      activeRole === sp
                        ? 'bg-duo-green text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {roleplayLines.map((line, idx) => {
                const isUserTurn = line.speaker === activeRole;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border-2 transition ${
                      isUserTurn
                        ? 'border-duo-green bg-green-50/50 dark:bg-green-950/30 ml-4'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 mr-4'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`text-xs font-extrabold uppercase ${
                            isUserTurn ? 'text-duo-green' : 'text-duo-blue'
                          }`}
                        >
                          {line.speaker} {isUserTurn ? '(TU TURNO - HABLA EN INGLÉS)' : '(COMPAÑERO)'}
                        </span>
                        <p className="text-base font-extrabold text-gray-800 dark:text-white mt-0.5">
                          {line.english}
                        </p>
                        {showIpa && line.ipa && (
                          <p className="text-xs font-mono text-purple-600 dark:text-purple-400">
                            {line.ipa}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {line.spanish}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          sound.speakEnglish(line.audioText || line.english, line.speaker)
                        }
                        aria-label={`Escuchar a ${line.speaker}`}
                        className="p-2.5 rounded-xl bg-duo-blue text-white shrink-0"
                      >
                        <Play className="w-4 h-4 fill-white" />
                      </button>
                    </div>

                    {isUserTurn && (
                      <div className="mt-3 pt-2 border-t border-green-200/60 dark:border-green-800/40">
                        <SpeechPracticeButton targetText={line.english} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPEAKING CHALLENGE */}
      {activeSubTab === 'challenge' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-duo-orange/40 shadow-md text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-duo-orange text-xs font-extrabold mb-4">
            <Trophy className="w-4 h-4" />
            <span>
              Reto {challengeIdx + 1} de {SPEAKING_PHRASES.length} • Superados:{' '}
              {completedChallenges.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white mb-2">
            "{currentChallenge.english}"
          </h2>
          {showIpa && (
            <p className="text-sm font-mono text-purple-600 dark:text-purple-400 mb-2">
              {currentChallenge.ipa}
            </p>
          )}
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6">
            {currentChallenge.spanish}
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => sound.speakEnglish(currentChallenge.english)}
              className="px-4 py-2.5 rounded-2xl bg-duo-blue text-white font-extrabold text-xs flex items-center gap-1.5 shadow-duo-blue"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar Modelo</span>
            </button>

            <SpeechPracticeButton targetText={currentChallenge.english} />
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                sound.playCorrect();
                if (!completedChallenges.includes(currentChallenge.id)) {
                  setCompletedChallenges([...completedChallenges, currentChallenge.id]);
                }
                confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                setChallengeIdx((prev) => (prev + 1) % SPEAKING_PHRASES.length);
              }}
              className="px-5 py-3 rounded-2xl bg-duo-green text-white font-extrabold text-xs flex items-center gap-1.5 shadow-duo-btn"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Marcar Superado y Siguiente</span>
            </button>

            <button
              onClick={() => setChallengeIdx((prev) => (prev + 1) % SPEAKING_PHRASES.length)}
              className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-extrabold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Saltar Frase</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
