import React, { useState, useRef, useEffect } from 'react';
import { Unit, LessonNode, CourseStage } from '../types';
import { RoadmapNode } from '../components/Roadmap/RoadmapNode';
import { BookOpen, FastForward, Dumbbell, Compass, Sparkles, X, Play, Award } from 'lucide-react';
import { sound } from '../services/sound';

interface RoadmapPageProps {
  curriculum: Unit[];
  onSelectLesson: (lesson: LessonNode, unit: Unit) => void;
  onOpenTheory: (unitNumber: number) => void;
  onStartJumpAhead: (targetUnitId: number, targetLessonId?: string) => void;
  onStartPractice: () => void;
}

const STAGE_BADGES: Record<CourseStage, { label: string; badgeBg: string }> = {
  'Fonética & IPA': { label: 'ETAPA 0 • FONÉTICA IPA & 44 SONIDOS', badgeBg: 'bg-pink-700/60' },
  'Cambridge A1': { label: 'CAMBRIDGE ENGLISH • NIVEL A1 (BEGINNER)', badgeBg: 'bg-green-800/60' },
  'Cambridge A2': { label: 'CAMBRIDGE KEY (KET) • NIVEL A2 (ELEMENTARY)', badgeBg: 'bg-blue-800/60' },
  'Oxford B1': { label: 'OXFORD & CAMBRIDGE PET • NIVEL B1 (INTERMEDIATE)', badgeBg: 'bg-purple-800/60' },
  'Oxford B2': { label: 'CAMBRIDGE FIRST (FCE) • NIVEL B2 (UPPER-INTERMEDIATE)', badgeBg: 'bg-orange-800/60' },
  'Mastery C1': { label: 'CAMBRIDGE ADVANCED (CAE) • NIVEL C1 (FLUENCY)', badgeBg: 'bg-amber-800/60' },
};

const POSITIONS: ('center' | 'left' | 'center' | 'right')[] = [
  'center',
  'left',
  'center',
  'right',
];

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  curriculum,
  onSelectLesson,
  onOpenTheory,
  onStartJumpAhead,
  onStartPractice,
}) => {
  const [selectedPopoverNode, setSelectedPopoverNode] = useState<{
    lesson: LessonNode;
    unit: Unit;
  } | null>(null);
  const [showJumpSelectorUnit, setShowJumpSelectorUnit] = useState<number | null>(null);
  const activeNodeRef = useRef<HTMLDivElement | null>(null);

  // Find current active lesson ID for scrolling
  let firstActiveLessonId: string | null = null;
  for (const unit of curriculum) {
    for (const node of unit.nodes) {
      const isCompleted = node.stars > 0 || node.completedSteps >= node.totalSteps;
      if (node.unlocked && !isCompleted) {
        firstActiveLessonId = node.id;
        break;
      }
    }
    if (firstActiveLessonId) break;
  }

  const scrollToActiveLesson = () => {
    sound.playTap();
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const handler = () => scrollToActiveLesson();
    window.addEventListener('focus-roadmap-active-node', handler);
    return () => window.removeEventListener('focus-roadmap-active-node', handler);
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-32 relative">
      {/* Top Banner Summary */}
      <div className="mb-8 p-4 rounded-3xl bg-gradient-to-r from-duo-blue to-indigo-600 text-white shadow-lg flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-100">
            <Sparkles className="w-4 h-4" />
            <span>Ruta Completa A1 → C1 (24 Unidades)</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black mt-0.5">
            EnglishGo! Dojo • 260+ Lecciones
          </h1>
          <p className="text-xs text-blue-100 mt-0.5">
            Fonética IPA, Gramática, Vocabulario, Lecturas, Listening y Exámenes de Salto
          </p>
        </div>
        <button
          onClick={() => {
            sound.playTap();
            setShowJumpSelectorUnit(curriculum[1]?.id ?? 1);
          }}
          className="px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 backdrop-blur-sm transition"
        >
          <FastForward className="w-4 h-4" />
          <span>Saltar Nivel</span>
        </button>
      </div>

      {/* Render all 24 Units */}
      {curriculum.map((unit) => {
        const isUnitLocked = unit.nodes.every((l) => !l.unlocked);
        const completedCount = unit.nodes.filter(
          (l) => l.stars > 0 || l.completedSteps >= l.totalSteps
        ).length;
        const totalCount = unit.nodes.length;
        const stageInfo = STAGE_BADGES[unit.stage];

        return (
          <section key={unit.id} className="mb-14">
            {/* Unit Header Card */}
            <div
              style={{ backgroundColor: unit.themeColor }}
              className="text-white rounded-3xl p-5 shadow-lg mb-10 transition-transform"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${stageInfo.badgeBg}`}
                >
                  {stageInfo.label}
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-black/25">
                  CEFR {unit.cefrLevel} • {completedCount}/{totalCount}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight">
                    Unidad {unit.id}: {unit.title}
                  </h2>
                  <p className="text-xs font-bold text-white/80 uppercase tracking-wide">
                    {unit.subtitle}
                  </p>
                  <p className="text-sm text-white/95 font-medium mt-1">{unit.description}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      sound.playTap();
                      onOpenTheory(unit.id);
                    }}
                    className="px-3.5 py-2.5 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-extrabold text-xs flex items-center gap-1.5 transition"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Guía y Teoría</span>
                  </button>

                  {isUnitLocked && (
                    <button
                      onClick={() => {
                        sound.playTap();
                        onStartJumpAhead(unit.id);
                      }}
                      className="px-3.5 py-2.5 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition"
                    >
                      <FastForward className="w-4 h-4 text-duo-purple" />
                      <span>Saltar Aquí</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Serpentine Nodes */}
            <div className="flex flex-col items-center space-y-3 relative">
              {unit.nodes.map((node, idx) => {
                const isFirstActive = node.id === firstActiveLessonId;
                const pos = POSITIONS[idx % POSITIONS.length];
                return (
                  <div
                    key={node.id}
                    ref={isFirstActive ? activeNodeRef : undefined}
                    className="w-full flex justify-center"
                  >
                    <RoadmapNode
                      node={node}
                      position={pos}
                      isActive={isFirstActive}
                      onSelectNode={(clickedLesson) => {
                        setSelectedPopoverNode({ lesson: clickedLesson, unit });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Floating Action Buttons (Practice Dumbbell + Scroll to Active Lesson) */}
      <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3">
        <button
          onClick={scrollToActiveLesson}
          aria-label="Ir a la lección actual"
          title="Ir a la lección actual"
          className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-duo-blue shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          <Compass className="w-7 h-7" />
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onStartPractice();
          }}
          aria-label="Práctica inteligente y recuperar vidas"
          title="Práctica inteligente (+1 Vida)"
          className="w-14 h-14 rounded-2xl bg-duo-blue hover:bg-duo-blue-dark text-white shadow-duo-blue flex items-center justify-center hover:scale-105 active:translate-y-1 transition-all"
        >
          <Dumbbell className="w-7 h-7" />
        </button>
      </div>

      {/* Node Action Popover Modal */}
      {selectedPopoverNode && (
        <div
          onClick={() => setSelectedPopoverNode(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-sm w-full p-6 border-2 border-gray-200 dark:border-gray-700 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-duo-blue">
                  Unidad {selectedPopoverNode.unit.id} • {selectedPopoverNode.unit.cefrLevel}
                </span>
                <h3 className="text-xl font-black text-gray-800 dark:text-white mt-0.5">
                  {selectedPopoverNode.lesson.title}
                </h3>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  {selectedPopoverNode.lesson.englishTitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedPopoverNode(null)}
                aria-label="Cerrar detalle de lección"
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-5 bg-gray-50 dark:bg-gray-900/60 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700">
              {selectedPopoverNode.lesson.description}
            </p>

            <div className="space-y-2.5">
              {selectedPopoverNode.lesson.unlocked ? (
                <button
                  onClick={() => {
                    const { lesson, unit } = selectedPopoverNode;
                    setSelectedPopoverNode(null);
                    onSelectLesson(lesson, unit);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-duo-green hover:bg-duo-green-dark text-white font-extrabold flex items-center justify-center gap-2 shadow-duo-btn active:translate-y-0.5 transition"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>
                    {selectedPopoverNode.lesson.stars > 0
                      ? 'REPASAR LECCIÓN (+20 XP)'
                      : 'EMPEZAR LECCIÓN (+20 XP)'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const { unit, lesson } = selectedPopoverNode;
                    setSelectedPopoverNode(null);
                    onStartJumpAhead(unit.id, lesson.id);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-duo-purple hover:bg-purple-700 text-white font-extrabold flex items-center justify-center gap-2 shadow-duo-purple active:translate-y-0.5 transition"
                >
                  <FastForward className="w-5 h-5" />
                  <span>HACER EXAMEN PARA SALTAR AQUÍ</span>
                </button>
              )}

              <button
                onClick={() => {
                  const unitNum = selectedPopoverNode.unit.id;
                  setSelectedPopoverNode(null);
                  onOpenTheory(unitNum);
                }}
                className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-extrabold text-sm flex items-center justify-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ver Teoría de la Unidad {selectedPopoverNode.unit.id}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Unit Jump Ahead Selector Modal */}
      {showJumpSelectorUnit !== null && (
        <div
          onClick={() => setShowJumpSelectorUnit(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full p-6 border-2 border-gray-200 dark:border-gray-700 shadow-2xl max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-duo-purple" />
                <h3 className="text-lg font-black text-gray-800 dark:text-white">
                  Salto de Nivel (Placement Exam)
                </h3>
              </div>
              <button
                onClick={() => setShowJumpSelectorUnit(null)}
                aria-label="Cerrar selector de salto"
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              ¿Ya sabes inglés? Elige hasta qué unidad quieres desbloquear. Si apruebas el examen
              acumulativo con menos de 3 errores, se completarán todas las unidades previas.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-4">
              {curriculum.slice(1).map((u) => (
                <button
                  key={u.id}
                  onClick={() => setShowJumpSelectorUnit(u.id)}
                  className={`w-full p-3 rounded-2xl border-2 text-left transition flex items-center justify-between ${
                    showJumpSelectorUnit === u.id
                      ? 'border-duo-purple bg-purple-50 dark:bg-purple-950/40'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold text-duo-purple">
                      Unidad {u.id} • Nivel {u.cefrLevel}
                    </div>
                    <div className="text-sm font-bold text-gray-800 dark:text-white">
                      {u.title}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{u.nodes.length} nodos</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const targetId = showJumpSelectorUnit;
                setShowJumpSelectorUnit(null);
                onStartJumpAhead(targetId);
              }}
              className="w-full py-3.5 rounded-2xl bg-duo-purple hover:bg-purple-700 text-white font-extrabold shadow-duo-purple flex items-center justify-center gap-2"
            >
              <FastForward className="w-5 h-5" />
              <span>COMENZAR EXAMEN DE SALTO</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
