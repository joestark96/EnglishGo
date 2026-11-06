import { CEFRLevel } from '../types';

export type VocabPos =
  | 'verb-reg'
  | 'verb-irr'
  | 'noun'
  | 'adj'
  | 'phrasal-verb'
  | 'idiom'
  | 'connector';

export interface VocabWord {
  id: string;
  unit: number;
  cefr: CEFRLevel;
  english: string;
  ipa: string;
  spanish: string;
  pos: VocabPos;
  pastSimple?: string;
  pastParticiple?: string;
  gerund?: string;
  thirdPerson?: string;
  exampleEn: string;
  exampleEs: string;
}

export const englishVocabulary: VocabWord[] = [
  // Unit 1: Greetings & Personal Info (A1)
  {
    id: 'v1-1',
    unit: 1,
    cefr: 'A1',
    english: 'introduce',
    ipa: '/ˌɪn.trəˈdjuːs/',
    spanish: 'presentar (a alguien)',
    pos: 'verb-reg',
    pastSimple: 'introduced',
    pastParticiple: 'introduced',
    gerund: 'introducing',
    thirdPerson: 'introduces',
    exampleEn: 'Let me introduce myself to the team.',
    exampleEs: 'Permíteme presentarme ante el equipo.'
  },
  {
    id: 'v1-2',
    unit: 1,
    cefr: 'A1',
    english: 'meet',
    ipa: '/miːt/',
    spanish: 'conocer (por primera vez) / reunirse',
    pos: 'verb-irr',
    pastSimple: 'met',
    pastParticiple: 'met',
    gerund: 'meeting',
    thirdPerson: 'meets',
    exampleEn: 'It is a pleasure to meet you.',
    exampleEs: 'Es un placer conocerte.'
  },
  {
    id: 'v1-3',
    unit: 1,
    cefr: 'A1',
    english: 'neighborhood',
    ipa: '/ˈneɪ.bər.hʊd/',
    spanish: 'vecindario / barrio',
    pos: 'noun',
    exampleEn: 'We live in a very quiet neighborhood.',
    exampleEs: 'Vivimos en un barrio muy tranquilo.'
  },
  {
    id: 'v1-4',
    unit: 1,
    cefr: 'A1',
    english: 'friendly',
    ipa: '/ˈfrend.li/',
    spanish: 'amigable / simpático',
    pos: 'adj',
    exampleEn: 'Everyone at the university is super friendly.',
    exampleEs: 'Todos en la universidad son súper amigables.'
  },
  // Unit 2: Shopping & City (A1)
  {
    id: 'v2-1',
    unit: 2,
    cefr: 'A1',
    english: 'buy',
    ipa: '/baɪ/',
    spanish: 'comprar',
    pos: 'verb-irr',
    pastSimple: 'bought',
    pastParticiple: 'bought',
    gerund: 'buying',
    thirdPerson: 'buys',
    exampleEn: 'I want to buy a new jacket for winter.',
    exampleEs: 'Quiero comprar una chaqueta nueva para el invierno.'
  },
  {
    id: 'v2-2',
    unit: 2,
    cefr: 'A1',
    english: 'receipt',
    ipa: '/rɪˈsiːt/',
    spanish: 'recibo / ticket de compra (la "p" es muda)',
    pos: 'noun',
    exampleEn: 'Would you like your receipt in the bag?',
    exampleEs: '¿Le gustaría su recibo en la bolsa?'
  },
  {
    id: 'v2-3',
    unit: 2,
    cefr: 'A1',
    english: 'affordable',
    ipa: '/əˈfɔːr.də.bəl/',
    spanish: 'asequible / a buen precio',
    pos: 'adj',
    exampleEn: 'This café offers delicious and affordable meals.',
    exampleEs: 'Esta cafetería ofrece comidas deliciosas y a buen precio.'
  },
  // Unit 3: Daily Routines (A1)
  {
    id: 'v3-1',
    unit: 3,
    cefr: 'A1',
    english: 'wake up',
    ipa: '/weɪk ʌp/',
    spanish: 'despertarse',
    pos: 'verb-irr',
    pastSimple: 'woke up',
    pastParticiple: 'woken up',
    gerund: 'waking up',
    thirdPerson: 'wakes up',
    exampleEn: 'I usually wake up at six thirty on weekdays.',
    exampleEs: 'Usualmente me despierto a las seis y media entre semana.'
  },
  {
    id: 'v3-2',
    unit: 3,
    cefr: 'A1',
    english: 'commute',
    ipa: '/kəˈmjuːt/',
    spanish: 'viajar diariamente al trabajo/estudio',
    pos: 'verb-reg',
    pastSimple: 'commuted',
    pastParticiple: 'commuted',
    gerund: 'commuting',
    thirdPerson: 'commutes',
    exampleEn: 'She commutes to the city center by train.',
    exampleEs: 'Ella viaja al centro de la ciudad en tren.'
  },
  {
    id: 'v3-3',
    unit: 3,
    cefr: 'A1',
    english: 'schedule',
    ipa: '/ˈskedʒ.uːl/',
    spanish: 'horario / programar',
    pos: 'noun',
    exampleEn: 'My schedule is quite busy on Mondays.',
    exampleEs: 'Mi horario está bastante ocupado los lunes.'
  },
  // Unit 4: Home & Continuous Actions (A1)
  {
    id: 'v4-1',
    unit: 4,
    cefr: 'A1',
    english: 'prepare',
    ipa: '/prɪˈper/',
    spanish: 'preparar',
    pos: 'verb-reg',
    pastSimple: 'prepared',
    pastParticiple: 'prepared',
    gerund: 'preparing',
    thirdPerson: 'prepares',
    exampleEn: 'We are preparing dinner right now.',
    exampleEs: 'Estamos preparando la cena justo ahora.'
  },
  {
    id: 'v4-2',
    unit: 4,
    cefr: 'A1',
    english: 'cozy',
    ipa: '/ˈkəʊ.zi/',
    spanish: 'acogedor / cómodo',
    pos: 'adj',
    exampleEn: 'Their living room is warm and cozy.',
    exampleEs: 'Su sala de estar es cálida y acogedora.'
  },
  // Unit 5 & 6: Travel & Past Simple (A1-A2)
  {
    id: 'v5-1',
    unit: 5,
    cefr: 'A2',
    english: 'book',
    ipa: '/bʊk/',
    spanish: 'reservar (hotel, vuelo, mesa)',
    pos: 'verb-reg',
    pastSimple: 'booked',
    pastParticiple: 'booked',
    gerund: 'booking',
    thirdPerson: 'books',
    exampleEn: 'We booked our flights two months ago.',
    exampleEs: 'Reservamos nuestros vuelos hace dos meses.'
  },
  {
    id: 'v5-2',
    unit: 5,
    cefr: 'A2',
    english: 'luggage',
    ipa: '/ˈlʌɡ.ɪdʒ/',
    spanish: 'equipaje (incontable)',
    pos: 'noun',
    exampleEn: 'Where can we collect our luggage?',
    exampleEs: '¿Dónde podemos recoger nuestro equipaje?'
  },
  {
    id: 'v6-1',
    unit: 6,
    cefr: 'A2',
    english: 'forget',
    ipa: '/fərˈɡet/',
    spanish: 'olvidar',
    pos: 'verb-irr',
    pastSimple: 'forgot',
    pastParticiple: 'forgotten',
    gerund: 'forgetting',
    thirdPerson: 'forgets',
    exampleEn: 'I almost forgot my passport at home!',
    exampleEs: '¡Casi olvido mi pasaporte en casa!'
  },
  {
    id: 'v6-2',
    unit: 6,
    cefr: 'A2',
    english: 'choose',
    ipa: '/tʃuːz/',
    spanish: 'elegir / escoger',
    pos: 'verb-irr',
    pastSimple: 'chose',
    pastParticiple: 'chosen',
    gerund: 'choosing',
    thirdPerson: 'chooses',
    exampleEn: 'They chose the scenic route through the mountains.',
    exampleEs: 'Eligieron la ruta panorámica a través de las montañas.'
  },
  // Unit 7–12: A2 Core
  {
    id: 'v7-1',
    unit: 7,
    cefr: 'A2',
    english: 'achieve',
    ipa: '/əˈtʃiːv/',
    spanish: 'lograr / alcanzar una meta',
    pos: 'verb-reg',
    pastSimple: 'achieved',
    pastParticiple: 'achieved',
    gerund: 'achieving',
    thirdPerson: 'achieves',
    exampleEn: 'You will achieve fluent English with daily practice.',
    exampleEs: 'Lograrás un inglés fluido con práctica diaria.'
  },
  {
    id: 'v8-1',
    unit: 8,
    cefr: 'A2',
    english: 'reliable',
    ipa: '/rɪˈlaɪ.ə.bəl/',
    spanish: 'confiable / fiable',
    pos: 'adj',
    exampleEn: 'Trains are more reliable than buses in winter.',
    exampleEs: 'Los trenes son más confiables que los autobuses en invierno.'
  },
  {
    id: 'v9-1',
    unit: 9,
    cefr: 'A2',
    english: 'write',
    ipa: '/raɪt/',
    spanish: 'escribir',
    pos: 'verb-irr',
    pastSimple: 'wrote',
    pastParticiple: 'written',
    gerund: 'writing',
    thirdPerson: 'writes',
    exampleEn: 'She has written three technical articles this month.',
    exampleEs: 'Ella ha escrito tres artículos técnicos este mes.'
  },
  {
    id: 'v10-1',
    unit: 10,
    cefr: 'A2',
    english: 'mandatory',
    ipa: '/ˈmæn.də.tɔːr.i/',
    spanish: 'obligatorio',
    pos: 'adj',
    exampleEn: 'Wearing a seatbelt is mandatory for all passengers.',
    exampleEs: 'Usar el cinturón de seguridad es obligatorio para todos los pasajeros.'
  },
  {
    id: 'v11-1',
    unit: 11,
    cefr: 'A2',
    english: 'suddenly',
    ipa: '/ˈsʌd.ən.li/',
    spanish: 'de repente / repentinamente',
    pos: 'connector',
    exampleEn: 'I was walking home when suddenly it started to pour.',
    exampleEs: 'Estaba caminando a casa cuando de repente empezó a llover a cántaros.'
  },
  {
    id: 'v12-1',
    unit: 12,
    cefr: 'A2',
    english: 'unless',
    ipa: '/ənˈles/',
    spanish: 'a menos que',
    pos: 'connector',
    exampleEn: 'We will miss the train unless we leave right now.',
    exampleEs: 'Perderemos el tren a menos que salgamos ahora mismo.'
  },
  // Unit 13–17: B1 Intermediate
  {
    id: 'v13-1',
    unit: 13,
    cefr: 'B1',
    english: 'develop',
    ipa: '/dɪˈvel.əp/',
    spanish: 'desarrollar',
    pos: 'verb-reg',
    pastSimple: 'developed',
    pastParticiple: 'developed',
    gerund: 'developing',
    thirdPerson: 'develops',
    exampleEn: 'Our team has been developing this platform since January.',
    exampleEs: 'Nuestro equipo ha estado desarrollando esta plataforma desde enero.'
  },
  {
    id: 'v14-1',
    unit: 14,
    cefr: 'B1',
    english: 'overcome',
    ipa: '/ˌəʊ.vərˈkʌm/',
    spanish: 'superar (un obstáculo)',
    pos: 'verb-irr',
    pastSimple: 'overcame',
    pastParticiple: 'overcome',
    gerund: 'overcoming',
    thirdPerson: 'overcomes',
    exampleEn: 'She overcame her fear of speaking in public.',
    exampleEs: 'Ella superó su miedo a hablar en público.'
  },
  {
    id: 'v15-1',
    unit: 15,
    cefr: 'B1',
    english: 'build',
    ipa: '/bɪld/',
    spanish: 'construir',
    pos: 'verb-irr',
    pastSimple: 'built',
    pastParticiple: 'built',
    gerund: 'building',
    thirdPerson: 'builds',
    exampleEn: 'The bridge was built over a century ago.',
    exampleEs: 'El puente fue construido hace más de un siglo.'
  },
  {
    id: 'v16-1',
    unit: 16,
    cefr: 'B1',
    english: 'claim',
    ipa: '/kleɪm/',
    spanish: 'afirmar / reclamar',
    pos: 'verb-reg',
    pastSimple: 'claimed',
    pastParticiple: 'claimed',
    gerund: 'claiming',
    thirdPerson: 'claims',
    exampleEn: 'He claimed that he had already sent the documents.',
    exampleEs: 'Él afirmó que ya había enviado los documentos.'
  },
  {
    id: 'v17-1',
    unit: 17,
    cefr: 'B1',
    english: 'put off',
    ipa: '/pʊt ɒf/',
    spanish: 'posponer / aplazar',
    pos: 'phrasal-verb',
    exampleEn: 'Never put off until tomorrow what you can do today.',
    exampleEs: 'Nunca pospongas para mañana lo que puedes hacer hoy.'
  },
  {
    id: 'v17-2',
    unit: 17,
    cefr: 'B1',
    english: 'look forward to',
    ipa: '/lʊk ˈfɔːr.wərd tuː/',
    spanish: 'esperar con ilusión (+ verbo en -ing)',
    pos: 'phrasal-verb',
    exampleEn: 'I look forward to working with you on this project.',
    exampleEs: 'Espero con entusiasmo trabajar contigo en este proyecto.'
  },
  {
    id: 'v17-3',
    unit: 17,
    cefr: 'B1',
    english: 'run out of',
    ipa: '/rʌn aʊt ɒv/',
    spanish: 'quedarse sin / agotarse',
    pos: 'phrasal-verb',
    exampleEn: 'We ran out of coffee during the morning meeting.',
    exampleEs: 'Nos quedamos sin café durante la reunión matutina.'
  },
  // Unit 18–20: B2 Upper-Intermediate
  {
    id: 'v18-1',
    unit: 18,
    cefr: 'B2',
    english: 'hindsight',
    ipa: '/ˈhaɪnd.saɪt/',
    spanish: 'retrospectiva (ver las cosas después de que pasaron)',
    pos: 'noun',
    exampleEn: 'In hindsight, we should have backed up the database earlier.',
    exampleEs: 'En retrospectiva, deberíamos haber respaldado la base de datos antes.'
  },
  {
    id: 'v19-1',
    unit: 19,
    cefr: 'B2',
    english: 'thorough',
    ipa: '/ˈθʌr.ə/',
    spanish: 'minucioso / exhaustivo',
    pos: 'adj',
    exampleEn: 'The engineers conducted a thorough inspection of the system.',
    exampleEs: 'Los ingenieros realizaron una inspección exhaustiva del sistema.'
  },
  {
    id: 'v20-1',
    unit: 20,
    cefr: 'B2',
    english: 'nevertheless',
    ipa: '/ˌnev.ər.ðəˈles/',
    spanish: 'no obstante / sin embargo',
    pos: 'connector',
    exampleEn: 'The deadline was tight; nevertheless, we delivered on schedule.',
    exampleEs: 'El plazo era ajustado; no obstante, entregamos a tiempo.'
  },
  // Unit 21–23: C1 Mastery
  {
    id: 'v21-1',
    unit: 21,
    cefr: 'C1',
    english: 'compelling',
    ipa: '/kəmˈpel.ɪŋ/',
    spanish: 'convincente / fascinante',
    pos: 'adj',
    exampleEn: 'Seldom have I heard such a compelling argument.',
    exampleEs: 'Rara vez he escuchado un argumento tan convincente.'
  },
  {
    id: 'v22-1',
    unit: 22,
    cefr: 'C1',
    english: 'ubiquitous',
    ipa: '/juːˈbɪk.wɪ.təs/',
    spanish: 'omnipresente',
    pos: 'adj',
    exampleEn: 'Cloud computing has become ubiquitous in modern enterprises.',
    exampleEs: 'La computación en la nube se ha vuelto omnipresente en las empresas modernas.'
  },
  {
    id: 'v23-1',
    unit: 23,
    cefr: 'C1',
    english: 'cut corners',
    ipa: '/kʌt ˈkɔːr.nərz/',
    spanish: 'escatimar esfuerzos o dinero sacrificando calidad',
    pos: 'idiom',
    exampleEn: 'When it comes to security, we never cut corners.',
    exampleEs: 'Cuando se trata de seguridad, nunca escatimamos en calidad.'
  },
  {
    id: 'v23-2',
    unit: 23,
    cefr: 'C1',
    english: 'bite the bullet',
    ipa: '/baɪt ðə ˈbʊl.ɪt/',
    spanish: 'afrontar una situación difícil con determinación',
    pos: 'idiom',
    exampleEn: 'We had to bite the bullet and rewrite the legacy module.',
    exampleEs: 'Tuvimos que hacer de tripas corazón y reescribir el módulo heredado.'
  }
];
