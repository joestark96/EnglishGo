// Web Audio API synthesizers for Duolingo-style sound effects + Native Neural & Online English Voice Engine
// Guaranteed 100% Native English pronunciation (never falls back to Spanish OS voices)

export type NeuralEnglishVoiceId =
  | 'en_us_001'
  | 'en_us_006'
  | 'en_uk_001'
  | 'en_uk_003'
  | 'en_au_001';

export interface CharacterVoiceProfile {
  id: string;
  name: string;
  accentLabel: string;
  avatar: string;
  role: string;
  gender: 'female' | 'male';
  lang: 'en-US' | 'en-GB' | 'en-AU';
  neuralVoiceId: NeuralEnglishVoiceId;
  youdaoType: 1 | 2; // 1 = UK British RP, 2 = US American
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
    role: 'Voz femenina nativa estadounidense (Nueva York)',
    gender: 'female',
    lang: 'en-US',
    neuralVoiceId: 'en_us_001',
    youdaoType: 2,
    pitch: 1.0,
    rate: 0.96,
    samplePhrase: 'Hi there! I am Emily from New York. Let us practice English together!',
  },
  {
    id: 'oliver',
    name: 'Oliver (UK)',
    accentLabel: 'British Received Pronunciation',
    avatar: '🧔',
    role: 'Voz masculina nativa británica (Londres)',
    gender: 'male',
    lang: 'en-GB',
    neuralVoiceId: 'en_uk_001',
    youdaoType: 1,
    pitch: 0.96,
    rate: 0.95,
    samplePhrase: 'Good afternoon! I am Oliver from London. Shall we begin today’s lesson?',
  },
  {
    id: 'sophia',
    name: 'Sophia (UK)',
    accentLabel: 'British English',
    avatar: '👩‍🏫',
    role: 'Profesora de gramática y fonética (Cambridge)',
    gender: 'female',
    lang: 'en-GB',
    neuralVoiceId: 'en_uk_003',
    youdaoType: 1,
    pitch: 1.03,
    rate: 0.94,
    samplePhrase: 'Welcome to class! Pay close attention to the vowel sounds and intonation.',
  },
  {
    id: 'liam',
    name: 'Liam (US)',
    accentLabel: 'American Casual',
    avatar: '👦',
    role: 'Voz masculina nativa estadounidense (California)',
    gender: 'male',
    lang: 'en-US',
    neuralVoiceId: 'en_us_006',
    youdaoType: 2,
    pitch: 0.98,
    rate: 0.98,
    samplePhrase: 'Hey! How is it going? Ready to master some phrasal verbs today?',
  },
  {
    id: 'chloe',
    name: 'Chloe (AU)',
    accentLabel: 'Australian English',
    avatar: '👩‍🦱',
    role: 'Voz femenina nativa australiana (Sídney)',
    gender: 'female',
    lang: 'en-AU',
    neuralVoiceId: 'en_au_001',
    youdaoType: 1,
    pitch: 1.02,
    rate: 0.96,
    samplePhrase: 'G’day! I am Chloe from Sydney. Practicing every day makes a huge difference!',
  },
];

/**
 * Strips IPA transcriptions (/.../), brackets, and Spanish parenthetical translations
 * so the TTS engine only pronounces pure English text.
 */
export function cleanEnglishForSpeech(raw: string): string {
  return raw
    .replace(/\/[^/]+\//g, ' ') // Remove /ʃɪp/ IPA transcriptions
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/\([^)]*\)/g, ' ') // Remove (sentarse) Spanish hints
    .replace(/___+/g, 'blank')
    .replace(/\s+/g, ' ')
    .trim();
}

class SoundService {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private defaultVoiceId: string = 'emily';
  private voices: SpeechSynthesisVoice[] = [];
  private activeAudio: HTMLAudioElement | null = null;
  private activeBufferSource: AudioBufferSourceNode | null = null;
  private currentSpeechId: number = 0;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private neuralBufferCache: Map<string, AudioBuffer> = new Map();

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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    if (!enabled) {
      this.stopSpeech();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
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
    if (
      s.includes('oliver') ||
      s.includes('prof') ||
      s.includes('manager') ||
      s.includes('officer') ||
      s.includes('arthur')
    ) {
      return CHARACTER_VOICES.find((v) => v.id === 'oliver')!;
    }
    if (
      s.includes('liam') ||
      s.includes('barista') ||
      s.includes('waiter') ||
      s.includes('david') ||
      s.includes('mark') ||
      s.includes('kevin')
    ) {
      return CHARACTER_VOICES.find((v) => v.id === 'liam')!;
    }
    if (
      s.includes('sophia') ||
      s.includes('teacher') ||
      s.includes('doctor') ||
      s.includes('recruiter') ||
      s.includes('claire')
    ) {
      return CHARACTER_VOICES.find((v) => v.id === 'sophia')!;
    }
    if (s.includes('chloe') || s.includes('sarah') || s.includes('emma')) {
      return CHARACTER_VOICES.find((v) => v.id === 'chloe')!;
    }
    return CHARACTER_VOICES.find((v) => v.id === this.defaultVoiceId) || CHARACTER_VOICES[0];
  }

  /**
   * Returns ONLY genuine English voices installed on the system, strictly excluding any Spanish
   * voice (such as Microsoft Helena, Sabina, Pablo, Laura, or es-* locales).
   */
  private getStrictNativeEnglishVoice(
    profile: CharacterVoiceProfile
  ): SpeechSynthesisVoice | null {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
    }

    const englishVoices = this.voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      const isEnglishLang = lang.startsWith('en-') || lang === 'en';
      const isSpanishVoice =
        lang.startsWith('es') ||
        name.includes('spanish') ||
        name.includes('español') ||
        name.includes('helena') ||
        name.includes('sabina') ||
        name.includes('pablo') ||
        name.includes('laura') ||
        name.includes('raul') ||
        name.includes('dalia') ||
        name.includes('jorge') ||
        name.includes('paloma');
      return isEnglishLang && !isSpanishVoice;
    });

    if (englishVoices.length === 0) return null;

    const targetLang = profile.lang.toLowerCase();
    const maleNames = ['david', 'mark', 'george', 'ryan', 'guy', 'christopher', 'eric', 'daniel', 'james', 'liam', 'oliver', 'male'];
    const femaleNames = ['zira', 'hazel', 'susan', 'aria', 'jenny', 'michelle', 'sonia', 'libby', 'samantha', 'victoria', 'karen', 'google us english', 'female'];

    const genderHints = profile.gender === 'male' ? maleNames : femaleNames;

    // 1. High-quality Natural/Online voice matching both accent & gender
    const naturalAccentGender = englishVoices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === targetLang &&
        /natural|online|google|neural/i.test(v.name) &&
        genderHints.some((h) => v.name.toLowerCase().includes(h))
    );
    if (naturalAccentGender) return naturalAccentGender;

    // 2. Voice matching both accent & gender
    const accentGender = englishVoices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === targetLang &&
        genderHints.some((h) => v.name.toLowerCase().includes(h))
    );
    if (accentGender) return accentGender;

    // 3. Natural/Online voice matching accent
    const naturalAccent = englishVoices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-') === targetLang &&
        /natural|online|google|neural/i.test(v.name)
    );
    if (naturalAccent) return naturalAccent;

    // 4. Any voice matching accent
    const exactAccent = englishVoices.find(
      (v) => v.lang.toLowerCase().replace('_', '-') === targetLang
    );
    if (exactAccent) return exactAccent;

    // 5. Any English voice matching gender
    const anyGender = englishVoices.find((v) =>
      genderHints.some((h) => v.name.toLowerCase().includes(h))
    );
    if (anyGender) return anyGender;

    return englishVoices[0];
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

  public preloadAudio(text: string) {
    const clean = cleanEnglishForSpeech(text);
    if (!clean || this.audioCache.has(clean)) return;
    try {
      const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&le=eng&type=2`;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      this.audioCache.set(clean, audio);
    } catch {}
  }

  public stopSpeech() {
    this.currentSpeechId++;
    if (this.activeBufferSource) {
      try {
        this.activeBufferSource.stop();
        this.activeBufferSource.disconnect();
      } catch {}
      this.activeBufferSource = null;
    }
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch {}
      this.activeAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  /**
   * Tier 1: High-definition Neural English Voice (Emily US, Oliver UK, Sophia UK, Liam US, Chloe AU)
   */
  private async playNeuralEnglishVoice(
    cleanText: string,
    profile: CharacterVoiceProfile,
    rate: number,
    speechId: number
  ): Promise<boolean> {
    if (cleanText.length > 240) return false;
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    const cacheKey = `${profile.neuralVoiceId}:${cleanText}`;
    try {
      let decodedBuffer = this.neuralBufferCache.get(cacheKey);
      if (!decodedBuffer) {
        const isLocalDev =
          typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        const endpoints = isLocalDev
          ? ['/api/tts', 'https://ottsy.weilbyte.dev/api/generation']
          : ['https://ottsy.weilbyte.dev/api/generation', '/api/tts'];

        let fetchedBase64: string | null = null;
        for (const endpoint of endpoints) {
          if (this.currentSpeechId !== speechId) return false;
          try {
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 3200);
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                text: cleanText,
                voice: profile.neuralVoiceId,
              }),
              signal: controller.signal,
            });
            window.clearTimeout(timeoutId);
            if (res.ok) {
              const json = await res.json();
              if (json && json.success && json.data) {
                fetchedBase64 = json.data;
                break;
              }
            }
          } catch {
            // Try next endpoint
          }
        }

        if (!fetchedBase64 || this.currentSpeechId !== speechId) return false;

        const binaryString = window.atob(fetchedBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        decodedBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0));
        this.neuralBufferCache.set(cacheKey, decodedBuffer);
      }

      if (this.currentSpeechId !== speechId) return false;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      return new Promise<boolean>((resolve) => {
        try {
          if (this.currentSpeechId !== speechId) return resolve(false);
          const source = ctx.createBufferSource();
          const gainNode = ctx.createGain();
          source.buffer = decodedBuffer!;
          source.playbackRate.value = Math.max(0.7, Math.min(1.2, rate));
          gainNode.gain.value = 0.95;
          source.connect(gainNode);
          gainNode.connect(ctx.destination);
          this.activeBufferSource = source;
          source.onended = () => {
            if (this.activeBufferSource === source) {
              this.activeBufferSource = null;
            }
            resolve(true);
          };
          source.start(0);
        } catch {
          resolve(false);
        }
      });
    } catch {
      return false;
    }
  }

  /**
   * Tier 2: Authentic Native English Dictionary / Google TTS Audio Stream (US type=2 / UK type=1)
   */
  private playOnlineNativeEnglishStream(
    cleanText: string,
    profile: CharacterVoiceProfile,
    rate: number,
    speechId: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        if (this.currentSpeechId !== speechId) return resolve(false);

        const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&le=eng&type=${profile.youdaoType}`;
        const cacheKey = `${profile.youdaoType}:${cleanText}`;

        let audio = this.audioCache.get(cacheKey);
        if (!audio) {
          audio = new Audio(url);
          audio.preload = 'auto';
          this.audioCache.set(cacheKey, audio);
        } else {
          audio.pause();
          audio.currentTime = 0;
        }

        this.activeAudio = audio;
        if ('preservesPitch' in audio) (audio as any).preservesPitch = true;
        audio.defaultPlaybackRate = rate;
        audio.playbackRate = rate;
        audio.volume = 0.95;

        audio.onended = () => {
          if (this.activeAudio === audio) this.activeAudio = null;
          resolve(true);
        };

        audio.onerror = () => {
          if (this.currentSpeechId !== speechId) return resolve(false);
          const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${profile.lang}&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
          const fbAudio = new Audio(fallbackUrl);
          this.activeAudio = fbAudio;
          fbAudio.playbackRate = rate;
          fbAudio.volume = 0.95;
          fbAudio.onended = () => {
            if (this.activeAudio === fbAudio) this.activeAudio = null;
            resolve(true);
          };
          fbAudio.onerror = () => resolve(false);
          fbAudio.play().catch(() => resolve(false));
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => resolve(false));
        }
      } catch {
        resolve(false);
      }
    });
  }

  public async speakEnglish(
    text: string,
    speakerOrVoiceId?: string,
    customRate?: number,
    onEnd?: () => void
  ): Promise<void> {
    if (!this.isEnabled || !text || typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = cleanEnglishForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    this.stopSpeech();
    const speechId = this.currentSpeechId;
    const profile = this.getCharacterProfile(speakerOrVoiceId);
    const effectiveRate = customRate ?? profile.rate;

    // 1. Try Neural English Voice (Emily US, Oliver UK, Sophia UK, Liam US, Chloe AU)
    const playedNeural = await this.playNeuralEnglishVoice(
      cleanText,
      profile,
      effectiveRate,
      speechId
    );
    if (this.currentSpeechId !== speechId) return;
    if (playedNeural) {
      if (onEnd) onEnd();
      return;
    }

    // 2. Try Online Native English Audio Stream (Youdao Native US/UK + Google en-US/en-GB)
    const playedOnline = await this.playOnlineNativeEnglishStream(
      cleanText,
      profile,
      effectiveRate,
      speechId
    );
    if (this.currentSpeechId !== speechId) return;
    if (playedOnline) {
      if (onEnd) onEnd();
      return;
    }

    // 3. Offline Fallback: ONLY if a genuine native English voice (never Spanish) exists on the OS
    const strictEnglishVoice = this.getStrictNativeEnglishVoice(profile);
    if (strictEnglishVoice && 'speechSynthesis' in window) {
      await new Promise<void>((resolve) => {
        try {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.voice = strictEnglishVoice;
          utterance.lang = strictEnglishVoice.lang || profile.lang;
          utterance.pitch = profile.pitch;
          utterance.rate = effectiveRate;
          utterance.onend = () => resolve();
          utterance.onerror = () => resolve();
          window.speechSynthesis.speak(utterance);
        } catch {
          resolve();
        }
      });
    }

    if (onEnd) onEnd();
  }
}

export const sound = new SoundService();
