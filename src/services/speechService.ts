// Web Speech API Synthesis (TTS) & Speech Recognition helper

export function speakEnglish(text: string, rate = 0.95): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((v) => v.lang === 'en-US' && v.name.includes('Natural')) ||
    voices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB') ||
    voices.find((v) => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function normalizeEnglishText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[.,!?'"’;:()-]/g, ' ')
    .replace(/\b(i'm)\b/g, 'i am')
    .replace(/\b(don't)\b/g, 'do not')
    .replace(/\b(wouldn't)\b/g, 'would not')
    .replace(/\b(let's)\b/g, 'let us')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateSimilarityScore(spoken: string, target: string): number {
  const a = normalizeEnglishText(spoken);
  const b = normalizeEnglishText(target);
  if (!a || !b) return 0;
  if (a === b) return 100;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[b.length][a.length];
  const maxLen = Math.max(a.length, b.length);
  return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as Record<string, unknown>;
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export function recognizeEnglishSpeech(
  onResult: (transcript: string) => void,
  onError: (message: string) => void
): () => void {
  const w = window as unknown as Record<string, any>;
  const SpeechRecognitionCtor = w.SpeechRecognition || w.webkitSpeechRecognition;

  if (!SpeechRecognitionCtor) {
    onError('Tu navegador no soporta reconocimiento de voz directo. Puedes usar el modo de evaluación escrita o simulada.');
    return () => {};
  }

  const recognition = new SpeechRecognitionCtor();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(`No se pudo capturar la voz (${event.error || 'error'}). Puedes intentarlo de nuevo o escribir la frase.`);
  };

  recognition.start();

  return () => {
    try {
      recognition.stop();
    } catch {
      // ignore stop errors
    }
  };
}
