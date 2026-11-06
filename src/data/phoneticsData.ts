export interface IpaPhonemeItem {
  id: string;
  symbol: string;
  category: 'short-vowels' | 'long-vowels' | 'diphthongs' | 'consonants';
  name: string;
  spanishTip: string;
  exampleWord: string;
  exampleIpa: string;
  exampleSpanish: string;
  minimalPair: {
    wordA: string;
    ipaA: string;
    meaningA: string;
    wordB: string;
    ipaB: string;
    meaningB: string;
  };
  commonSpellings: string[];
}

export const englishPhonemesList: IpaPhonemeItem[] = [
  // Short Vowels
  {
    id: 'ipa-1',
    symbol: '/ɪ/',
    category: 'short-vowels',
    name: 'Vocal I corta relajada (Kit vowel)',
    spanishTip: 'Más corta y relajada que la "i" española; entre "i" y "e". No sonrías al pronunciarla.',
    exampleWord: 'ship',
    exampleIpa: '/ʃɪp/',
    exampleSpanish: 'barco',
    minimalPair: {
      wordA: 'ship',
      ipaA: '/ʃɪp/',
      meaningA: 'barco (corta)',
      wordB: 'sheep',
      ipaB: '/ʃiːp/',
      meaningB: 'oveja (larga)'
    },
    commonSpellings: ['i (sit)', 'y (system)', 'ui (build)']
  },
  {
    id: 'ipa-2',
    symbol: '/e/',
    category: 'short-vowels',
    name: 'Vocal E media corta (Dress vowel)',
    spanishTip: 'Muy parecida a la "e" de "mesa" en español, con la mandíbula ligeramente relajada.',
    exampleWord: 'bed',
    exampleIpa: '/bed/',
    exampleSpanish: 'cama',
    minimalPair: {
      wordA: 'bed',
      ipaA: '/bed/',
      meaningA: 'cama',
      wordB: 'bad',
      ipaB: '/bæd/',
      meaningB: 'malo'
    },
    commonSpellings: ['e (went)', 'ea (bread)', 'a (many)']
  },
  {
    id: 'ipa-3',
    symbol: '/æ/',
    category: 'short-vowels',
    name: 'A abierta anterior (Trap vowel)',
    spanishTip: 'Abre la boca como para decir "a", pero coloca la lengua hacia adelante como para decir "e".',
    exampleWord: 'cat',
    exampleIpa: '/kæt/',
    exampleSpanish: 'gato',
    minimalPair: {
      wordA: 'cat',
      ipaA: '/kæt/',
      meaningA: 'gato',
      wordB: 'cut',
      ipaB: '/kʌt/',
      meaningB: 'cortar'
    },
    commonSpellings: ['a (cat, hand, plan, apple)']
  },
  {
    id: 'ipa-4',
    symbol: '/ʌ/',
    category: 'short-vowels',
    name: 'A central corta (Strut vowel)',
    spanishTip: 'Un sonido corto y seco desde el centro de la boca, sin abrir tanto los labios como en español.',
    exampleWord: 'cup',
    exampleIpa: '/kʌp/',
    exampleSpanish: 'taza',
    minimalPair: {
      wordA: 'cup',
      ipaA: '/kʌp/',
      meaningA: 'taza',
      wordB: 'cap',
      ipaB: '/kæp/',
      meaningB: 'gorra'
    },
    commonSpellings: ['u (sun)', 'o (love, money)', 'ou (country)']
  },
  {
    id: 'ipa-5',
    symbol: '/ʊ/',
    category: 'short-vowels',
    name: 'U corta relajada (Foot vowel)',
    spanishTip: 'Relaja los labios; suena entre una "u" muy breve y una "o" cerrada.',
    exampleWord: 'book',
    exampleIpa: '/bʊk/',
    exampleSpanish: 'libro',
    minimalPair: {
      wordA: 'full',
      ipaA: '/fʊl/',
      meaningA: 'lleno (corta)',
      wordB: 'fool',
      ipaB: '/fuːl/',
      meaningB: 'tonto (larga)'
    },
    commonSpellings: ['oo (good, look)', 'u (put, pull)', 'ou (could)']
  },
  {
    id: 'ipa-6',
    symbol: '/ə/',
    category: 'short-vowels',
    name: 'Schwa — Vocal neutra átona',
    spanishTip: 'El sonido más importante del inglés. Aparece en sílabas sin acento; relaja totalmente la boca.',
    exampleWord: 'teacher',
    exampleIpa: '/ˈtiː.tʃər/',
    exampleSpanish: 'profesor(a)',
    minimalPair: {
      wordA: 'about',
      ipaA: '/əˈbaʊt/',
      meaningA: 'acerca de',
      wordB: 'support',
      ipaB: '/səˈpɔːrt/',
      meaningB: 'apoyo'
    },
    commonSpellings: ['a (about)', 'e (taken)', 'i (pencil)', 'o (memory)', 'u (supply)']
  },
  // Long Vowels
  {
    id: 'ipa-7',
    symbol: '/iː/',
    category: 'long-vowels',
    name: 'I larga tensa (Fleece vowel)',
    spanishTip: 'Sostenla más tiempo que la "i" española y estira ligeramente las comisuras de los labios.',
    exampleWord: 'sheep',
    exampleIpa: '/ʃiːp/',
    exampleSpanish: 'oveja',
    minimalPair: {
      wordA: 'seat',
      ipaA: '/siːt/',
      meaningA: 'asiento',
      wordB: 'sit',
      ipaB: '/sɪt/',
      meaningB: 'sentarse'
    },
    commonSpellings: ['ee (see)', 'ea (team)', 'ie (believe)', 'e (me)']
  },
  {
    id: 'ipa-8',
    symbol: '/ɑː/',
    category: 'long-vowels',
    name: 'A larga posterior (Bath/Palm vowel)',
    spanishTip: 'Abre bien la garganta como cuando el médico revisa tu garganta ("aaah").',
    exampleWord: 'car',
    exampleIpa: '/kɑːr/',
    exampleSpanish: 'automóvil',
    minimalPair: {
      wordA: 'heart',
      ipaA: '/hɑːrt/',
      meaningA: 'corazón',
      wordB: 'hat',
      ipaB: '/hæt/',
      meaningB: 'sombrero'
    },
    commonSpellings: ['ar (start)', 'a (father, calm)']
  },
  {
    id: 'ipa-9',
    symbol: '/ɔː/',
    category: 'long-vowels',
    name: 'O larga redondeada (Thought vowel)',
    spanishTip: 'Redondea los labios y proyecta una "o" profunda y prolongada.',
    exampleWord: 'door',
    exampleIpa: '/dɔːr/',
    exampleSpanish: 'puerta',
    minimalPair: {
      wordA: 'port',
      ipaA: '/pɔːrt/',
      meaningA: 'puerto',
      wordB: 'pot',
      ipaB: '/pɒt/',
      meaningB: 'olla'
    },
    commonSpellings: ['or (fork)', 'aw (law)', 'au (author)', 'al (walk)']
  },
  {
    id: 'ipa-10',
    symbol: '/uː/',
    category: 'long-vowels',
    name: 'U larga tensa (Goose vowel)',
    spanishTip: 'Labios redondeados hacia adelante sosteniendo la vocal.',
    exampleWord: 'moon',
    exampleIpa: '/muːn/',
    exampleSpanish: 'luna',
    minimalPair: {
      wordA: 'pool',
      ipaA: '/puːl/',
      meaningA: 'piscina',
      wordB: 'pull',
      ipaB: '/pʊl/',
      meaningB: 'jalar'
    },
    commonSpellings: ['oo (food)', 'u (rule)', 'ew (new)', 'ue (blue)']
  },
  {
    id: 'ipa-11',
    symbol: '/ɜːr/',
    category: 'long-vowels',
    name: 'Vocal central R-coloreada (Nurse vowel)',
    spanishTip: 'Pronuncia una "e" neutra mientras curvas la punta de la lengua hacia atrás sin tocar el paladar.',
    exampleWord: 'bird',
    exampleIpa: '/bɜːrd/',
    exampleSpanish: 'pájaro',
    minimalPair: {
      wordA: 'work',
      ipaA: '/wɜːrk/',
      meaningA: 'trabajar',
      wordB: 'walk',
      ipaB: '/wɔːk/',
      meaningB: 'caminar'
    },
    commonSpellings: ['ir (girl)', 'ur (turn)', 'er (her)', 'or (word)', 'ear (learn)']
  },
  // Diphthongs
  {
    id: 'ipa-12',
    symbol: '/eɪ/',
    category: 'diphthongs',
    name: 'Diptongo EY (Face vowel)',
    spanishTip: 'Desliza suavemente de "e" hacia "i", como en la palabra española "ley".',
    exampleWord: 'make',
    exampleIpa: '/meɪk/',
    exampleSpanish: 'hacer / crear',
    minimalPair: {
      wordA: 'late',
      ipaA: '/leɪt/',
      meaningA: 'tarde',
      wordB: 'let',
      ipaB: '/let/',
      meaningB: 'permitir'
    },
    commonSpellings: ['a_e (late)', 'ai (rain)', 'ay (day)', 'ey (they)']
  },
  {
    id: 'ipa-13',
    symbol: '/aɪ/',
    category: 'diphthongs',
    name: 'Diptongo AY (Price vowel)',
    spanishTip: 'Desliza de "a" hacia "i", como en "aire".',
    exampleWord: 'time',
    exampleIpa: '/taɪm/',
    exampleSpanish: 'tiempo',
    minimalPair: {
      wordA: 'bite',
      ipaA: '/baɪt/',
      meaningA: 'morder',
      wordB: 'bit',
      ipaB: '/bɪt/',
      meaningB: 'poco / pedazo'
    },
    commonSpellings: ['i_e (fine)', 'igh (high)', 'y (fly)', 'ie (pie)']
  },
  {
    id: 'ipa-14',
    symbol: '/əʊ/',
    category: 'diphthongs',
    name: 'Diptongo OU (Goat vowel)',
    spanishTip: 'Empieza en el centro de la boca (/ə/ u /o/) y cierra hacia /ʊ/. Evita una "o" plana.',
    exampleWord: 'go',
    exampleIpa: '/ɡəʊ/',
    exampleSpanish: 'ir',
    minimalPair: {
      wordA: 'coat',
      ipaA: '/kəʊt/',
      meaningA: 'abrigo',
      wordB: 'caught',
      ipaB: '/kɔːt/',
      meaningB: 'atrapó'
    },
    commonSpellings: ['o (no)', 'oa (road)', 'ow (show)', 'o_e (home)']
  },
  {
    id: 'ipa-15',
    symbol: '/aʊ/',
    category: 'diphthongs',
    name: 'Diptongo AU (Mouth vowel)',
    spanishTip: 'Igual que "au" en "auto" o "pausa".',
    exampleWord: 'now',
    exampleIpa: '/naʊ/',
    exampleSpanish: 'ahora',
    minimalPair: {
      wordA: 'house',
      ipaA: '/haʊs/',
      meaningA: 'casa',
      wordB: 'horse',
      ipaB: '/hɔːrs/',
      meaningB: 'caballo'
    },
    commonSpellings: ['ou (house, sound)', 'ow (now, brown)']
  },
  {
    id: 'ipa-16',
    symbol: '/ɔɪ/',
    category: 'diphthongs',
    name: 'Diptongo OY (Choice vowel)',
    spanishTip: 'Desliza de "o" hacia "i", como en "hoy" o "soy".',
    exampleWord: 'voice',
    exampleIpa: '/vɔɪs/',
    exampleSpanish: 'voz',
    minimalPair: {
      wordA: 'boy',
      ipaA: '/bɔɪ/',
      meaningA: 'chico',
      wordB: 'buy',
      ipaB: '/baɪ/',
      meaningB: 'comprar'
    },
    commonSpellings: ['oi (coin, point)', 'oy (enjoy, toy)']
  },
  // Key Consonants
  {
    id: 'ipa-17',
    symbol: '/θ/',
    category: 'consonants',
    name: 'TH Sorda (Think / Bath)',
    spanishTip: 'Coloca la punta de la lengua suavemente entre los dientes y sopla aire sin vibrar las cuerdas vocales.',
    exampleWord: 'think',
    exampleIpa: '/θɪŋk/',
    exampleSpanish: 'pensar',
    minimalPair: {
      wordA: 'think',
      ipaA: '/θɪŋk/',
      meaningA: 'pensar',
      wordB: 'sink',
      ipaB: '/sɪŋk/',
      meaningB: 'hundirse / lavabo'
    },
    commonSpellings: ['th (think, thank, three,both)']
  },
  {
    id: 'ipa-18',
    symbol: '/ð/',
    category: 'consonants',
    name: 'TH Sonora (This / Mother)',
    spanishTip: 'Lengua entre los dientes haciendo vibrar la garganta (como la "d" suave de "dedo").',
    exampleWord: 'this',
    exampleIpa: '/ðɪs/',
    exampleSpanish: 'este / esto',
    minimalPair: {
      wordA: 'they',
      ipaA: '/ðeɪ/',
      meaningA: 'ellos',
      wordB: 'day',
      ipaB: '/deɪ/',
      meaningB: 'día'
    },
    commonSpellings: ['th (the, this, that, weather, brother)']
  },
  {
    id: 'ipa-19',
    symbol: '/ʃ/',
    category: 'consonants',
    name: 'SH Fricativa (She / Wash)',
    spanishTip: 'Como cuando pides silencio ("shhh"), sin golpe de lengua inicial.',
    exampleWord: 'she',
    exampleIpa: '/ʃiː/',
    exampleSpanish: 'ella',
    minimalPair: {
      wordA: 'share',
      ipaA: '/ʃer/',
      meaningA: 'compartir',
      wordB: 'chair',
      ipaB: '/tʃer/',
      meaningB: 'silla'
    },
    commonSpellings: ['sh (shop)', 'ti (nation)', 'ci (special)', 'ss (issue)']
  },
  {
    id: 'ipa-20',
    symbol: '/tʃ/',
    category: 'consonants',
    name: 'CH Africada (Chair / Watch)',
    spanishTip: 'Idéntica a la "ch" de "chocolate" en español, con explosión inicial.',
    exampleWord: 'check',
    exampleIpa: '/tʃek/',
    exampleSpanish: 'revisar / cheque',
    minimalPair: {
      wordA: 'watch',
      ipaA: '/wɒtʃ/',
      meaningA: 'reloj / mirar',
      wordB: 'wash',
      ipaB: '/wɒʃ/',
      meaningB: 'lavar'
    },
    commonSpellings: ['ch (choose)', 'tch (catch)', 'tu (future)']
  },
  {
    id: 'ipa-21',
    symbol: '/dʒ/',
    category: 'consonants',
    name: 'J / G Sonora (Job / Bridge)',
    spanishTip: 'Como "ch" pero haciendo vibrar intensamente las cuerdas vocales.',
    exampleWord: 'job',
    exampleIpa: '/dʒɒb/',
    exampleSpanish: 'trabajo',
    minimalPair: {
      wordA: 'jet',
      ipaA: '/dʒet/',
      meaningA: 'avión a reacción',
      wordB: 'yet',
      ipaB: '/jet/',
      meaningB: 'todavía / aún'
    },
    commonSpellings: ['j (July)', 'g (general)', 'dge (judge)']
  },
  {
    id: 'ipa-22',
    symbol: '/v/',
    category: 'consonants',
    name: 'V Labiodental Sonora (Very / Live)',
    spanishTip: 'En inglés "v" y "b" son distintas: para /v/ apoya los dientes superiores en el labio inferior y vibra.',
    exampleWord: 'very',
    exampleIpa: '/ˈver.i/',
    exampleSpanish: 'muy',
    minimalPair: {
      wordA: 'vest',
      ipaA: '/vest/',
      meaningA: 'chaleco',
      wordB: 'best',
      ipaB: '/best/',
      meaningB: 'el mejor'
    },
    commonSpellings: ['v (voice, travel, have)']
  },
  {
    id: 'ipa-23',
    symbol: '/ŋ/',
    category: 'consonants',
    name: 'NG Nasal Velar (Sing / Going)',
    spanishTip: 'Eleva la parte trasera de la lengua al velo del paladar; no pronuncies una "g" dura al final.',
    exampleWord: 'working',
    exampleIpa: '/ˈwɜːr.kɪŋ/',
    exampleSpanish: 'trabajando',
    minimalPair: {
      wordA: 'sing',
      ipaA: '/sɪŋ/',
      meaningA: 'cantar',
      wordB: 'sin',
      ipaB: '/sɪn/',
      meaningB: 'pecado'
    },
    commonSpellings: ['ng (song, morning)', 'nk (think, bank)']
  },
  {
    id: 'ipa-24',
    symbol: '/ɹ/',
    category: 'consonants',
    name: 'R Aproximante Inglesa (Right / Try)',
    spanishTip: 'Nunca vibra como la "rr" española: curva la punta de la lengua hacia arriba sin tocar el cielo de la boca.',
    exampleWord: 'ready',
    exampleIpa: '/ˈred.i/',
    exampleSpanish: 'listo',
    minimalPair: {
      wordA: 'right',
      ipaA: '/raɪt/',
      meaningA: 'correcto / derecha',
      wordB: 'light',
      ipaB: '/laɪt/',
      meaningB: 'luz / ligero'
    },
    commonSpellings: ['r (red)', 'rr (sorry)', 'wr (write)']
  }
];
