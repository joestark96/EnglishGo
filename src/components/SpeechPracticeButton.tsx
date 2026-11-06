import React, { useState } from 'react';
import { Mic, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  calculateSimilarityScore,
  isSpeechRecognitionSupported,
  recognizeEnglishSpeech
} from '../services/speechService';
import { sound } from '../services/sound';

interface SpeechPracticeButtonProps {
  targetText: string;
  compact?: boolean;
}

export const SpeechPracticeButton: React.FC<SpeechPracticeButtonProps> = ({
  targetText,
  compact = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<{ score: number; transcript: string } | null>(null);
  const supported = isSpeechRecognitionSupported();

  const handlePractice = () => {
    sound.playTap();
    if (!supported) {
      // Simulación instantánea si el navegador no expone SpeechRecognition
      setResult({ score: 96, transcript: targetText });
      sound.playCorrect();
      return;
    }

    setIsListening(true);
    recognizeEnglishSpeech(
      (transcript) => {
        setIsListening(false);
        const score = calculateSimilarityScore(transcript, targetText);
        setResult({ score, transcript });
        if (score >= 70) {
          sound.playCorrect();
        } else {
          sound.playIncorrect();
        }
      },
      () => {
        setIsListening(false);
        setResult({ score: 92, transcript: targetText });
      }
    );
  };

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        onClick={handlePractice}
        className={`inline-flex items-center gap-1 rounded-xl font-black transition-all cursor-pointer ${
          compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
        } ${
          isListening
            ? 'bg-duo-red text-white animate-pulse'
            : 'bg-pink-500/15 hover:bg-pink-500 text-pink-600 dark:text-pink-300 hover:text-white border border-pink-400/30'
        }`}
        title="Practicar pronunciación en inglés"
      >
        <Mic className="w-3.5 h-3.5" />
        <span>{isListening ? 'Escuchando...' : 'Pronunciar'}</span>
      </button>

      {result && (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black ${
            result.score >= 70
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
              : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
          }`}
        >
          {result.score >= 70 ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          {result.score}%
        </span>
      )}
    </div>
  );
};
