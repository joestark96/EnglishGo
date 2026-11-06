import React, { useState, useEffect, useRef } from 'react';
import {
  Map,
  BookOpen,
  Layers,
  BookA,
  MessageSquare,
  Languages,
  PenTool,
  Mic,
  User,
  ChevronUp,
  Library,
  Check,
  Target
} from 'lucide-react';
import { sound } from '../services/sound';

export type NavTab =
  | 'roadmap'
  | 'theory'
  | 'flashcards'
  | 'phonetics'
  | 'readings'
  | 'vocabulary'
  | 'writing'
  | 'speaking'
  | 'profile'
  | 'mastery';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const studyOptions: {
    id: NavTab;
    label: string;
    subtitle: string;
    icon: React.FC<{ className?: string }>;
    badgeColor: string;
  }[] = [
    {
      id: 'mastery',
      label: 'Mi Dominio',
      subtitle: 'Puntuación de palabras y repaso de débiles',
      icon: Target,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-400/30'
    },
    {
      id: 'theory',
      label: 'Teoría',
      subtitle: 'Gramática A1 a C1 (24 Unidades)',
      icon: BookOpen,
      badgeColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-400/30'
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      subtitle: 'Tarjetas SRS de repaso espaciado',
      icon: Layers,
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30'
    },
    {
      id: 'phonetics',
      label: 'Fonética e IPA',
      subtitle: 'Los 44 sonidos, Schwa y Pares Mínimos',
      icon: BookA,
      badgeColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-400/30'
    },
    {
      id: 'readings',
      label: 'Lecturas y Podcast',
      subtitle: 'Diálogos por unidad y Modo Podcast',
      icon: MessageSquare,
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-400/30'
    },
    {
      id: 'vocabulary',
      label: 'Vocabulario y Verbos',
      subtitle: 'Listas A1–C1 y Conjugador de 12 Tiempos',
      icon: Languages,
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-400/30'
    },
    {
      id: 'writing',
      label: 'Escritura y Dictado',
      subtitle: 'Spelling Bee y Dictado Auditivo',
      icon: PenTool,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-400/30'
    },
    {
      id: 'speaking',
      label: 'Hablar y Roleplay',
      subtitle: 'Pronunciación con voz y Diálogos',
      icon: Mic,
      badgeColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-400/30'
    }
  ];

  const activeStudyOption = studyOptions.find((opt) => opt.id === activeTab);
  const isStudyTabActive = Boolean(activeStudyOption);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const ActiveStudyIcon = activeStudyOption ? activeStudyOption.icon : Library;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        aria-label="Navegación principal"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#18272e] border-t-2 border-duo-gray-200 dark:border-[#283842] py-1.5 px-4 shadow-lg transition-colors duration-200"
      >
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* 1. Aprender (Roadmap) */}
          <button
            onClick={() => {
              sound.playTap();
              setMenuOpen(false);
              if (activeTab === 'roadmap') {
                window.dispatchEvent(new CustomEvent('focus-roadmap-active-node'));
              } else {
                onTabChange('roadmap');
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-150 cursor-pointer ${
              activeTab === 'roadmap'
                ? 'text-duo-green font-black scale-105'
                : 'text-gray-400 dark:text-gray-400 font-bold hover:text-gray-600 dark:hover:text-gray-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-duo-green-light/40 dark:bg-duo-green/20 border-2 border-duo-green'
                  : 'border-2 border-transparent'
              }`}
            >
              <Map className={`w-5 h-5 ${activeTab === 'roadmap' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Aprender</span>
          </button>

          {/* 2. Estudio / Recursos Dropdown Trigger + Menu */}
          <div ref={dropdownRef} className="relative flex flex-col items-center">
            {menuOpen && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50">
                <div className="w-68 max-h-[75vh] overflow-y-auto overscroll-contain bg-white dark:bg-[#18272e] border-2 border-duo-gray-200 dark:border-[#283842] rounded-3xl shadow-2xl p-2 flex flex-col gap-1.5 animate-fade-in">
                  <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#283842] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Material de Estudio
                    </span>
                    <span className="text-[10px] font-bold text-duo-blue">8 secciones</span>
                  </div>

                  {studyOptions.map((option) => {
                    const OptionIcon = option.icon;
                    const isSelected = activeTab === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          sound.playTap();
                          setMenuOpen(false);
                          onTabChange(option.id);
                        }}
                        className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-2xl text-left transition-all cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-duo-green-light/30 dark:bg-duo-green/15 border-duo-green text-gray-900 dark:text-white'
                            : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-[#131f24] text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${option.badgeColor}`}
                          >
                            <OptionIcon className="w-4 h-4 stroke-[2.5px]" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black leading-tight truncate">
                              {option.label}
                            </div>
                            <div className="text-[10px] font-semibold text-gray-400 dark:text-gray-400 truncate">
                              {option.subtitle}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-duo-green stroke-[3px] flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                sound.playTap();
                setMenuOpen((prev) => !prev);
              }}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-150 cursor-pointer ${
                isStudyTabActive || menuOpen
                  ? 'text-duo-blue font-black scale-105'
                  : 'text-gray-400 dark:text-gray-400 font-bold hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl flex items-center gap-1 transition-all ${
                  isStudyTabActive || menuOpen
                    ? 'bg-duo-blue-light/50 dark:bg-duo-blue/20 border-2 border-duo-blue'
                    : 'border-2 border-transparent'
                }`}
              >
                <ActiveStudyIcon className="w-5 h-5 stroke-[2.5px]" />
                <ChevronUp
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">
                {activeStudyOption ? activeStudyOption.label : 'Estudio'}
              </span>
            </button>
          </div>

          {/* 3. Perfil */}
          <button
            onClick={() => {
              sound.playTap();
              setMenuOpen(false);
              onTabChange('profile');
            }}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-150 cursor-pointer ${
              activeTab === 'profile'
                ? 'text-duo-purple font-black scale-105'
                : 'text-gray-400 dark:text-gray-400 font-bold hover:text-gray-600 dark:hover:text-gray-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-duo-purple/15 dark:bg-duo-purple/20 border-2 border-duo-purple'
                  : 'border-2 border-transparent'
              }`}
            >
              <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};
