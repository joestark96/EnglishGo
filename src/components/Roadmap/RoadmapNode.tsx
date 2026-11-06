import React from 'react';
import {
  Check,
  Lock,
  Star,
  Play,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  Coffee,
  Heart,
  Music,
  Users,
  Award,
  Flame,
  BookOpen,
  HelpCircle,
  PhoneCall,
  Headphones,
  MapPin,
  Compass,
  Plane,
  Clock,
  Calendar,
  Lightbulb,
  ShieldAlert,
  ListFilter,
  Briefcase,
  Gift,
  Train,
  Utensils,
  GraduationCap,
  Mic
} from 'lucide-react';
import { LessonNode } from '../../types';
import { sound } from '../../services/sound';

interface RoadmapNodeProps {
  node: LessonNode;
  position: 'center' | 'left' | 'right';
  isActive: boolean;
  onSelectNode: (node: LessonNode) => void;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  node,
  position,
  isActive,
  onSelectNode
}) => {
  const isCompleted = node.stars > 0 || node.completedSteps >= node.totalSteps;
  const isLocked = !node.unlocked;

  const renderIcon = () => {
    const props = { className: 'w-7 h-7 text-white stroke-[2.5px]' };
    switch (node.icon) {
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'MessageCircle':
        return <MessageCircle {...props} />;
      case 'ShoppingBag':
        return <ShoppingBag {...props} />;
      case 'Coffee':
        return <Coffee {...props} />;
      case 'Heart':
        return <Heart {...props} />;
      case 'Music':
        return <Music {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Award':
        return <Award {...props} />;
      case 'HelpCircle':
        return <HelpCircle {...props} />;
      case 'PhoneCall':
        return <PhoneCall {...props} />;
      case 'Headphones':
        return <Headphones {...props} />;
      case 'MapPin':
        return <MapPin {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Plane':
        return <Plane {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'Calendar':
        return <Calendar {...props} />;
      case 'Lightbulb':
        return <Lightbulb {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'ListFilter':
        return <ListFilter {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Gift':
        return <Gift {...props} />;
      case 'Train':
        return <Train {...props} />;
      case 'Utensils':
        return <Utensils {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      default:
        return <Play {...props} />;
    }
  };

  const getColorClasses = () => {
    if (isLocked) {
      return {
        bg: 'bg-duo-gray-300',
        border: 'border-duo-gray-400',
        shadow: 'shadow-[0_6px_0_0_#a3a3a3]'
      };
    }
    if (isCompleted) {
      return {
        bg: 'bg-duo-yellow',
        border: 'border-duo-yellow-dark',
        shadow: 'shadow-[0_6px_0_0_#e5b400]'
      };
    }
    switch (node.color) {
      case 'blue':
        return {
          bg: 'bg-duo-blue',
          border: 'border-duo-blue-dark',
          shadow: 'shadow-[0_6px_0_0_#1899d6]'
        };
      case 'orange':
        return {
          bg: 'bg-duo-orange',
          border: 'border-duo-orange-dark',
          shadow: 'shadow-[0_6px_0_0_#e08500]'
        };
      case 'purple':
        return {
          bg: 'bg-duo-purple',
          border: 'border-duo-purple-dark',
          shadow: 'shadow-[0_6px_0_0_#a855f7]'
        };
      case 'red':
        return {
          bg: 'bg-duo-red',
          border: 'border-duo-red-dark',
          shadow: 'shadow-[0_6px_0_0_#ea2b2b]'
        };
      case 'green':
      default:
        return {
          bg: 'bg-duo-green',
          border: 'border-duo-green-dark',
          shadow: 'shadow-[0_6px_0_0_#46a302]'
        };
    }
  };

  const colors = getColorClasses();

  const getOffsetClass = () => {
    if (position === 'left') return '-translate-x-14';
    if (position === 'right') return 'translate-x-14';
    return 'translate-x-0';
  };

  return (
    <div
      id={`roadmap-node-${node.id}`}
      className={`relative flex flex-col items-center my-4 transition-transform duration-200 ${getOffsetClass()}`}
    >
      {/* Floating Callout badge for the active lesson */}
      {isActive && !isCompleted && !isLocked && (
        <div className="absolute -top-11 z-20 animate-bounce">
          <div className="bg-white dark:bg-[#18272e] border-2 border-duo-gray-300 dark:border-[#283842] px-3 py-1 rounded-xl shadow-md flex items-center gap-1 font-black text-xs text-duo-green dark:text-green-400 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>¡Comenzar!</span>
          </div>
          <div className="w-2.5 h-2.5 bg-white dark:bg-[#18272e] border-r-2 border-b-2 border-duo-gray-300 dark:border-[#283842] transform rotate-45 mx-auto -mt-1.5"></div>
        </div>
      )}

      {/* 3D Round Node Button */}
      <button
        onClick={() => {
          sound.playTap();
          onSelectNode(node);
        }}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-150 active:translate-y-1 active:shadow-none cursor-pointer hover:brightness-105 ${colors.bg} ${colors.shadow} ${
          isLocked ? 'opacity-90' : ''
        }`}
      >
        {isActive && !isLocked && !isCompleted && (
          <div className="absolute inset-0 rounded-full border-4 border-duo-green animate-ping opacity-30 pointer-events-none" />
        )}

        <div className="flex flex-col items-center justify-center">
          {isLocked ? (
            <Lock className="w-7 h-7 text-duo-gray-500" />
          ) : isCompleted ? (
            <Check className="w-9 h-9 text-white stroke-[3.5px]" />
          ) : (
            renderIcon()
          )}
        </div>

        {isCompleted && (
          <div className="absolute -bottom-1 -right-1 bg-duo-yellow-dark text-white rounded-full p-1 border-2 border-white shadow-sm flex items-center justify-center">
            <Star className="w-3.5 h-3.5 fill-white" />
          </div>
        )}
      </button>

      {/* Label under node */}
      <div className="mt-2 text-center max-w-[155px]">
        <div className="text-xs font-black text-gray-800 dark:text-gray-100 line-clamp-1">
          {node.title}
        </div>
        <div
          className="text-[10px] font-bold text-gray-500 dark:text-gray-400 line-clamp-1"
          lang="en"
        >
          {node.englishTitle}
        </div>
      </div>
    </div>
  );
};
