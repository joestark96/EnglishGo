export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type ExerciseType =
  | 'multiple_choice'
  | 'order_sentence'
  | 'listen_write'
  | 'match_pairs';

export interface MatchPair {
  id: string;
  en: string;
  es: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  promptEs: string;
  englishAudioText?: string;
  // For multiple_choice
  questionEn?: string;
  options?: string[];
  correctAnswer?: string;
  // For order_sentence
  wordsBank?: string[];
  targetSentence?: string;
  // For listen_write
  expectedTranscript?: string;
  hintEs?: string;
  // For match_pairs
  pairs?: MatchPair[];
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  level: CefrLevel;
  xpReward: number;
  iconName: string;
  category: string;
  exercises: Exercise[];
}

export interface FlashcardItem {
  id: string;
  en: string;
  es: string;
  ipa: string;
  exampleEn: string;
  exampleEs: string;
  level: CefrLevel;
  category: string;
}

export interface DialogueTurn {
  speaker: 'tutor' | 'user';
  speakerName: string;
  en: string;
  es: string;
  phoneticHint?: string;
  alternatives?: string[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  level: CefrLevel;
  setting: string;
  xpReward: number;
  turns: DialogueTurn[];
}

export const CEFR_LEVEL_INFO: Record<
  CefrLevel,
  { name: string; minXp: number; color: string; description: string }
> = {
  A1: {
    name: 'Principiante (A1)',
    minXp: 0,
    color: '#10b981',
    description: 'Frases cotidianas, saludos y vocabulario esencial de supervivencia.'
  },
  A2: {
    name: 'Elemental (A2)',
    minXp: 200,
    color: '#06b6d4',
    description: 'Viajes, compras, pasado simple y descripciones del entorno.'
  },
  B1: {
    name: 'Intermedio (B1)',
    minXp: 500,
    color: '#6366f1',
    description: 'Experiencias, opiniones, trabajo y situaciones imprevistas en viajes.'
  },
  B2: {
    name: 'Intermedio Alto (B2)',
    minXp: 900,
    color: '#8b5cf6',
    description: 'Argumentación fluida, phrasal verbs avanzados y contextos profesionales.'
  },
  C1: {
    name: 'Avanzado (C1)',
    minXp: 1500,
    color: '#ec4899',
    description: 'Expresiones idiomáticas, matices implícitos e inglés académico/ejecutivo.'
  }
};

export const LESSONS_DATA: Lesson[] = [
  {
    id: 'lesson-a1-greetings',
    title: 'Saludos y Presentaciones',
    subtitle: 'Presentarse, preguntar el origen y despedirse con naturalidad',
    level: 'A1',
    xpReward: 50,
    iconName: 'hand-left-outline',
    category: 'Fundamentos',
    exercises: [
      {
        id: 'ex-a1-1',
        type: 'multiple_choice',
        promptEs: 'Selecciona la respuesta más natural para: "Nice to meet you!"',
        questionEn: 'Hi, I am Sarah from London. Nice to meet you!',
        englishAudioText: 'Hi, I am Sarah from London. Nice to meet you!',
        options: [
          'Nice to meet you too!',
          'I have twenty years.',
          'Yes, please thank you.',
          'Where is the station?'
        ],
        correctAnswer: 'Nice to meet you too!',
        explanation: 'Para responder a "Nice to meet you" (Mucho gusto), se añade "too" al final ("Igualmente").'
      },
      {
        id: 'ex-a1-2',
        type: 'order_sentence',
        promptEs: 'Ordena la oración: "¿De dónde eres?"',
        englishAudioText: 'Where are you from?',
        wordsBank: ['from', 'Where', 'you', 'are', 'doing'],
        targetSentence: 'Where are you from',
        explanation: 'En preguntas con "Where" + verbo to be, el orden es: Where + are + sujeto + from.'
      },
      {
        id: 'ex-a1-3',
        type: 'listen_write',
        promptEs: 'Escucha el audio y escribe la frase en inglés',
        englishAudioText: 'I work as a software developer',
        expectedTranscript: 'I work as a software developer',
        hintEs: 'Traducción: Trabajo como desarrollador de software (Usa "work as a...")',
        explanation: 'Usamos "work as a + profesión" para indicar nuestra ocupación.'
      },
      {
        id: 'ex-a1-4',
        type: 'match_pairs',
        promptEs: 'Empareja cada expresión en inglés con su significado en español',
        pairs: [
          { id: 'p1', en: 'Good morning', es: 'Buenos días' },
          { id: 'p2', en: 'See you later', es: 'Nos vemos luego' },
          { id: 'p3', en: 'How is it going?', es: '¿Cómo te va?' },
          { id: 'p4', en: 'Have a nice day', es: 'Que tengas un buen día' }
        ],
        explanation: 'Estas cuatro expresiones cubren el 80% de los saludos y despedidas cotidianas.'
      }
    ]
  },
  {
    id: 'lesson-a2-travel',
    title: 'Viajes, Aeropuerto y Hotel',
    subtitle: 'Check-in, pedir direcciones y resolver dudas de equipaje',
    level: 'A2',
    xpReward: 65,
    iconName: 'airplane-outline',
    category: 'Viajes',
    exercises: [
      {
        id: 'ex-a2-1',
        type: 'multiple_choice',
        promptEs: 'Completa la pregunta en el mostrador del aeropuerto:',
        questionEn: 'Could I have a ___ seat, please? I love looking at the clouds.',
        englishAudioText: 'Could I have a window seat, please? I love looking at the clouds.',
        options: ['window', 'aisle', 'gate', 'luggage'],
        correctAnswer: 'window',
        explanation: '"Window seat" es asiento de ventanilla; "aisle seat" es asiento de pasillo.'
      },
      {
        id: 'ex-a2-2',
        type: 'order_sentence',
        promptEs: 'Ordena la pregunta: "¿A qué hora sale nuestro vuelo?"',
        englishAudioText: 'What time does our flight leave?',
        wordsBank: ['flight', 'What', 'does', 'time', 'our', 'leave', 'leaving'],
        targetSentence: 'What time does our flight leave',
        explanation: 'En presente simple para horarios usamos el auxiliar "does" seguido del verbo en forma base "leave".'
      },
      {
        id: 'ex-a2-3',
        type: 'listen_write',
        promptEs: 'Escucha y escribe lo que dice el recepcionista del hotel',
        englishAudioText: 'Breakfast is included from seven to ten',
        expectedTranscript: 'Breakfast is included from seven to ten',
        hintEs: 'El desayuno está incluido de siete a diez',
        explanation: '"Included" (/ɪnˈkluːdɪd/) significa incluido en la tarifa.'
      },
      {
        id: 'ex-a2-4',
        type: 'match_pairs',
        promptEs: 'Une el vocabulario de aeropuerto con su traducción',
        pairs: [
          { id: 'p1', en: 'Boarding pass', es: 'Pase de abordar' },
          { id: 'p2', en: 'Carry-on bag', es: 'Equipaje de mano' },
          { id: 'p3', en: 'Delayed flight', es: 'Vuelo retrasado' },
          { id: 'p4', en: 'Customs', es: 'Aduana' }
        ],
        explanation: 'Vocabulario clave para moverse por cualquier terminal internacional.'
      }
    ]
  },
  {
    id: 'lesson-b1-work',
    title: 'Inglés para el Trabajo y Reuniones',
    subtitle: 'Dar opiniones, expresar acuerdo y hablar de proyectos',
    level: 'B1',
    xpReward: 80,
    iconName: 'briefcase-outline',
    category: 'Profesional',
    exercises: [
      {
        id: 'ex-b1-1',
        type: 'multiple_choice',
        promptEs: '¿Qué expresión significa "posponer una reunión"?',
        questionEn: 'We need to ___ the meeting until Friday because the client is travelling.',
        englishAudioText: 'We need to put off the meeting until Friday because the client is travelling.',
        options: ['put off', 'call off', 'look after', 'run out of'],
        correctAnswer: 'put off',
        explanation: '"Put off" significa posponer (postpone), mientras que "call off" significa cancelar.'
      },
      {
        id: 'ex-b1-2',
        type: 'order_sentence',
        promptEs: 'Ordena la frase: "Hemos estado trabajando en esta función desde el lunes"',
        englishAudioText: 'We have been working on this feature since Monday',
        wordsBank: ['working', 'We', 'been', 'have', 'on', 'this', 'feature', 'since', 'Monday'],
        targetSentence: 'We have been working on this feature since Monday',
        explanation: 'El Present Perfect Continuous (have been + -ing) expresa una acción que inició en el pasado y continúa ahora.'
      },
      {
        id: 'ex-b1-3',
        type: 'listen_write',
        promptEs: 'Escucha y escribe la frase de cierre de reunión',
        englishAudioText: 'Let us wrap up the meeting for today',
        expectedTranscript: 'Let us wrap up the meeting for today',
        hintEs: 'Concluyamos / cerremos la reunión por hoy ("wrap up")',
        explanation: '"Wrap up" es muy común en entornos laborales para decir finalizar o resumir una junta.'
      },
      {
        id: 'ex-b1-4',
        type: 'match_pairs',
        promptEs: 'Relaciona las expresiones de negocios',
        pairs: [
          { id: 'p1', en: 'Meet the deadline', es: 'Cumplir el plazo' },
          { id: 'p2', en: 'Get the ball rolling', es: 'Poner manos a la obra / empezar' },
          { id: 'p3', en: 'On the same page', es: 'De acuerdo / en sintonía' },
          { id: 'p4', en: 'Keep me in the loop', es: 'Mantenerme informado' }
        ],
        explanation: 'Modismos esenciales en correos y llamadas en inglés.'
      }
    ]
  },
  {
    id: 'lesson-b2-conditionals',
    title: 'Hipótesis, Negociación y Matices',
    subtitle: 'Condicionales mixtos, conectores de contraste y persuasión',
    level: 'B2',
    xpReward: 100,
    iconName: 'bulb-outline',
    category: 'Gramática Avanzada',
    exercises: [
      {
        id: 'ex-b2-1',
        type: 'multiple_choice',
        promptEs: 'Elige la opción correcta para un tercer condicional (pasado irreal):',
        questionEn: 'If we ___ earlier, we would not have missed the connection.',
        englishAudioText: 'If we had left earlier, we would not have missed the connection.',
        options: ['had left', 'would leave', 'have left', 'left'],
        correctAnswer: 'had left',
        explanation: 'El Third Conditional usa "If + Past Perfect (had + participio)" y "would have + participio".'
      },
      {
        id: 'ex-b2-2',
        type: 'order_sentence',
        promptEs: 'Ordena: "A pesar de la fuerte lluvia, el evento fue un éxito"',
        englishAudioText: 'Despite the heavy rain the event was a success',
        wordsBank: ['the', 'Despite', 'heavy', 'rain', 'event', 'was', 'a', 'success'],
        targetSentence: 'Despite the heavy rain the event was a success',
        explanation: '"Despite" va seguido directamente de un sustantivo o gerundio (sin "of").'
      },
      {
        id: 'ex-b2-3',
        type: 'listen_write',
        promptEs: 'Escucha y transcribe esta oración formal',
        englishAudioText: 'I would appreciate it if you could send the report',
        expectedTranscript: 'I would appreciate it if you could send the report',
        hintEs: 'Agradecería si pudieras enviar el informe',
        explanation: 'En inglés siempre se incluye el pronombre "it" en "I would appreciate it if...".'
      },
      {
        id: 'ex-b2-4',
        type: 'match_pairs',
        promptEs: 'Empareja cada conector avanzado con su equivalente',
        pairs: [
          { id: 'p1', en: 'Nevertheless', es: 'No obstante / sin embargo' },
          { id: 'p2', en: 'Furthermore', es: 'Además / es más' },
          { id: 'p3', en: 'Provided that', es: 'Siempre y cuando' },
          { id: 'p4', en: 'Regardless of', es: 'Sin importar / independientemente de' }
        ],
        explanation: 'Estos conectores elevan tus ensayos y presentaciones a nivel B2/C1.'
      }
    ]
  },
  {
    id: 'lesson-c1-idioms',
    title: 'Inversión Estilística y Modismos C1',
    subtitle: 'Énfasis retórico, sutileza diplomática y vocabulario ejecutivo',
    level: 'C1',
    xpReward: 120,
    iconName: 'ribbon-outline',
    category: 'Maestría',
    exercises: [
      {
        id: 'ex-c1-1',
        type: 'multiple_choice',
        promptEs: 'Selecciona la estructura con inversión negativa correcta:',
        questionEn: 'Rarely ___ such a compelling technological breakthrough.',
        englishAudioText: 'Rarely have we witnessed such a compelling technological breakthrough.',
        options: [
          'have we witnessed',
          'we have witnessed',
          'did we witnessed',
          'we had witness'
        ],
        correctAnswer: 'have we witnessed',
        explanation: 'Cuando una oración empieza con un adverbio negativo/restrictivo ("Rarely", "Seldom", "Never"), se invierte el auxiliar y el sujeto.'
      },
      {
        id: 'ex-c1-2',
        type: 'order_sentence',
        promptEs: 'Ordena la inversión: "No solo redujo costos, sino que también mejoró la calidad"',
        englishAudioText: 'Not only did it reduce costs but it also improved quality',
        wordsBank: ['only', 'Not', 'did', 'it', 'reduce', 'costs', 'but', 'it', 'also', 'improved', 'quality'],
        targetSentence: 'Not only did it reduce costs but it also improved quality',
        explanation: '"Not only + auxiliar (did) + sujeto + verbo base" aporta énfasis de nivel C1.'
      },
      {
        id: 'ex-c1-3',
        type: 'listen_write',
        promptEs: 'Escucha y escribe la oración completa',
        englishAudioText: 'We need to address the elephant in the room',
        expectedTranscript: 'We need to address the elephant in the room',
        hintEs: 'Debemos abordar el problema evidente del que nadie quiere hablar',
        explanation: '"Address the elephant in the room" significa hablar abiertamente de un tema delicado pero obvio.'
      },
      {
        id: 'ex-c1-4',
        type: 'match_pairs',
        promptEs: 'Empareja los modismos avanzados con su significado',
        pairs: [
          { id: 'p1', en: 'Cut corners', es: 'Ahorrar esfuerzo o dinero sacrificando calidad' },
          { id: 'p2', en: 'Play devil’s advocate', es: 'Llevar la contraria para probar un argumento' },
          { id: 'p3', en: 'Bite the bullet', es: 'Afrontar una situación difícil con valentía' },
          { id: 'p4', en: 'Read between the lines', es: 'Captar el significado implícito' }
        ],
        explanation: 'Expresiones idiomáticas frecuentes en liderazgo, debates y literatura.'
      }
    ]
  }
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    en: 'Nevertheless',
    es: 'Sin embargo / No obstante',
    ipa: '/ˌnev.ə.ðəˈles/',
    exampleEn: 'The project was complex; nevertheless, the team delivered on time.',
    exampleEs: 'El proyecto era complejo; no obstante, el equipo entregó a tiempo.',
    level: 'B2',
    category: 'Conectores'
  },
  {
    id: 'fc-2',
    en: 'Look forward to',
    es: 'Esperar con ilusión / Tener muchas ganas de',
    ipa: '/lʊk ˈfɔː.wəd tuː/',
    exampleEn: 'I look forward to hearing from you soon.',
    exampleEs: 'Espero con gusto tener noticias tuyas pronto.',
    level: 'B1',
    category: 'Phrasal Verbs'
  },
  {
    id: 'fc-3',
    en: 'Reliable',
    es: 'Confiable / Fiable',
    ipa: '/rɪˈlaɪ.ə.bəl/',
    exampleEn: 'We need a reliable data connection for the presentation.',
    exampleEs: 'Necesitamos una conexión de datos confiable para la presentación.',
    level: 'B1',
    category: 'Trabajo'
  },
  {
    id: 'fc-4',
    en: 'Accommodate',
    es: 'Alojar / Adaptarse a las necesidades de',
    ipa: '/əˈkɒm.ə.deɪt/',
    exampleEn: 'The conference hall can accommodate up to five hundred guests.',
    exampleEs: 'La sala de conferencias puede alojar hasta quinientos invitados.',
    level: 'B2',
    category: 'Viajes y Negocios'
  },
  {
    id: 'fc-5',
    en: 'Straightforward',
    es: 'Sencillo / Directo / Sin complicaciones',
    ipa: '/ˌstreɪtˈfɔː.wəd/',
    exampleEn: 'Setting up the local environment is quite straightforward.',
    exampleEs: 'Configurar el entorno local es bastante sencillo.',
    level: 'B2',
    category: 'Cotidiano'
  },
  {
    id: 'fc-6',
    en: 'Schedule',
    es: 'Horario / Programar / Agendar',
    ipa: '/ˈskedʒ.uːl/',
    exampleEn: 'Let us schedule a quick call for tomorrow morning.',
    exampleEs: 'Agendemos una llamada rápida para mañana por la mañana.',
    level: 'A2',
    category: 'Trabajo'
  },
  {
    id: 'fc-7',
    en: 'Ubiquitous',
    es: 'Omnipresente / Que está en todas partes',
    ipa: '/juːˈbɪk.wɪ.təs/',
    exampleEn: 'Smartphones have become ubiquitous in modern society.',
    exampleEs: 'Los teléfonos inteligentes se han vuelto omnipresentes en la sociedad moderna.',
    level: 'C1',
    category: 'Académico'
  },
  {
    id: 'fc-8',
    en: 'Could you repeat that, please?',
    es: '¿Podrías repetir eso, por favor?',
    ipa: '/kʊd ju rɪˈpiːt ðæt pliːz/',
    exampleEn: 'Sorry, the line was noisy. Could you repeat that, please?',
    exampleEs: 'Disculpa, había ruido en la línea. ¿Podrías repetir eso, por favor?',
    level: 'A1',
    category: 'Conversación'
  }
];

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'conv-coffee',
    title: 'Pedir en una Cafetería en Nueva York',
    description: 'Practica cómo pedir una bebida, elegir el tamaño y pagar con tarjeta.',
    level: 'A1',
    setting: 'Bean & Leaf Café, Manhattan',
    xpReward: 60,
    turns: [
      {
        speaker: 'tutor',
        speakerName: 'Barista (Liam)',
        en: 'Good morning! Welcome to Bean and Leaf. What can I get started for you today?',
        es: '¡Buenos días! Bienvenido a Bean and Leaf. ¿Qué te puedo ir preparando hoy?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'Hi! Could I have a medium iced latte with oat milk, please?',
        es: '¡Hola! ¿Me podrías dar un latte frío mediano con leche de avena, por favor?',
        phoneticHint: 'kʊd aɪ hæv ə ˈmiːdiəm aɪst ˈlɑːteɪ wɪð oʊt mɪlk pliːz',
        alternatives: [
          'Can I get a medium iced latte please',
          'I would like a medium iced latte with oat milk'
        ]
      },
      {
        speaker: 'tutor',
        speakerName: 'Barista (Liam)',
        en: 'Sure thing! Would you like anything to eat with that, maybe a croissant or a muffin?',
        es: '¡Claro que sí! ¿Te gustaría algo de comer para acompañar, tal vez un croissant o un muffin?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'No thank you, just the coffee for now. Can I pay by card?',
        es: 'No, gracias, solo el café por ahora. ¿Puedo pagar con tarjeta?',
        phoneticHint: 'noʊ θæŋk ju dʒʌst ðə ˈkɔːfi fɔːr naʊ kæn aɪ peɪ baɪ kɑːrd',
        alternatives: ['Just the coffee thanks can I pay by card']
      }
    ]
  },
  {
    id: 'conv-interview',
    title: 'Entrevista de Trabajo Remoto',
    description: 'Responde sobre tu experiencia, fortalezas y trabajo en equipo.',
    level: 'B1',
    setting: 'Videollamada con TechGlobal Inc.',
    xpReward: 90,
    turns: [
      {
        speaker: 'tutor',
        speakerName: 'Recruiter (Elena)',
        en: 'Thanks for joining the call today! To start off, could you tell me a bit about your current role?',
        es: '¡Gracias por unirte a la llamada hoy! Para empezar, ¿podrías contarme un poco sobre tu puesto actual?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'I have been building mobile and web applications for the past three years.',
        es: 'He estado desarrollando aplicaciones móviles y web durante los últimos tres años.',
        phoneticHint: 'aɪ hæv bɪn ˈbɪldɪŋ ˈmoʊbəl ænd web ˌæplɪˈkeɪʃənz',
        alternatives: ['I work building mobile and web applications']
      },
      {
        speaker: 'tutor',
        speakerName: 'Recruiter (Elena)',
        en: 'That sounds great! How do you usually handle tight deadlines when priorities change?',
        es: '¡Suena excelente! ¿Cómo sueles manejar plazos ajustados cuando cambian las prioridades?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'I prioritize the most critical tasks and communicate clearly with my team.',
        es: 'Priorizo las tareas más críticas y me comunico con claridad con mi equipo.',
        phoneticHint: 'aɪ praɪˈɔːrətaɪz ðə moʊst ˈkrɪtɪkəl tæsks',
        alternatives: ['I organize the tasks and talk with my team']
      }
    ]
  },
  {
    id: 'conv-airport',
    title: 'Control de Inmigración y Vuelo de Conexión',
    description: 'Explica el motivo de tu viaje, duración de tu estancia y resuelve dudas en el aeropuerto.',
    level: 'A2',
    setting: 'London Heathrow Airport — Terminal 5',
    xpReward: 75,
    turns: [
      {
        speaker: 'tutor',
        speakerName: 'Officer (Hannah)',
        en: 'Good afternoon. May I see your passport and boarding pass? What is the purpose of your visit?',
        es: 'Buenas tardes. ¿Puedo ver su pasaporte y pase de abordar? ¿Cuál es el motivo de su visita?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'Here you go. I am visiting for tourism and I will stay for ten days.',
        es: 'Aquí tiene. Vengo de turismo y me quedaré por diez días.',
        phoneticHint: 'hɪr ju ɡoʊ aɪ æm ˈvɪzɪtɪŋ fɔːr ˈtʊrɪzəm',
        alternatives: ['I am here on vacation for ten days']
      },
      {
        speaker: 'tutor',
        speakerName: 'Officer (Hannah)',
        en: 'Where will you be staying during your trip in the United Kingdom?',
        es: '¿Dónde se hospedará durante su viaje en el Reino Unido?'
      },
      {
        speaker: 'user',
        speakerName: 'Tú',
        en: 'I have a reservation at a hotel in central London.',
        es: 'Tengo una reservación en un hotel en el centro de Londres.',
        phoneticHint: 'aɪ hæv ə ˌrezərˈveɪʃən æt ə hoʊˈtel ɪn ˈsentrəl ˈlʌndən',
        alternatives: ['I am staying at a hotel in central London']
      }
    ]
  }
];
