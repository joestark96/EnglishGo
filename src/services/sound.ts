// Web Audio API synthesizers for Duolingo-style sound effects + Multi-Accent English TTS Engine

export interface CharacterVoiceProfile {
  id: string;
  name: string;
  accentLabel: string;
  avatar: string;
  role: string;
  lang: string;
  pitch: number;
  rate: number;
  samplePhrase: string;
}

export const CHARACTER_VOICES: CharacterVoiceProfile[] = [
  {
    id: 'emily',
    name: 'Emily (US)',
    accentLabel: 'American English',
    avatar: '👱‍♀️',
    role: 'Voz femenina clara y natural (Estados Unidos)',
    lang: 'en-US',
    pitch: 1.04,
    rate: 0.96,
    samplePhrase: 'Hi there! I am Emily from New York. Let us practice English together!'
  },
  {
    id: 'oliver',
    name: 'Oliver (UK)',
    accentLabel: 'British Received Pronunciation',
    avatar: '🧔',
    role: 'Voz masculina británica (Londres)',
    lang: 'en-GB',
    pitch: 0.95,
    rate: 0.95,
    samplePhrase: 'Good afternoon! I am Oliver from London. Shall we begin today’s lesson?'
  },
  {
    id: 'sophia',
    name: 'Sophia (UK)',
    accentLabel: 'British English',
    avatar: '👩‍🏫',
    role: 'Profesora de gramática y fonética (Cambridge)',
    lang: 'en-GB',
    pitch: 1.06,
    rate: 0.94,
    samplePhrase: 'Welcome to class! Pay close attention to the vowel sounds and intonation.'
  },
  {
    id: 'liam',
    name: 'Liam (US)',
    accentLabel: 'American Casual',
    avatar: '👦',
    role: 'Voz masculina dinámica para diálogos cotidianos (California)',
    lang: 'en-US',
    pitch: 0.98,
    rate: 1.0,
    samplePhrase: 'Hey! How is it going? Ready to master some phrasal verbs today?'
  },
  {
    id: 'chloe',
    name: 'Chloe (AU)',
    accentLabel: 'Australian English',
    avatar: '👩‍🦱',
    role: 'Voz femenina australiana (Sídney)',
    lang: 'en-AU',
    pitch: 1.02,
    rate: 0.96,
    samplePhrase: 'G’day! I am Chloe from Sydney. Practicing every day makes a huge difference!'
  }
];

class SoundService {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private defaultVoiceId: string = 'emily';
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    try {
      this.voices = window.speechSynthesis.getVoices() || [];
    } catch {
      // ignore
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!this.isEnabled || typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public setDefaultVoice(voiceId: string) {
    if (CHARACTER_VOICES.some((v) => v.id === voiceId)) {
      this.defaultVoiceId = voiceId;
    }
  }

  public getDefaultVoice(): string {
    return this.defaultVoiceId;
  }

  public getCharacterProfile(speakerOrVoiceId?: string): CharacterVoiceProfile {
    if (!speakerOrVoiceId) {
      return CHARACTER_VOICES.find((v) => v.id === this.defaultVoiceId) || CHARACTER_VOICES[0];
    }
    const s = speakerOrVoiceId.toLowerCase();
    const direct = CHARACTER_VOICES.find((v) => v.id === s);
    if (direct) return direct;
    if (s.includes('oliver') || s.includes('prof') || s.includes('manager') || s.includes('officer')) {
      return CHARACTER_VOICES.find((v) => v.id === 'oliver')!;
    }
    if (s.includes('liam') || s.includes('barista') || s.includes('waiter') || s.includes('david')) {
      return CHARACTER_VOICES.find((v) => v.id === 'liam')!;
    }
    if (s.includes('sophia') || s.includes('teacher') || s.includes('doctor') || s.includes('recruiter')) {
      return CHARACTER_VOICES.find((v) => v.id === 'sophia')!;
    }
    if (s.includes('chloe') || s.includes('sarah')) {
      return CHARACTER_VOICES.find((v) => v.id === 'chloe')!;
    }
    return CHARACTER_VOICES.find((v) => v.id === this.defaultVoiceId) || CHARACTER_VOICES[0];
  }

  public playTap() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  public playCorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [587.33, 880]; // D5 -> A5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.14, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.24);
      });
    } catch {}
  }

  public playIncorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [311.13, 233.08]; // D#4 -> A#3
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.1, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    } catch {}
  }

  public playLessonComplete() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.16, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.36);
      });
    } catch {}
  }

  public preloadAudio(_text: string) {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
    }
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speakEnglish(text: string, speakerOrVoiceId?: string, customRate?: number, onEnd?: () => void) {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const profile = this.getCharacterProfile(speakerOrVoiceId);
    const cleanText = text.replace(/___+/g, 'blank').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = profile.lang;
    utterance.pitch = profile.pitch;
    utterance.rate = customRate ?? profile.rate;

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const matchingVoice =
      this.voices.find((v) => v.lang === profile.lang && /Natural|Online|Google|Microsoft/i.test(v.name)) ||
      this.voices.find((v) => v.lang === profile.lang) ||
      this.voices.find((v) => v.lang.startsWith('en'));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const sound = new SoundService();
