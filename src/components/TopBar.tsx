import React from 'react';
import { Flame, Zap, Heart, Gem, Volume2, VolumeX, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface TopBarProps {
  profile: UserProfile;
  nextHeartMinutes?: number | null;
  onSoundToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  profile,
  nextHeartMinutes,
  onSoundToggle
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#18272e] border-b-2 border-duo-gray-200 dark:border-[#283842] px-3 py-2 shadow-sm transition-colors duration-200">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        {/* App Brand Logo */}
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-duo-blue flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <GraduationCap className="w-4 h-4 stroke-[2.5px]" />
          </div>
          <span className="hidden sm:inline text-xs font-black tracking-tight text-gray-800 dark:text-gray-100">
            English<span className="text-duo-blue">Go!</span>
          </span>
        </div>

        {/* Racha / Streak */}
        <div className="flex items-center gap-1.5 font-extrabold text-duo-orange" title="Racha de días estudiados">
          <Flame className="w-5 h-5 fill-duo-orange" />
          <span className="text-sm tracking-wide">{profile.streakDays}</span>
        </div>

        {/* Puntos XP */}
        <div className="flex items-center gap-1.5 font-extrabold text-duo-yellow-dark" title="Experiencia total">
          <Zap className="w-5 h-5 fill-duo-yellow text-duo-yellow-dark" />
          <span className="text-sm tracking-wide">{profile.xp} XP</span>
        </div>

        {/* Gemas */}
        <div className="flex items-center gap-1.5 font-extrabold text-duo-blue" title="Gemas disponibles">
          <Gem className="w-5 h-5 fill-duo-blue" />
          <span className="text-sm tracking-wide">{profile.gems}</span>
        </div>

        {/* Vidas / Corazones */}
        {(() => {
          const nextStr = nextHeartMinutes
            ? nextHeartMinutes >= 60
              ? '1h'
              : `${nextHeartMinutes}m`
            : '';
          return (
            <div className="flex items-center gap-1.5 font-extrabold text-duo-red">
              <Heart className="w-5 h-5 fill-duo-red" />
              <span className="text-sm tracking-wide">{profile.hearts}</span>
              {profile.hearts < profile.maxHearts && nextStr ? (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-duo-red/10 text-duo-red">
                  +1 en {nextStr}
                </span>
              ) : null}
            </div>
          );
        })()}

        {/* Sonido Toggle */}
        <button
          onClick={onSoundToggle}
          className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
          aria-label={profile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
          title={profile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
        >
          {profile.soundEnabled ? (
            <Volume2 className="w-5 h-5 text-duo-green" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
    </header>
  );
};
