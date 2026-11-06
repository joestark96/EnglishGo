import { Unit, LessonNode, Exercise, CourseStage, CEFRLevel, DialogueLine, MatchPair } from '../types';

interface UnitBlueprint {
  id: number;
  stage: CourseStage;
  cefrLevel: CEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  dialogueTitle: string;
  dialogueContext: string;
  dialogueLines: DialogueLine[];
  vocabPairs: MatchPair[];
  grammarTopics: {
    title: string;
    englishTitle: string;
    description: string;
    icon: string;
    color: 'green' | 'blue' | 'orange' | 'purple' | 'red';
    mcQuestion: string;
    mcVoice: string;
    mcCorrect: string;
    mcDistractors: [string, string, string];
    mcExplanation: string;
    wordOrderPrompt: string;
    wordOrderTarget: string[];
    wordOrderDistractors: string[];
    wordOrderExplanation: string;
    pairItems: [MatchPair, MatchPair, MatchPair, MatchPair];
  }[];
  readingPassage: {
    title: string;
    englishText: string;
    spanishSummary: string;
    question: string;
    correctAnswer: string;
    distractors: [string, string, string];
    explanation: string;
  };
}

const UNIT_BLUEPRINTS: UnitBlueprint[] = [
  // ==========================================
  // UNIDAD 0: FONÉTICA & SONIDOS IPA (12 Nodos)
  // ==========================================
  {
    id: 0,
    stage: 'Fonética & IPA',
    cefrLevel: 'A1',
    title: 'Unidad 0: Fonética IPA y los 44 Sonidos',
    subtitle: 'Vocales Cortas y Largas, Schwa /ə/, Diptongos y Consonantes Clave',
    description: 'Domina cada sonido del inglés hablado, los pares mínimos y el ritmo natural antes de avanzar.',
    themeColor: '#58cc02',
    dialogueTitle: 'En el Laboratorio de Fonética (Phonetics Lab)',
    dialogueContext: 'La profesora Sophia le muestra a Liam cómo el sonido Schwa y las vocales largas cambian el significado.',
    dialogueLines: [
      {
        speaker: 'Prof. Sophia',
        english: 'Welcome to the phonetics lab! Today we are practicing minimal pairs.',
        ipa: '/ˈwelkəm tə ðə fəˈnetɪks læb təˈdeɪ wi ɑːr ˈpræktɪsɪŋ ˈmɪnɪməl perz/',
        spanish: '¡Bienvenido al laboratorio de fonética! Hoy practicaremos pares mínimos.',
        audioText: 'Welcome to the phonetics lab! Today we are practicing minimal pairs.'
      },
      {
        speaker: 'Liam',
        english: 'Awesome! I still confuse the short vowel in ship with the long vowel in sheep.',
        ipa: '/ˈɔːsəm aɪ stɪl kənˈfjuːz ðə ʃɔːrt ˈvaʊəl ɪn ʃɪp wɪð ðə lɒŋ ˈvaʊəl ɪn ʃiːp/',
        spanish: '¡Genial! Todavía confundo la vocal corta de "ship" (barco) con la larga de "sheep" (oveja).',
        audioText: 'Awesome! I still confuse the short vowel in ship with the long vowel in sheep.'
      },
      {
        speaker: 'Prof. Sophia',
        english: 'Relax your jaw for ship, and stretch a gentle smile for sheep.',
        ipa: '/rɪˈlæks jʊr dʒɔː fɔːr ʃɪp ænd stretʃ ə ˈdʒentəl smaɪl fɔːr ʃiːp/',
        spanish: 'Relaja la mandíbula para "ship" y estira una sonrisa suave para "sheep".',
        audioText: 'Relax your jaw for ship, and stretch a gentle smile for sheep.'
      },
      {
        speaker: 'Liam',
        english: 'Got it! And what about the schwa sound in unstressed syllables?',
        ipa: '/ɡɒt ɪt ænd wɒt əˈbaʊt ðə ʃwɑː saʊnd ɪn ʌnˈstrest ˈsɪləbəlz/',
        spanish: '¡Entendido! ¿Y qué hay del sonido schwa en las sílabas sin acento?',
        audioText: 'Got it! And what about the schwa sound in unstressed syllables?'
      }
    ],
    vocabPairs: [
      { id: 'u0-vp1', left: 'Ship /ʃɪp/', leftSub: 'Vocal corta /ɪ/', right: 'Barco' },
      { id: 'u0-vp2', left: 'Sheep /ʃiːp/', leftSub: 'Vocal larga /iː/', right: 'Oveja' },
      { id: 'u0-vp3', left: 'Think /θɪŋk/', leftSub: 'TH sorda /θ/', right: 'Pensar' },
      { id: 'u0-vp4', left: 'They /ðeɪ/', leftSub: 'TH sonora /ð/', right: 'Ellos / Ellas' }
    ],
    grammarTopics: [
      {
        title: 'Vocales Cortas vs Largas (/ɪ/ vs /iː/)',
        englishTitle: 'Short /ɪ/ vs Long /iː/ (Ship vs Sheep)',
        description: 'Diferencia auditiva y articulatoria entre la I corta relajada y la I larga tensa',
        icon: 'Sparkles',
        color: 'green',
        mcQuestion: '¿Cuál de estas palabras contiene la vocal larga tensa /iː/?',
        mcVoice: 'Please take a seat near the window.',
        mcCorrect: 'Seat /siːt/ (asiento)',
        mcDistractors: ['Sit /sɪt/ (sentarse)', 'Bit /bɪt/ (poco)', 'Fit /fɪt/ (en forma)'],
        mcExplanation: '"Seat" (/siːt/) tiene el sonido largo /iː/, mientras que "sit", "bit" y "fit" usan la vocal corta /ɪ/.',
        wordOrderPrompt: 'Ordena la frase: "Por favor toma asiento cerca de la ventana"',
        wordOrderTarget: ['Please', 'take', 'a', 'seat', 'near', 'the', 'window'],
        wordOrderDistractors: ['sit', 'at'],
        wordOrderExplanation: '"Take a seat" usa el sustantivo "seat" (/siːt/).',
        pairItems: [
          { id: 'p1', left: 'Sit /sɪt/', right: 'Sentarse (corta)' },
          { id: 'p2', left: 'Seat /siːt/', right: 'Asiento (larga)' },
          { id: 'p3', left: 'Live /lɪv/', right: 'Vivir (corta)' },
          { id: 'p4', left: 'Leave /liːv/', right: 'Irse / salir (larga)' }
        ]
      },
      {
        title: 'El Sonido Schwa /ə/ (Vocal Neutra)',
        englishTitle: 'The Schwa Sound /ə/ in Unstressed Syllables',
        description: 'El sonido más frecuente del inglés en sílabas átonas y palabras funcionales',
        icon: 'Flame',
        color: 'blue',
        mcQuestion: 'En la palabra "teacher" (/ˈtiː.tʃər/), ¿dónde se encuentra el sonido Schwa /ə/?',
        mcVoice: 'Our teacher explained the schwa sound clearly.',
        mcCorrect: 'En la segunda sílaba átona (-er)',
        mcDistractors: ['En la primera sílaba tónica (teach-)', 'En la consonante inicial (t-)', 'No tiene sonido schwa'],
        mcExplanation: 'El sonido Schwa /ə/ aparece exclusivamente en sílabas no acentuadas como "-er" en "teacher" o "a-" en "about".',
        wordOrderPrompt: 'Ordena: "Quiero una taza de café por la mañana"',
        wordOrderTarget: ['I', 'want', 'a', 'cup', 'of', 'coffee'],
        wordOrderDistractors: ['for', 'the'],
        wordOrderExplanation: 'En habla natural, "a" y "of" se reducen a Schwa: "a cup of" → /ə kʌp əv/.',
        pairItems: [
          { id: 'p1', left: 'About /əˈbaʊt/', right: 'Schwa al inicio (a-)' },
          { id: 'p2', left: 'Doctor /ˈdɒk.tər/', right: 'Schwa al final (-or)' },
          { id: 'p3', left: 'Support /səˈpɔːrt/', right: 'Schwa en primera sílaba (su-)' },
          { id: 'p4', left: 'Camera /ˈkæm.rə/', right: 'Schwa final (-ra)' }
        ]
      },
      {
        title: 'Trío de A: /æ/ (Cat), /ʌ/ (Cup) y /ɑː/ (Car)',
        englishTitle: 'Mastering the Three "A" Sounds',
        description: 'Cómo distinguir "cat", "cut" y "cart" sin confundirlas con la A española',
        icon: 'BookOpen',
        color: 'orange',
        mcQuestion: '¿Qué símbolo fonético representa la vocal corta central de "cup", "sun" y "money"?',
        mcVoice: 'The sun is shining and I have a cup of tea.',
        mcCorrect: '/ʌ/ (Strut vowel)',
        mcDistractors: ['/æ/ (Trap vowel)', '/ɑː/ (Palm vowel)', '/eɪ/ (Face diphthong)'],
        mcExplanation: 'Palabras como "cup", "sun", "love" y "money" se pronuncian con la vocal central corta /ʌ/.',
        wordOrderPrompt: 'Ordena: "El gato negro corrió rápido hacia el auto"',
        wordOrderTarget: ['The', 'black', 'cat', 'ran', 'fast', 'to', 'the', 'car'],
        wordOrderDistractors: ['running', 'cars'],
        wordOrderExplanation: '"Black", "cat" y "ran" usan /æ/, mientras que "car" usa /ɑːr/.',
        pairItems: [
          { id: 'p1', left: 'Cat /kæt/', right: 'Gato (vocal anterior /æ/)' },
          { id: 'p2', left: 'Cut /kʌt/', right: 'Cortar (vocal central /ʌ/)' },
          { id: 'p3', left: 'Cart /kɑːrt/', right: 'Carrito (vocal posterior /ɑː/)' },
          { id: 'p4', left: 'Money /ˈmʌn.i/', right: 'Dinero (escrita con O, suena /ʌ/)' }
        ]
      },
      {
        title: 'Consonantes TH: Sorda /θ/ vs Sonora /ð/',
        englishTitle: 'Voiceless /θ/ (Think) vs Voiced /ð/ (This)',
        description: 'Domina los dos sonidos de la combinación "th" en inglés',
        icon: 'MessageCircle',
        color: 'purple',
        mcQuestion: '¿Cuál de estas palabras se pronuncia con la TH sonora /ð/ (vibrando las cuerdas vocales)?',
        mcVoice: 'My brother likes this warm weather.',
        mcCorrect: 'Brother /ˈbrʌð.ər/',
        mcDistractors: ['Think /θɪŋk/', 'Three /θriː/', 'Thursday /ˈθɜːrz.deɪ/'],
        mcExplanation: '"Brother", "this", "that", "they" y "weather" llevan la TH sonora /ð/.',
        wordOrderPrompt: 'Ordena: "Creo que el clima está agradable este jueves"',
        wordOrderTarget: ['I', 'think', 'the', 'weather', 'is', 'nice', 'this', 'Thursday'],
        wordOrderDistractors: ['thinking', 'are'],
        wordOrderExplanation: 'Alterna entre /θ/ (think, Thursday) y /ð/ (the, weather, this).',
        pairItems: [
          { id: 'p1', left: 'Think /θɪŋk/', right: 'TH sorda /θ/ (pensar)' },
          { id: 'p2', left: 'Thank /θæŋk/', right: 'TH sorda /θ/ (agradecer)' },
          { id: 'p3', left: 'Mother /ˈmʌð.ər/', right: 'TH sonora /ð/ (madre)' },
          { id: 'p4', left: 'Together /təˈɡeð.ər/', right: 'TH sonora /ð/ (juntos)' }
        ]
      },
      {
        title: 'Contraste /v/ vs /b/ y /ʃ/ vs /tʃ/',
        englishTitle: 'Labiodental /v/ vs Bilabial /b/ & /ʃ/ vs /tʃ/',
        description: 'Evita confundir "very" con "berry" o "share" con "chair"',
        icon: 'Headphones',
        color: 'red',
        mcQuestion: '¿Cómo se produce correctamente el sonido /v/ en palabras como "very", "voice" y "travel"?',
        mcVoice: 'Her voice is very clear when she travels.',
        mcCorrect: 'Apoyando los dientes superiores sobre el labio inferior y vibrando',
        mcDistractors: ['Juntando ambos labios como en español', 'Sin vibrar las cuerdas vocales como una F', 'Con la punta de la lengua en el paladar'],
        mcExplanation: 'En inglés /v/ es labiodental sonora (dientes superiores + labio inferior), mientras que /b/ es bilabial.',
        wordOrderPrompt: 'Ordena: "Ella eligió una silla muy cómoda en la tienda"',
        wordOrderTarget: ['She', 'chose', 'a', 'very', 'comfortable', 'chair', 'in', 'the', 'shop'],
        wordOrderDistractors: ['share', 'choosing'],
        wordOrderExplanation: 'Contrasta /ʃ/ (she, shop) con /tʃ/ (chose, chair) y /v/ (very).',
        pairItems: [
          { id: 'p1', left: 'Best /best/', right: 'El mejor (bilabial /b/)' },
          { id: 'p2', left: 'Vest /vest/', right: 'Chaleco (labiodental /v/)' },
          { id: 'p3', left: 'Wash /wɒʃ/', right: 'Lavar (fricativa /ʃ/)' },
          { id: 'p4', left: 'Watch /wɒtʃ/', right: 'Reloj / mirar (africada /tʃ/)' }
        ]
      },
      {
        title: 'Pronunciación de Terminaciones -ed y -s',
        englishTitle: 'Past -ed (/t/, /d/, /ɪd/) & Plural -s (/s/, /z/, /ɪz/)',
        description: 'Reglas fonéticas exactas para verbos en pasado y plurales',
        icon: 'Lightbulb',
        color: 'green',
        mcQuestion: '¿Cómo se pronuncia la terminación "-ed" en el verbo "worked"?',
        mcVoice: 'We worked together and finished the project.',
        mcCorrect: 'Como /t/ seca (/wɜːrkt/), en una sola sílaba',
        mcDistractors: ['Como /ɪd/ (/ˈwɜːr.kɪd/)', 'Como /d/ sonora', 'La -ed es completamente muda'],
        mcExplanation: 'Como "work" termina en el sonido sordo /k/, la "-ed" se pronuncia /t/ sin agregar otra sílaba.',
        wordOrderPrompt: 'Ordena: "Ellos trabajaron duro y necesitaron dos días extra"',
        wordOrderTarget: ['They', 'worked', 'hard', 'and', 'needed', 'two', 'extra', 'days'],
        wordOrderDistractors: ['working', 'needs'],
        wordOrderExplanation: '"Worked" suena /t/, mientras que "needed" (terminado en d) suena /ɪd/.',
        pairItems: [
          { id: 'p1', left: 'Worked / Watched', right: 'Terminación -ed suena /t/' },
          { id: 'p2', left: 'Played / Called', right: 'Terminación -ed suena /d/' },
          { id: 'p3', left: 'Wanted / Needed', right: 'Terminación -ed suena /ɪd/' },
          { id: 'p4', left: 'Watches / Changes', right: 'Terminación -es suena /ɪz/' }
        ]
      },
      {
        title: 'Letras Mudas (Silent Letters) y Connected Speech',
        englishTitle: 'Silent Letters (K, W, B, L) & Linking Sounds',
        description: 'Palabras con letras que no se pronuncian y enlace fluido entre palabras',
        icon: 'Compass',
        color: 'blue',
        mcQuestion: '¿Cuál es la letra muda en la palabra "island" (isla) y en "receipt" (recibo)?',
        mcVoice: 'We visited a beautiful island and kept the receipt.',
        mcCorrect: 'La "s" en island (/ˈaɪ.lənd/) y la "p" en receipt (/rɪˈsiːt/)',
        mcDistractors: ['La "l" en island y la "t" en receipt', 'La "d" en island y la "c" en receipt', 'Ninguna letra es muda'],
        mcExplanation: 'En "island" (/ˈaɪ.lənd/) la S nunca suena, y en "receipt" (/rɪˈsiːt/) la P es muda.',
        wordOrderPrompt: 'Ordena: "Sé que debemos escuchar atentamente durante dos horas"',
        wordOrderTarget: ['I', 'know', 'we', 'must', 'listen', 'carefully', 'for', 'two', 'hours'],
        wordOrderDistractors: ['knows', 'listening'],
        wordOrderExplanation: 'Letras mudas: K en "know", T en "listen", W en "two" y H en "hours".',
        pairItems: [
          { id: 'p1', left: 'Know / Knife', right: 'La letra K inicial es muda' },
          { id: 'p2', left: 'Listen / Castle', right: 'La letra T intermedia es muda' },
          { id: 'p3', left: 'Doubt / Subtle', right: 'La letra B es muda' },
          { id: 'p4', left: 'Half / Calm / Walk', right: 'La letra L es muda' }
        ]
      }
    ],
    readingPassage: {
      title: 'Lectura Fonética: Why English Spelling and Sound Differ',
      englishText: 'English borrowed words from Germanic, French, Latin, and Greek throughout history. Because of the Great Vowel Shift, many words kept their historical spelling while their pronunciation evolved. Learning the 44 IPA sounds allows you to pronounce any English word accurately!',
      spanishSummary: 'El inglés adoptó palabras germánicas, francesas, latinas y griegas. Aprender los 44 sonidos IPA te permite pronunciar cualquier palabra con precisión.',
      question: 'According to the passage, why does learning the 44 IPA sounds help learners?',
      correctAnswer: 'Because it allows you to pronounce any English word accurately despite historical spelling.',
      distractors: [
        'Because English has exactly the same spelling rules as Spanish.',
        'Because silent letters only exist in British English.',
        'Because you never need to practice listening.'
      ],
      explanation: 'El texto explica que dominar los 44 fonemas IPA permite pronunciar con precisión a pesar de la ortografía histórica.'
    }
  },

  // ==========================================
  // UNIDAD 1: CAMBRIDGE A1 — NUEVOS AMIGOS Y SALUDOS
  // ==========================================
  {
    id: 1,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 1: Nuevos Amigos y Presentaciones',
    subtitle: 'Saludos, Verbo To Be, Países, Profesiones y Preguntas Wh-',
    description: 'Aprende a presentarte con soltura, preguntar datos personales y mantener tu primera conversación en inglés.',
    themeColor: '#1cb0f6',
    dialogueTitle: 'Lectura Inicial: Primer Día en el Campus Internacional',
    dialogueContext: 'Emily conoce a Mateo en la cafetería del campus universitario en Boston.',
    dialogueLines: [
      {
        speaker: 'Emily',
        english: 'Hi there! Is this seat taken? I am Emily, by the way.',
        ipa: '/haɪ ðer ɪz ðɪs siːt ˈteɪkən aɪ æm ˈemɪli baɪ ðə weɪ/',
        spanish: '¡Hola! ¿Está ocupado este asiento? Por cierto, soy Emily.',
        audioText: 'Hi there! Is this seat taken? I am Emily, by the way.'
      },
      {
        speaker: 'Mateo',
        english: 'Not at all, please go ahead! I am Mateo. Nice to meet you, Emily.',
        ipa: '/nɒt æt ɔːl pliːz ɡəʊ əˈhed aɪ æm məˈteɪəʊ naɪs tə miːt ju ˈemɪli/',
        spanish: '¡Para nada, adelante por favor! Soy Mateo. Mucho gusto, Emily.',
        audioText: 'Not at all, please go ahead! I am Mateo. Nice to meet you, Emily.'
      },
      {
        speaker: 'Emily',
        english: 'Nice to meet you too! Where are you from, Mateo?',
        ipa: '/naɪs tə miːt ju tuː wer ɑːr ju frɒm məˈteɪəʊ/',
        spanish: '¡Igualmente! ¿De dónde eres, Mateo?',
        audioText: 'Nice to meet you too! Where are you from, Mateo?'
      },
      {
        speaker: 'Mateo',
        english: 'I am from Guadalajara, Mexico, and I am a computer science student here.',
        ipa: '/aɪ æm frɒm ˌɡwɑːdələˈhɑːrə ˈmeksɪkəʊ ænd aɪ æm ə kəmˈpjuːtər ˈsaɪəns ˈstuːdənt hɪr/',
        spanish: 'Soy de Guadalajara, México, y soy estudiante de ciencias de la computación aquí.',
        audioText: 'I am from Guadalajara, Mexico, and I am a computer science student here.'
      }
    ],
    vocabPairs: [
      { id: 'u1-vp1', left: 'Nice to meet you', leftSub: '/naɪs tə miːt ju/', right: 'Mucho gusto en conocerte' },
      { id: 'u1-vp2', left: 'By the way', leftSub: '/baɪ ðə weɪ/', right: 'Por cierto / A propósito' },
      { id: 'u1-vp3', left: 'Software engineer', leftSub: '/ˈsɒftwer ˌendʒɪˈnɪər/', right: 'Ingeniero de software' },
      { id: 'u1-vp4', left: 'Where are you from?', leftSub: '/wer ɑːr ju frɒm/', right: '¿De dónde eres?' }
    ],
    grammarTopics: [
      {
        title: 'Saludos Formales e Informales',
        englishTitle: 'Greetings, Introductions & Farewells',
        description: 'Expresiones naturales para saludar, responder y despedirse según el contexto',
        icon: 'MessageCircle',
        color: 'blue',
        mcQuestion: 'Si alguien te dice "How is it going?", ¿cuál es la respuesta más natural?',
        mcVoice: 'Hey! How is it going today?',
        mcCorrect: 'Pretty good, thanks! How about you?',
        mcDistractors: ['I am going to the library.', 'Yes, I have twenty years.', 'Nice to meet you too.'],
        mcExplanation: '"How is it going?" significa "¿Cómo te va / Qué tal?", por lo que se responde indicando cómo estás.',
        wordOrderPrompt: 'Ordena: "Mucho gusto en conocerte también, que tengas un gran día"',
        wordOrderTarget: ['Nice', 'to', 'meet', 'you', 'too', 'have', 'a', 'great', 'day'],
        wordOrderDistractors: ['meeting', 'for'],
        wordOrderExplanation: 'Añadimos "too" al final de "Nice to meet you" para decir "igualmente".',
        pairItems: [
          { id: 'p1', left: 'Good morning', right: 'Buenos días (hasta las 12:00)' },
          { id: 'p2', left: 'How is it going?', right: '¿Cómo te va? / ¿Qué tal?' },
          { id: 'p3', left: 'See you tomorrow', right: 'Nos vemos mañana' },
          { id: 'p4', left: 'Take care!', right: '¡Cuídate!' }
        ]
      },
      {
        title: 'Verbo To Be Afirmativo y Contracciones',
        englishTitle: 'Verb To Be: I am, You are, He/She/It is',
        description: 'Uso de am, is, are para identidad, origen, edad y estados',
        icon: 'Sparkles',
        color: 'green',
        mcQuestion: '¿Cómo se expresa correctamente en inglés "Tengo veinticinco años"?',
        mcVoice: 'I am twenty-five years old.',
        mcCorrect: 'I am twenty-five years old.',
        mcDistractors: ['I have twenty-five years old.', 'I am twenty-five years.', 'I have twenty-five years.'],
        mcExplanation: 'En inglés la edad SIEMPRE se expresa con el verbo "to be" (am/is/are), nunca con "have".',
        wordOrderPrompt: 'Ordena: "Ella es arquitecta y ellos son de Canadá"',
        wordOrderTarget: ['She', 'is', 'an', 'architect', 'and', 'they', 'are', 'from', 'Canada'],
        wordOrderDistractors: ['am', 'a'],
        wordOrderExplanation: 'Usamos "an" antes de vocal ("an architect") y "are" para "they".',
        pairItems: [
          { id: 'p1', left: 'I am (I’m)', right: 'Yo soy / Yo estoy' },
          { id: 'p2', left: 'She is (She’s)', right: 'Ella es / Ella está' },
          { id: 'p3', left: 'We are (We’re)', right: 'Nosotros somos / estamos' },
          { id: 'p4', left: 'They are (They’re)', right: 'Ellos son / están' }
        ]
      },
      {
        title: 'To Be Negativo e Interrogativo',
        englishTitle: 'Negative (Isn’t / Aren’t) & Yes/No Questions',
        description: 'Cómo negar e invertir el orden para hacer preguntas directas',
        icon: 'HelpCircle',
        color: 'orange',
        mcQuestion: 'Selecciona la pregunta correcta para saber si alguien está listo:',
        mcVoice: 'Are you ready for the English class?',
        mcCorrect: 'Are you ready for the English class?',
        mcDistractors: ['Do you are ready for the class?', 'You are ready for the class?', 'Is you ready for the class?'],
        mcExplanation: 'Con el verbo "to be", invertimos el verbo y el sujeto ("Are you...?") sin usar el auxiliar "do".',
        wordOrderPrompt: 'Ordena: "¿Es él el nuevo gerente del proyecto?"',
        wordOrderTarget: ['Is', 'he', 'the', 'new', 'project', 'manager'],
        wordOrderDistractors: ['Are', 'does'],
        wordOrderExplanation: 'Invertimos "Is + he" al inicio de la pregunta.',
        pairItems: [
          { id: 'p1', left: 'Are you tired?', right: 'Yes, I am. / No, I’m not.' },
          { id: 'p2', left: 'Is she at home?', right: 'Yes, she is. / No, she isn’t.' },
          { id: 'p3', left: 'Are they students?', right: 'Yes, they are. / No, they aren’t.' },
          { id: 'p4', left: 'Is it cold outside?', right: 'Yes, it is. / No, it isn’t.' }
        ]
      },
      {
        title: 'Países, Nacionalidades e Idiomas',
        englishTitle: 'Countries, Nationalities & Languages',
        description: 'Habla de tu país de origen y los idiomas que hablas (con mayúscula inicial)',
        icon: 'Compass',
        color: 'purple',
        mcQuestion: 'Completa la oración: "My colleague is from Tokyo, so she is ___."',
        mcVoice: 'My colleague is from Tokyo, so she is Japanese.',
        mcCorrect: 'Japanese',
        mcDistractors: ['Japan', 'from Japanese', 'a Japan'],
        mcExplanation: '"Japan" es el país ("from Japan"), mientras que "Japanese" es la nacionalidad y el idioma.',
        wordOrderPrompt: 'Ordena: "Nuestros clientes son del Reino Unido y hablan inglés"',
        wordOrderTarget: ['Our', 'clients', 'are', 'from', 'the', 'United', 'Kingdom'],
        wordOrderDistractors: ['British', 'in'],
        wordOrderExplanation: 'Países compuestos como "the United Kingdom" o "the United States" llevan el artículo "the".',
        pairItems: [
          { id: 'p1', left: 'Germany → German', right: 'Alemania → Alemán' },
          { id: 'p2', left: 'France → French', right: 'Francia → Francés' },
          { id: 'p3', left: 'Brazil → Brazilian', right: 'Brasil → Brasileño' },
          { id: 'p4', left: 'The UK → British', right: 'Reino Unido → Británico' }
        ]
      },
      {
        title: 'Profesiones y Artículos Indefinidos (A / An)',
        englishTitle: 'Jobs, Occupations & Indefinite Articles A / An',
        description: 'En inglés siempre usamos "a" o "an" antes de una profesión en singular',
        icon: 'Briefcase',
        color: 'red',
        mcQuestion: '¿Por qué decimos "an engineer" pero "a university student"?',
        mcVoice: 'My sister is an engineer and my brother is a university student.',
        mcCorrect: 'Porque "an" depende del SONIDO inicial: "university" empieza con sonido consonántico /juː/',
        mcDistractors: ['Porque "university" es plural', 'Es una excepción sin regla fonética', 'Con profesiones nunca se usa "a"'],
        mcExplanation: 'Usamos "an" antes de sonido vocálico (/e/ en engineer, /aʊ/ en hour) y "a" antes de sonido consonántico (/juː/ en university).',
        wordOrderPrompt: 'Ordena: "Mi hermano trabaja como diseñador gráfico en Londres"',
        wordOrderTarget: ['My', 'brother', 'works', 'as', 'a', 'graphic', 'designer', 'in', 'London'],
        wordOrderDistractors: ['an', 'work'],
        wordOrderExplanation: 'En inglés es obligatorio colocar "a/an" antes de la profesión en singular.',
        pairItems: [
          { id: 'p1', left: 'A developer', right: 'Empieza con sonido consonántico /d/' },
          { id: 'p2', left: 'An accountant', right: 'Empieza con sonido vocálico /ə/ (contador)' },
          { id: 'p3', left: 'A university', right: 'Empieza con sonido /juː/ (usa A)' },
          { id: 'p4', left: 'An hour', right: 'La H es muda, empieza con /aʊ/ (usa AN)' }
        ]
      },
      {
        title: 'Adjetivos Posesivos y Preguntas Wh-',
        englishTitle: 'Possessive Adjectives (My, Your, His, Her, Our, Their) & Wh-',
        description: 'Distingue entre "your" vs "you’re" y "its" vs "it’s"',
        icon: 'Users',
        color: 'green',
        mcQuestion: 'Completa la oración: "That company is famous for ___ innovative products."',
        mcVoice: 'That company is famous for its innovative products.',
        mcCorrect: 'its (posesivo sin apóstrofo)',
        mcDistractors: ['it’s (contracción de it is)', 'his (masculino singular)', 'there (allí)'],
        mcExplanation: '"Its" (sin apóstrofo) es el adjetivo posesivo para una cosa, empresa o animal; "it’s" significa "it is".',
        wordOrderPrompt: 'Ordena: "¿Cuál es su número de teléfono y su correo electrónico?"',
        wordOrderTarget: ['What', 'is', 'her', 'phone', 'number', 'and', 'email', 'address'],
        wordOrderDistractors: ['she', 'who'],
        wordOrderExplanation: '"Her" indica posesión de ella ("su número de teléfono").',
        pairItems: [
          { id: 'p1', left: 'My / Your', right: 'Mi / Tu (o Su de usted)' },
          { id: 'p2', left: 'His / Her', right: 'Su (de él) / Su (de ella)' },
          { id: 'p3', left: 'Its (sin apóstrofo)', right: 'Su (de una cosa o empresa)' },
          { id: 'p4', left: 'Our / Their', right: 'Nuestro / Su (de ellos)' }
        ]
      },
      {
        title: 'Números 0–100, Horas y Datos de Contacto',
        englishTitle: 'Numbers, Phone Digits, Ages & Email Symbols',
        description: 'Cómo leer números telefónicos (oh / double), correos (@ = at, . = dot) y edades',
        icon: 'PhoneCall',
        color: 'blue',
        mcQuestion: '¿Cómo se dice en inglés el símbolo "@" y el punto "." en una dirección de correo electrónico?',
        mcVoice: 'My email is alex at domain dot com.',
        mcCorrect: '"at" para @ y "dot" para el punto',
        mcDistractors: ['"arroba" y "point"', '"on" y "period"', '"in" y "slash"'],
        mcExplanation: 'En correos electrónicos y sitios web, "@" se lee "at", "." se lee "dot", "_" es "underscore" y "-" es "hyphen/dash".',
        wordOrderPrompt: 'Ordena: "Mi correo es sarah arroba tech punto com"',
        wordOrderTarget: ['My', 'email', 'is', 'sarah', 'at', 'tech', 'dot', 'com'],
        wordOrderDistractors: ['point', 'in'],
        wordOrderExplanation: 'Leemos "sarah@tech.com" como "sarah at tech dot com".',
        pairItems: [
          { id: 'p1', left: '@ (en emails)', right: 'Se pronuncia "at"' },
          { id: 'p2', left: '. (en emails/web)', right: 'Se pronuncia "dot"' },
          { id: 'p3', left: 'Fifteen (15) vs Fifty (50)', right: 'Acento al final (-teen) vs al inicio (fif-)' },
          { id: 'p4', left: '0 en teléfonos', right: 'Se suele leer "oh" (/əʊ/) o "zero"' }
        ]
      }
    ],
    readingPassage: {
      title: 'Lectura del Libro: A Global Study Group in Boston',
      englishText: 'Every Monday afternoon, four international students meet at the campus library in Boston. Mateo is twenty-two and he is from Mexico. His study partner, Chloe, is from Sydney, Australia. She is an architecture student. Together with Ken from Tokyo and Elena from Madrid, they practice English conversation for two hours.',
      spanishSummary: 'Cada lunes por la tarde, cuatro estudiantes internacionales (Mateo de México, Chloe de Australia, Ken de Tokio y Elena de Madrid) se reúnen en la biblioteca de Boston para practicar inglés.',
      question: 'What does Chloe study, and where is she from?',
      correctAnswer: 'She studies architecture, and she is from Sydney, Australia.',
      distractors: [
        'She studies computer science, and she is from Madrid.',
        'She is a professor from Boston.',
        'She studies medicine in Tokyo.'
      ],
      explanation: 'El texto menciona: "Chloe, is from Sydney, Australia. She is an architecture student."'
    }
  },

  // ==========================================
  // UNIDAD 2: CAMBRIDGE A1 — EN LA CIUDAD Y DE COMPRAS
  // ==========================================
  {
    id: 2,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 2: De Compras, Cafeterías y la Ciudad',
    subtitle: 'This/That/These/Those, There is/are, Precios y Pedir en un Café',
    description: 'Pide comida y bebidas con cortesía, pregunta precios y describe qué hay en tu ciudad.',
    themeColor: '#ff9600',
    dialogueTitle: 'Lectura Inicial: Comprando en un Café y Librería',
    dialogueContext: 'Liam atiende a Emily en una cafetería artesanal en el centro de Seattle.',
    dialogueLines: [
      {
        speaker: 'Liam (Barista)',
        english: 'Good morning! What can I get started for you today?',
        ipa: '/ɡʊd ˈmɔːrnɪŋ wɒt kæn aɪ ɡet ˈstɑːrtɪd fɔːr ju təˈdeɪ/',
        spanish: '¡Buenos días! ¿Qué te puedo ir preparando hoy?',
        audioText: 'Good morning! What can I get started for you today?'
      },
      {
        speaker: 'Emily',
        english: 'Hi! Could I have a medium cappuccino and one of those blueberry muffins, please?',
        ipa: '/haɪ kʊd aɪ hæv ə ˈmiːdiəm ˌkæpʊˈtʃiːnəʊ ænd wʌn əv ðəʊz ˈbluːbəri ˈmʌfɪnz pliːz/',
        spanish: '¡Hola! ¿Me podrías dar un capuchino mediano y uno de esos muffins de arándanos, por favor?',
        audioText: 'Hi! Could I have a medium cappuccino and one of those blueberry muffins, please?'
      },
      {
        speaker: 'Liam (Barista)',
        english: 'Sure thing! Is that for here or to go? Your total is eight dollars and fifty cents.',
        ipa: '/ʃʊr θɪŋ ɪz ðæt fɔːr hɪr ɔːr tə ɡəʊ jʊr ˈtəʊtəl ɪz eɪt ˈdɒlərz ænd ˈfɪfti sents/',
        spanish: '¡Claro que sí! ¿Es para tomar aquí o para llevar? El total es de ocho dólares con cincuenta centavos.',
        audioText: 'Sure thing! Is that for here or to go? Your total is eight dollars and fifty cents.'
      },
      {
        speaker: 'Emily',
        english: 'To go, please. Can I pay by contactless card?',
        ipa: '/tə ɡəʊ pliːz kæn aɪ peɪ baɪ ˈkɒntæktləs kɑːrd/',
        spanish: 'Para llevar, por favor. ¿Puedo pagar con tarjeta sin contacto?',
        audioText: 'To go, please. Can I pay by contactless card?'
      }
    ],
    vocabPairs: [
      { id: 'u2-vp1', left: 'For here or to go?', leftSub: '/fɔːr hɪr ɔːr tə ɡəʊ/', right: '¿Para comer aquí o para llevar?' },
      { id: 'u2-vp2', left: 'How much is it?', leftSub: '/haʊ mʌtʃ ɪz ɪt/', right: '¿Cuánto cuesta?' },
      { id: 'u2-vp3', left: 'On sale', leftSub: '/ɒn seɪl/', right: 'En oferta / con descuento' },
      { id: 'u2-vp4', left: 'Receipt', leftSub: '/rɪˈsiːt/', right: 'Recibo / ticket de compra' }
    ],
    grammarTopics: [
      {
        title: 'Demostrativos: This, That, These, Those',
        englishTitle: 'Pointing to Objects Near & Far',
        description: 'Usa this/these para lo que tienes cerca y that/those para lo que está lejos',
        icon: 'ShoppingBag',
        color: 'orange',
        mcQuestion: 'Si estás señalando unos zapatos que están lejos en el mostrador, ¿qué dices?',
        mcVoice: 'How much are those leather boots on the top shelf?',
        mcCorrect: 'How much are those boots?',
        mcDistractors: ['How much is this boots?', 'How much are these boot?', 'How much is that boots?'],
        mcExplanation: '"Those" se usa para sustantivos plurales ("boots") que están lejos de quien habla.',
        wordOrderPrompt: 'Ordena: "Esta mochila es barata, pero aquellas maletas son caras"',
        wordOrderTarget: ['This', 'backpack', 'is', 'cheap', 'but', 'those', 'suitcases', 'are', 'expensive'],
        wordOrderDistractors: ['these', 'that'],
        wordOrderExplanation: '"This" acompaña al singular "backpack" y "those" al plural lejano "suitcases".',
        pairItems: [
          { id: 'p1', left: 'This book', right: 'Este libro (cerca, singular)' },
          { id: 'p2', left: 'That building', right: 'Aquel edificio (lejos, singular)' },
          { id: 'p3', left: 'These headphones', right: 'Estos audífonos (cerca, plural)' },
          { id: 'p4', left: 'Those mountains', right: 'Aquellas montañas (lejos, plural)' }
        ]
      },
      {
        title: 'Existencia: There is y There are',
        englishTitle: 'There is (Singular) & There are (Plural) + Some/Any',
        description: 'Describe qué tiendas, servicios o elementos hay en un lugar',
        icon: 'MapPin',
        color: 'blue',
        mcQuestion: '¿Cuál es la forma correcta para preguntar "¿Hay algún cajero automático cerca de aquí?"?',
        mcVoice: 'Are there any ATMs near here?',
        mcCorrect: 'Are there any ATMs near here?',
        mcDistractors: ['Have any ATMs near here?', 'Is there some ATMs near here?', 'There are any ATMs near here?'],
        mcExplanation: 'En preguntas plurales usamos "Are there any + sustantivo plural?".',
        wordOrderPrompt: 'Ordena: "Hay dos farmacias y una panadería en esta calle"',
        wordOrderTarget: ['There', 'are', 'two', 'pharmacies', 'and', 'a', 'bakery', 'on', 'this', 'street'],
        wordOrderDistractors: ['is', 'have'],
        wordOrderExplanation: '"There are" concuerda con el primer elemento plural "two pharmacies".',
        pairItems: [
          { id: 'p1', left: 'There is a park', right: 'Hay un parque (afirmativo singular)' },
          { id: 'p2', left: 'There are three cafés', right: 'Hay tres cafeterías (afirmativo plural)' },
          { id: 'p3', left: 'There aren’t any seats', right: 'No hay ningún asiento (negativo plural)' },
          { id: 'p4', left: 'Is there free Wi-Fi?', right: '¿Hay Wi-Fi gratis? (pregunta singular)' }
        ]
      },
      {
        title: 'Preposiciones de Lugar (In, On, At, Next to, Across from)',
        englishTitle: 'Prepositions of Place & City Locations',
        description: 'Ubica objetos y edificios con precisión',
        icon: 'Compass',
        color: 'green',
        mcQuestion: '¿Cómo dices "La librería está justo frente a (cruzando la calle de) la estación"?',
        mcVoice: 'The bookstore is right across from the train station.',
        mcCorrect: 'The bookstore is across from the station.',
        mcDistractors: ['The bookstore is under the station.', 'The bookstore is between the station.', 'The bookstore is on the station.'],
        mcExplanation: '"Across from" (o "opposite" en UK) significa en el lado opuesto de la calle.',
        wordOrderPrompt: 'Ordena: "Las llaves están sobre la mesa junto a la portátil"',
        wordOrderTarget: ['The', 'keys', 'are', 'on', 'the', 'table', 'next', 'to', 'the', 'laptop'],
        wordOrderDistractors: ['in', 'under'],
        wordOrderExplanation: '"On" indica sobre una superficie y "next to" significa al lado de.',
        pairItems: [
          { id: 'p1', left: 'Next to / Beside', right: 'Al lado de / Junto a' },
          { id: 'p2', left: 'Across from / Opposite', right: 'Enfrente de (cruzando la calle)' },
          { id: 'p3', left: 'Between A and B', right: 'Entre A y B' },
          { id: 'p4', left: 'On the corner of', right: 'En la esquina de' }
        ]
      },
      {
        title: 'Pedir en Cafeterías y Restaurantes (Could I have...?)',
        englishTitle: 'Polite Ordering: Could I have / I’d like',
        description: 'Por qué los hablantes nativos evitan decir "I want" o "Give me" al pedir',
        icon: 'Coffee',
        color: 'purple',
        mcQuestion: 'En una cafetería o restaurante en EE. UU. o Reino Unido, ¿cuál es la forma más cortés y natural de pedir?',
        mcVoice: 'Could I have an iced latte with oat milk, please?',
        mcCorrect: 'Could I have an iced latte, please? / I’d like an iced latte.',
        mcDistractors: ['Give me one iced latte now.', 'I want coffee.', 'Bring to me a latte.'],
        mcExplanation: '"Could I have...?", "Can I get...?" y "I would like (I’d like)..." son las fórmulas estándar de cortesía.',
        wordOrderPrompt: 'Ordena: "¿Me podría traer la cuenta cuando tenga un momento, por favor?"',
        wordOrderTarget: ['Could', 'I', 'have', 'the', 'check', 'please'],
        wordOrderDistractors: ['give', 'want'],
        wordOrderExplanation: '"Could I have the check/bill, please?" es la forma ideal de pedir la cuenta.',
        pairItems: [
          { id: 'p1', left: 'Could I have...?', right: '¿Me podría dar...? (cortés)' },
          { id: 'p2', left: 'I’d like (I would like)', right: 'Me gustaría / Quisiera' },
          { id: 'p3', left: 'Still or sparkling water?', right: '¿Agua natural o con gas?' },
          { id: 'p4', left: 'Keep the change', right: 'Quédese con el cambio' }
        ]
      },
      {
        title: 'El Posesivo Sajón (’s) y De Quién Es (Whose)',
        englishTitle: 'Possessive ’s & Asking Whose',
        description: 'Expresa pertenencia ("Sarah’s laptop") y pregunta "¿De quién es?" con Whose',
        icon: 'HelpCircle',
        color: 'red',
        mcQuestion: '¿Cómo se dice correctamente "La oficina de mis padres" (en plural terminado en -s)?',
        mcVoice: 'My parents’ office is in downtown Chicago.',
        mcCorrect: 'My parents’ office (apóstrofo después de la s plural)',
        mcDistractors: ['My parent’s office', 'The office of my parents’s', 'My parents office'],
        mcExplanation: 'Cuando un sustantivo plural ya termina en "-s" (parents), solo añadimos el apóstrofo al final: "parents’".',
        wordOrderPrompt: 'Ordena: "¿De quién es este paraguas que está cerca de la puerta?"',
        wordOrderTarget: ['Whose', 'umbrella', 'is', 'this', 'near', 'the', 'door'],
        wordOrderDistractors: ['Who’s', 'whom'],
        wordOrderExplanation: '"Whose" pregunta por posesión ("¿De quién?"), mientras que "Who’s" es "Who is".',
        pairItems: [
          { id: 'p1', left: 'Emily’s bag', right: 'El bolso de Emily (singular ’s)' },
          { id: 'p2', left: 'My parents’ house', right: 'La casa de mis padres (plural s’)' },
          { id: 'p3', left: 'Whose keys are these?', right: '¿De quién son estas llaves?' },
          { id: 'p4', left: 'Who’s calling?', right: '¿Quién llama? (Who is)' }
        ]
      },
      {
        title: 'Precios, Monedas y Pagos en Tiendas',
        englishTitle: 'Asking Prices, Sizes, Fitting Rooms & Refunds',
        description: 'Vocabulario práctico para comprar ropa, probarse tallas y pagar',
        icon: 'Award',
        color: 'green',
        mcQuestion: 'Si quieres probarte un suéter en una tienda de ropa, ¿qué preguntas?',
        mcVoice: 'Excuse me, where are the fitting rooms? Can I try this on?',
        mcCorrect: 'Can I try this on? Where are the fitting rooms?',
        mcDistractors: ['Can I prove this sweater?', 'Where is the kitchen room?', 'Can I wear this to buy?'],
        mcExplanation: '"Try on" significa probarse ropa o calzado, y "fitting room / changing room" es el probador.',
        wordOrderPrompt: 'Ordena: "¿Tienen esta chaqueta en talla mediana?"',
        wordOrderTarget: ['Do', 'you', 'have', 'this', 'jacket', 'in', 'a', 'medium', 'size'],
        wordOrderDistractors: ['are', 'has'],
        wordOrderExplanation: 'Usamos "in a medium size" o simplemente "in a medium" para pedir tallas.',
        pairItems: [
          { id: 'p1', left: 'Can I try this on?', right: '¿Me puedo probar esto?' },
          { id: 'p2', left: 'Fitting room', right: 'Probador de ropa' },
          { id: 'p3', left: 'Pay in cash / by card', right: 'Pagar en efectivo / con tarjeta' },
          { id: 'p4', left: 'It fits me well', right: 'Me queda bien de talla' }
        ]
      }
    ],
    readingPassage: {
      title: 'Lectura del Libro: Saturday Morning at Pike Place Market',
      englishText: 'Pike Place Market in Seattle is one of the oldest public farmers’ markets in the United States. Every Saturday, there are hundreds of local vendors selling fresh fruit, artisan bread, and roasted coffee. Across from the main entrance, there is a small bakery famous for its cinnamon rolls.',
      spanishSummary: 'El mercado Pike Place en Seattle es uno de los más antiguos de EE. UU. Cada sábado hay cientos de vendedores locales y frente a la entrada principal hay una panadería famosa por sus roles de canela.',
      question: 'Where is the small bakery famous for its cinnamon rolls located?',
      correctAnswer: 'Right across from the main entrance of the market.',
      distractors: [
        'Underneath the train station.',
        'Ten miles outside Seattle.',
        'Inside the airport terminal.'
      ],
      explanation: 'El pasaje indica claramente: "Across from the main entrance, there is a small bakery...".'
    }
  }
];

// Generador estructurado para las Unidades 3 a 23 (completando las 24 Unidades del curso A1 a C1 con 11 nodos cada una)
const ADDITIONAL_UNIT_SPECS: {
  id: number;
  stage: CourseStage;
  cefrLevel: CEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  dialogueSpeakerA: string;
  dialogueSpeakerB: string;
  dialogueLines: [
    { en: string; ipa: string; es: string },
    { en: string; ipa: string; es: string },
    { en: string; ipa: string; es: string },
    { en: string; ipa: string; es: string }
  ];
  topics: {
    title: string;
    enTitle: string;
    icon: string;
    color: 'green' | 'blue' | 'orange' | 'purple' | 'red';
    q: string;
    voice: string;
    ans: string;
    dist: [string, string, string];
    exp: string;
    woEs: string;
    woTarget: string[];
    woDist: string[];
    pairs: [
      { l: string; r: string },
      { l: string; r: string },
      { l: string; r: string },
      { l: string; r: string }
    ];
  }[];
}[] = [
  {
    id: 3,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 3: Rutinas Diarias y Present Simple',
    subtitle: 'Afirmativo -s, Don’t/Doesn’t, Do/Does y Adverbios de Frecuencia',
    description: 'Habla sobre tu día a día, horarios de trabajo, hábitos saludables y preferencias.',
    themeColor: '#ce82ff',
    dialogueSpeakerA: 'Oliver',
    dialogueSpeakerB: 'Sarah',
    dialogueLines: [
      {
        en: 'What time do you usually wake up on weekdays, Sarah?',
        ipa: '/wɒt taɪm du ju ˈjuːʒuəli weɪk ʌp ɒn ˈwiːkdeɪz/',
        es: '¿A qué hora sueles despertarte entre semana, Sarah?'
      },
      {
        en: 'I usually wake up at six thirty and go for a short run before breakfast.',
        ipa: '/aɪ ˈjuːʒuəli weɪk ʌp æt sɪks ˈθɜːrti ænd ɡəʊ fɔːr ə ʃɔːrt rʌn/',
        es: 'Usualmente me despierto a las seis y media y salgo a correr un poco antes del desayuno.'
      },
      {
        en: 'That is impressive! Does your brother exercise in the morning too?',
        ipa: '/ðæt ɪz ɪmˈpresɪv dʌz jʊr ˈbrʌðər ˈeksərsaɪz ɪn ðə ˈmɔːrnɪŋ tuː/',
        es: '¡Eso es impresionante! ¿Tu hermano también hace ejercicio por la mañana?'
      },
      {
        en: 'No, he does not. He prefers going to the gym in the evening.',
        ipa: '/nəʊ hi dʌz nɒt hi prɪˈfɜːrz ˈɡəʊɪŋ tə ðə dʒɪm ɪn ði ˈiːvnɪŋ/',
        es: 'No, él prefiere ir al gimnasio por la tarde-noche.'
      }
    ],
    topics: [
      {
        title: 'Present Simple: Tercera Persona (-s / -es / -ies)',
        enTitle: 'He / She / It Affirmative Rules',
        icon: 'Clock',
        color: 'purple',
        q: '¿Cuál es la conjugación correcta de "study" y "watch" para "She"?',
        voice: 'She studies English and watches documentaries.',
        ans: 'She studies / She watches',
        dist: ['She studys / She watchs', 'She is study / She is watch', 'She study / She watch'],
        exp: 'Consonante + y cambia a "-ies" (studies), y tras -ch/-sh/-s/-x añadimos "-es" (watches).',
        woEs: 'Ella empieza el trabajo a las nueve y termina a las cinco',
        woTarget: ['She', 'starts', 'work', 'at', 'nine', 'and', 'finishes', 'at', 'five'],
        woDist: ['start', 'finish'],
        pairs: [
          { l: 'He works', r: 'Él trabaja (regla general +s)' },
          { l: 'She studies', r: 'Ella estudia (consonante + y → ies)' },
          { l: 'He goes / does', r: 'Él va / hace (+es)' },
          { l: 'She has', r: 'Ella tiene (irregular de have)' }
        ]
      },
      {
        title: 'Negación con Don’t y Doesn’t',
        enTitle: 'Negative Sentences in Present Simple',
        icon: 'ShieldAlert',
        color: 'red',
        q: 'Elige la oración negativa gramaticalmente correcta:',
        voice: 'He does not drink coffee late at night.',
        ans: 'He doesn’t drink coffee at night.',
        dist: ['He doesn’t drinks coffee at night.', 'He don’t drink coffee at night.', 'He not drinks coffee at night.'],
        exp: 'Con el auxiliar "doesn’t", el verbo principal pierde la "-s" y vuelve a su forma base ("drink").',
        woEs: 'Mi jefe no trabaja los domingos',
        woTarget: ['My', 'boss', 'does', 'not', 'work', 'on', 'Sundays'],
        woDist: ['works', 'do'],
        pairs: [
          { l: 'I don’t mind', r: 'No me importa' },
          { l: 'He doesn’t know', r: 'Él no sabe (verbo en base)' },
          { l: 'We don’t commute', r: 'No viajamos diario al trabajo' },
          { l: 'It doesn’t matter', r: 'No importa / Da igual' }
        ]
      },
      {
        title: 'Preguntas con Do y Does',
        enTitle: 'Yes/No & Wh- Questions with Do and Does',
        icon: 'HelpCircle',
        color: 'blue',
        q: '¿Cómo preguntas "¿A qué hora sale el tren?"?',
        voice: 'What time does the train leave?',
        ans: 'What time does the train leave?',
        dist: ['What time leaves the train?', 'What time do the train leaves?', 'What time is the train leave?'],
        exp: 'Para horarios usamos Present Simple: Wh- + does + sujeto singular ("the train") + verbo base ("leave").',
        woEs: '¿Dónde vive tu mejor amigo actualmente?',
        woTarget: ['Where', 'does', 'your', 'best', 'friend', 'live', 'now'],
        woDist: ['do', 'lives'],
        pairs: [
          { l: 'Do you agree?', r: '¿Estás de acuerdo?' },
          { l: 'Does she speak German?', r: '¿Habla ella alemán?' },
          { l: 'How often do you travel?', r: '¿Con qué frecuencia viajas?' },
          { l: 'What does this mean?', r: '¿Qué significa esto?' }
        ]
      },
      {
        title: 'Adverbios de Frecuencia (Always, Usually, Never)',
        enTitle: 'Word Order of Frequency Adverbs',
        icon: 'Calendar',
        color: 'green',
        q: '¿Cuál de estas dos oraciones tiene el adverbio "always" en la posición correcta?',
        voice: 'She is always punctual, and she always checks her emails.',
        ans: 'She is always punctual, and she always checks her emails.',
        dist: ['She always is punctual, and she checks always her emails.', 'Always she is punctual.', 'She is punctual always.'],
        exp: 'Los adverbios de frecuencia van DESPUÉS del verbo To Be ("is always") pero ANTES de los demás verbos ("always checks").',
        woEs: 'Casi nunca cenamos tarde entre semana',
        woTarget: ['We', 'hardly', 'ever', 'have', 'dinner', 'late', 'on', 'weekdays'],
        woDist: ['never', 'eating'],
        pairs: [
          { l: 'Always (100%)', r: 'Siempre' },
          { l: 'Usually / Normally (80%)', r: 'Usualmente / Normalmente' },
          { l: 'Sometimes (50%)', r: 'A veces' },
          { l: 'Hardly ever / Seldom (10%)', r: 'Casi nunca / Rara vez' }
        ]
      },
      {
        title: 'Preposiciones de Tiempo: At, On, In',
        enTitle: 'At (Hours), On (Days/Dates), In (Months/Years)',
        icon: 'Clock',
        color: 'orange',
        q: 'Completa: "The conference is ___ Monday morning ___ 9:00 AM ___ October."',
        voice: 'The conference is on Monday morning at nine AM in October.',
        ans: 'on Monday morning / at 9:00 AM / in October',
        dist: ['in Monday morning / on 9:00 AM / at October', 'at Monday / in 9:00 AM / on October', 'on Monday / on 9:00 AM / on October'],
        exp: 'Usamos ON para días ("on Monday", "on Monday morning"), AT para horas exactas ("at 9:00") e IN para meses/años ("in October").',
        woEs: 'Nuestra reunión de equipo es el viernes a las diez y media',
        woTarget: ['Our', 'team', 'meeting', 'is', 'on', 'Friday', 'at', 'ten', 'thirty'],
        woDist: ['in', 'the'],
        pairs: [
          { l: 'At 7:30 / At night / At noon', r: 'Horas exactas y noche/mediodía' },
          { l: 'On Monday / On July 4th', r: 'Días de la semana y fechas' },
          { l: 'In the morning / In summer', r: 'Partes del día y estaciones' },
          { l: 'In 2026 / In November', r: 'Años, décadas y meses' }
        ]
      },
      {
        title: 'Gustos e Invitaciones (Like + -ing vs Would like to)',
        enTitle: 'Expressing Likes & Polite Invitations',
        icon: 'Heart',
        color: 'purple',
        q: '¿Cuál es la diferencia entre "Do you like cooking?" y "Would you like to cook tonight?"?',
        voice: 'Do you like cooking? Would you like to have dinner with us tonight?',
        ans: '"Do you like + -ing" pregunta por un gusto general; "Would you like to..." es una invitación específica.',
        dist: ['Significan exactamente lo mismo', '"Would you like" solo se usa en pasado', '"Like" nunca puede llevar -ing'],
        exp: '"I like reading" expresa un hobby general; "I’d like to read that book" expresa un deseo específico ahora.',
        woEs: '¿Te gustaría ir al concierto con nosotros este sábado?',
        woTarget: ['Would', 'you', 'like', 'to', 'go', 'to', 'the', 'concert', 'this', 'Saturday'],
        woDist: ['going', 'do'],
        pairs: [
          { l: 'I love traveling', r: 'Me encanta viajar (gusto general)' },
          { l: 'I’d love to visit Japan', r: 'Me encantaría visitar Japón (deseo)' },
          { l: 'I don’t mind waiting', r: 'No me importa esperar (+ -ing)' },
          { l: 'Would you like some tea?', r: '¿Gustas un poco de té? (ofrecimiento)' }
        ]
      }
    ]
  },
  {
    id: 4,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 4: Familia, Hogar y Present Continuous',
    subtitle: 'Acciones en Progreso, Verbos de Estado y Habilidades con Can',
    description: 'Describe lo que está ocurriendo ahora mismo, habla de tu hogar y solicita favores con Can y Could.',
    themeColor: '#ff4b4b',
    dialogueSpeakerA: 'Chloe',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'Hey Mateo! What are you doing right now? Are you busy?',
        ipa: '/heɪ məˈteɪəʊ wɒt ɑːr ju ˈduːɪŋ raɪt naʊ ɑːr ju ˈbɪzi/',
        es: '¡Hola Mateo! ¿Qué estás haciendo ahora mismo? ¿Estás ocupado?'
      },
      {
        en: 'Hi Chloe! I am working from my living room today because it is snowing heavily outside.',
        ipa: '/haɪ ˈkləʊi aɪ æm ˈwɜːrkɪŋ frɒm maɪ ˈlɪvɪŋ ruːm təˈdeɪ bɪˈkɒz ɪt ɪz ˈsnəʊɪŋ/',
        es: '¡Hola Chloe! Hoy estoy trabajando desde mi sala porque está nevando fuerte afuera.'
      },
      {
        en: 'Oh, I see! Could you send me the slides for tomorrow’s presentation when you can?',
        ipa: '/əʊ aɪ siː kʊd ju send mi ðə slaɪdz fɔːr təˈmɒrəʊz ˌprezənˈteɪʃən/',
        es: '¡Oh, ya veo! ¿Podrías enviarme las diapositivas de la presentación de mañana cuando puedas?'
      },
      {
        en: 'Of course! I am finishing the last chart right now. I can email them in five minutes.',
        ipa: '/əv kɔːrs aɪ æm ˈfɪnɪʃɪŋ ðə lɑːst tʃɑːrt raɪt naʊ/',
        es: '¡Por supuesto! Estoy terminando el último gráfico ahora mismo. Puedo enviarlas en cinco minutos.'
      }
    ],
    topics: [
      {
        title: 'Present Continuous (Am / Is / Are + -ing)',
        enTitle: 'Actions Happening Right Now',
        icon: 'Sparkles',
        color: 'red',
        q: 'Completa la oración: "Listen! Someone ___ the piano upstairs."',
        voice: 'Listen! Someone is playing the piano upstairs.',
        ans: 'is playing',
        dist: ['plays', 'playing', 'are playing'],
        exp: 'Con expresiones como "Listen!", "Look!" o "right now", usamos Present Continuous (is + playing).',
        woEs: 'Ellos están preparando la cena en la cocina ahora mismo',
        woTarget: ['They', 'are', 'preparing', 'dinner', 'in', 'the', 'kitchen', 'right', 'now'],
        woDist: ['prepare', 'is'],
        pairs: [
          { l: 'Right now / At the moment', r: 'Ahora mismo / En este momento' },
          { l: 'Currently / Nowadays', r: 'Actualmente / Hoy en día' },
          { l: 'Run → Running', r: 'Dobla consonante final (CVC)' },
          { l: 'Make → Making', r: 'Elimina la -e muda final antes de -ing' }
        ]
      },
      {
        title: 'Contraste: Present Simple vs Present Continuous',
        enTitle: 'Habitual Routines vs Temporary Actions',
        icon: 'ListFilter',
        color: 'blue',
        q: 'Elige la combinación correcta: "I usually ___ by train, but this week I ___ my car."',
        voice: 'I usually commute by train, but this week I am driving my car.',
        ans: 'commute / am driving',
        dist: ['am commuting / drive', 'commutes / driving', 'commute / drive'],
        exp: '"Usually" pide Present Simple (hábito), mientras que "this week" indica una situación temporal (Present Continuous).',
        woEs: 'Ella normalmente enseña en Londres, pero este mes está trabajando en Madrid',
        woTarget: ['She', 'normally', 'teaches', 'in', 'London', 'but', 'this', 'month', 'she', 'is', 'working', 'in', 'Madrid'],
        woDist: ['teaching', 'works'],
        pairs: [
          { l: 'Every day → Present Simple', r: 'Hábito permanente o rutina' },
          { l: 'Right now → Present Continuous', r: 'Acción en progreso' },
          { l: 'This week → Present Continuous', r: 'Situación temporal' },
          { l: 'On Mondays → Present Simple', r: 'Frecuencia repetida' }
        ]
      },
      {
        title: 'Verbos de Estado (Stative Verbs: Know, Want, Need)',
        enTitle: 'Non-Continuous Verbs',
        icon: 'Lightbulb',
        color: 'orange',
        q: '¿Cuál de estas oraciones es CORRECTA cuando hablas de algo que pasa en este instante?',
        voice: 'I understand the problem now, and I need your help.',
        ans: 'I understand the problem now, and I need your help.',
        dist: ['I am understanding the problem now.', 'She is knowing the answer.', 'We are wanting a new laptop.'],
        exp: 'Verbos mentales y emocionales como understand, know, believe, want y need son Stative Verbs y NO llevan -ing.',
        woEs: 'Ahora mismo necesito una respuesta clara porque no entiendo el error',
        woTarget: ['Right', 'now', 'I', 'need', 'a', 'clear', 'answer', 'because', 'I', 'do', 'not', 'understand'],
        woDist: ['needing', 'understanding'],
        pairs: [
          { l: 'I know (✔) / I’m knowing (✘)', r: 'Saber / Conocer (Stative)' },
          { l: 'I believe (✔)', r: 'Creer (Stative)' },
          { l: 'It belongs to me (✔)', r: 'Me pertenece (Stative)' },
          { l: 'I prefer tea (✔)', r: 'Prefiero el té (Stative)' }
        ]
      },
      {
        title: 'Habilidades con Can y Can’t',
        enTitle: 'Expressing Ability & Possibility with Can',
        icon: 'Award',
        color: 'green',
        q: '¿Cuál es la pronunciación y estructura correcta con el modal "can"?',
        voice: 'She can speak three languages fluently.',
        ans: 'She can speak (sin "to" y sin "-s" en tercera persona)',
        dist: ['She cans speak', 'She can to speak', 'She can speaking'],
        exp: 'Los verbos modales como "can" nunca llevan "-s" en he/she/it y van seguidos directamente del verbo base sin "to".',
        woEs: '¿Puedes nadar rápido o tocar algún instrumento musical?',
        woTarget: ['Can', 'you', 'swim', 'fast', 'or', 'play', 'any', 'musical', 'instrument'],
        woDist: ['to', 'Do'],
        pairs: [
          { l: 'I can swim /kən swɪm/', r: 'En afirmativo "can" suena débil /kən/' },
          { l: 'I can’t swim /kɑːnt / kænt/', r: 'En negativo "can’t" siempre se acentúa fuerte' },
          { l: 'Can you hear me?', r: '¿Puedes escucharme?' },
          { l: 'Cannot (una sola palabra)', r: 'Forma escrita formal de can’t' }
        ]
      },
      {
        title: 'Peticiones Corteses: Can you / Could you / Would you mind',
        enTitle: 'Making Polite Requests & Asking Permission',
        icon: 'MessageCircle',
        color: 'purple',
        q: 'Completa la petición cortés con "Would you mind": "Would you mind ___ the window?"',
        voice: 'Would you mind opening the window for a moment?',
        ans: 'opening (siempre con verbo en -ing tras Would you mind)',
        dist: ['to open', 'open', 'opened'],
        exp: 'Mientras que "Could you + verbo base" usa infinitivo sin to, "Would you mind + verbo-ing" requiere gerundio.',
        woEs: '¿Podrías explicarme este párrafo otra vez, por favor?',
        woTarget: ['Could', 'you', 'explain', 'this', 'paragraph', 'to', 'me', 'again', 'please'],
        woDist: ['explaining', 'to'],
        pairs: [
          { l: 'Could you help me?', r: '¿Podrías ayudarme? (+ verbo base)' },
          { l: 'Would you mind waiting?', r: '¿Te importaría esperar? (+ -ing)' },
          { l: 'May I come in?', r: '¿Puedo pasar? (permiso formal)' },
          { l: 'Sure, go ahead!', r: '¡Claro, adelante!' }
        ]
      },
      {
        title: 'El Clima, la Casa y Descripciones',
        enTitle: 'Weather Expressions & Home Vocabulary',
        icon: 'Sparkles',
        color: 'blue',
        q: '¿Cómo preguntas "¿Qué tal está el clima hoy en Londres?"?',
        voice: 'What is the weather like in London today?',
        ans: 'What is the weather like in London today?',
        dist: ['How is the weather like today?', 'What does the weather like?', 'How the weather is?'],
        exp: '"What is [something] like?" significa "¿Cómo es / Qué tal está?" (nunca mezcles "How" con "like").',
        woEs: 'Hoy hace bastante frío y viento en la ciudad',
        woTarget: ['It', 'is', 'quite', 'cold', 'and', 'windy', 'in', 'the', 'city', 'today'],
        woDist: ['makes', 'has'],
        pairs: [
          { l: 'It is sunny and warm', r: 'Está soleado y cálido (en inglés usa It is)' },
          { l: 'It is pouring', r: 'Está lloviendo a cántaros' },
          { l: 'Upstairs / Downstairs', r: 'En el piso de arriba / de abajo' },
          { l: 'What is the weather like?', r: '¿Qué tal está el clima?' }
        ]
      }
    ]
  },
  {
    id: 5,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 5: Viajes, Aeropuerto y Pasado Simple (Regulares)',
    subtitle: 'Was/Were, Verbos Regulares -ed, Auxiliar Did y Check-in',
    description: 'Relata tus viajes, resuelve situaciones en hoteles y aeropuertos y domina el pasado simple.',
    themeColor: '#58cc02',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Oliver',
    dialogueLines: [
      {
        en: 'Welcome back, Oliver! How was your business trip to Edinburgh?',
        ipa: '/ˈwelkəm bæk ˈɒlɪvər haʊ wɒz jʊr ˈbɪznəs trɪp tə ˈedɪnbrə/',
        es: '¡Bienvenido de vuelta, Oliver! ¿Qué tal estuvo tu viaje de negocios a Edimburgo?'
      },
      {
        en: 'It was fantastic! The flight arrived on time, and the hotel was right in the city center.',
        ipa: '/ɪt wɒz fænˈtæstɪk ðə flaɪt əˈraɪvd ɒn taɪm ænd ðə həʊˈtel wɒz raɪt ɪn ðə ˈsɪti ˈsentər/',
        es: '¡Estuvo fantástico! El vuelo llegó a tiempo y el hotel estaba justo en el centro de la ciudad.'
      },
      {
        en: 'Did you visit Edinburgh Castle while you were there?',
        ipa: '/dɪd ju ˈvɪzɪt ˈedɪnbrə ˈkɑːsəl waɪl ju wɜːr ðer/',
        es: '¿Visitaste el Castillo de Edimburgo mientras estuviste allá?'
      },
      {
        en: 'Yes, I did! I walked along the Royal Mile and tried traditional Scottish food.',
        ipa: '/jes aɪ dɪd aɪ wɔːkt əˈlɒŋ ðə ˈrɔɪəl maɪl ænd traɪd trəˈdɪʃənəl ˈskɒtɪʃ fuːd/',
        es: '¡Sí! Caminé por la Royal Mile y probé comida escocesa tradicional.'
      }
    ],
    topics: [
      {
        title: 'Pasado de To Be: Was y Were',
        enTitle: 'Was (I/He/She/It) & Were (You/We/They)',
        icon: 'Plane',
        color: 'green',
        q: 'Completa la pregunta: "___ the flights delayed yesterday?" — "No, they ___ on time."',
        voice: 'Were the flights delayed yesterday? No, they were on time.',
        ans: 'Were / were',
        dist: ['Did / was', 'Was / were', 'Were / did'],
        exp: 'Con el plural "the flights" usamos "Were" sin el auxiliar "did".',
        woEs: '¿Dónde estabas ayer a las ocho de la noche?',
        woTarget: ['Where', 'were', 'you', 'yesterday', 'at', 'eight', 'in', 'the', 'evening'],
        woDist: ['was', 'did'],
        pairs: [
          { l: 'I was born in...', r: 'Nací en... (siempre con was/were born)' },
          { l: 'Were you there?', r: '¿Estuviste allí?' },
          { l: 'There was a problem', r: 'Hubo / Había un problema (singular)' },
          { l: 'There were many tourists', r: 'Había muchos turistas (plural)' }
        ]
      },
      {
        title: 'Past Simple: Verbos Regulares (-ed)',
        enTitle: 'Spelling & Usage of Regular Past Verbs',
        icon: 'Clock',
        color: 'blue',
        q: '¿Cuál es el pasado correcto de los verbos "stop", "try" y "play"?',
        voice: 'The train stopped, we tried the local food, and the band played music.',
        ans: 'stopped / tried / played',
        dist: ['stoped / tryed / plaied', 'stopped / tryed / played', 'stoped / tried / plaied'],
        exp: 'Stop (CVC) dobla la p → stopped; try (consonante+y) cambia a -ied → tried; play (vocal+y) solo añade -ed → played.',
        woEs: 'Reservamos nuestras habitaciones de hotel hace tres semanas',
        woTarget: ['We', 'booked', 'our', 'hotel', 'rooms', 'three', 'weeks', 'ago'],
        woDist: ['booking', 'before'],
        pairs: [
          { l: 'Book → Booked', r: 'Reservar → Reservó' },
          { l: 'Arrive → Arrived', r: 'Llegar → Llegó' },
          { l: 'Try → Tried', r: 'Intentar / Probar → Probó' },
          { l: 'Stop → Stopped', r: 'Detenerse → Se detuvo' }
        ]
      },
      {
        title: 'Negación y Preguntas en Pasado con Did / Didn’t',
        enTitle: 'Did + Subject + Base Verb',
        icon: 'HelpCircle',
        color: 'orange',
        q: 'Identifica la oración correcta en pasado simple:',
        voice: 'Did you check in online before going to the airport?',
        ans: 'Did you check in online? / We didn’t wait long.',
        dist: ['Did you checked in online?', 'We didn’t waited long.', 'Did you were at the gate?'],
        exp: 'Cuando aparece el auxiliar "Did" o "didn’t", el verbo principal va SIEMPRE en forma base (check, wait).',
        woEs: '¿A qué hora aterrizó tu vuelo anoche?',
        woTarget: ['What', 'time', 'did', 'your', 'flight', 'land', 'last', 'night'],
        woDist: ['landed', 'was'],
        pairs: [
          { l: 'Did you enjoy it?', r: '¿Lo disfrutaste?' },
          { l: 'I didn’t receive the email', r: 'No recibí el correo (verbo en base)' },
          { l: 'Where did they stay?', r: '¿Dónde se hospedaron?' },
          { l: 'How long did it take?', r: '¿Cuánto tiempo tomó / tardó?' }
        ]
      },
      {
        title: 'Expresiones de Tiempo Pasado (Ago, Last, Yesterday)',
        enTitle: 'Time Expressions: Two days ago, Last night, Yesterday morning',
        icon: 'Calendar',
        color: 'purple',
        q: '¿Cómo se dice "anoche" y "hace diez minutos" en inglés?',
        voice: 'I called you last night and again ten minutes ago.',
        ans: 'last night / ten minutes ago',
        dist: ['yesterday night / ago ten minutes', 'the last night / before ten minutes', 'in last night / since ten minutes'],
        exp: 'En inglés decimos "last night" (nunca "yesterday night") y "ago" se coloca DESPUÉS del periodo de tiempo ("ten minutes ago").',
        woEs: 'Me mudé a este apartamento hace seis meses',
        woTarget: ['I', 'moved', 'into', 'this', 'apartment', 'six', 'months', 'ago'],
        woDist: ['before', 'last'],
        pairs: [
          { l: 'Last night', r: 'Anoche (nunca digas yesterday night)' },
          { l: 'Yesterday afternoon', r: 'Ayer por la tarde' },
          { l: 'Ten years ago', r: 'Hace diez años (ago va al final)' },
          { l: 'The day before yesterday', r: 'Anteayer' }
        ]
      },
      {
        title: 'Inglés para Aeropuertos y Hoteles',
        enTitle: 'Check-in, Boarding Pass, Gate & Hotel Reception',
        icon: 'Plane',
        color: 'red',
        q: 'En el mostrador de la aerolínea te preguntan: "Would you prefer a window seat or an aisle seat?". ¿Qué significa "aisle seat"?',
        voice: 'Would you prefer a window seat or an aisle seat?',
        ans: 'Asiento de pasillo (la "s" en aisle /aɪl/ es muda)',
        dist: ['Asiento en primera clase', 'Asiento junto a la salida de emergencia', 'Asiento en la parte trasera'],
        exp: '"Aisle" se pronuncia /aɪl/ (como "I’ll") y significa pasillo.',
        woEs: 'Tengo una reservación a nombre de Martínez por cuatro noches',
        woTarget: ['I', 'have', 'a', 'reservation', 'under', 'the', 'name', 'Martinez', 'for', 'four', 'nights'],
        woDist: ['in', 'with'],
        pairs: [
          { l: 'Window / Aisle seat', r: 'Asiento de ventanilla / de pasillo' },
          { l: 'Boarding gate', r: 'Puerta de embarque' },
          { l: 'Carry-on luggage', r: 'Equipaje de mano' },
          { l: 'Check-out time is at noon', r: 'La hora de salida del hotel es al mediodía' }
        ]
      },
      {
        title: 'Pedir y Dar Direcciones en la Ciudad',
        enTitle: 'Asking for & Giving Directions',
        icon: 'MapPin',
        color: 'green',
        q: '¿Qué significa la indicación "Go straight ahead for two blocks and turn left at the traffic lights"?',
        voice: 'Go straight ahead for two blocks and turn left at the traffic lights.',
        ans: 'Sigue todo recto por dos cuadras y gira a la izquierda en el semáforo.',
        dist: ['Cruza el puente y gira a la derecha en la rotonda.', 'Regresa dos calles hacia atrás.', 'Toma la segunda salida a la derecha.'],
        exp: '"Go straight ahead" = sigue recto; "block" = cuadra/manzana; "traffic lights" = semáforo.',
        woEs: 'Disculpe, ¿cómo puedo llegar al museo de ciencias desde aquí?',
        woTarget: ['Excuse', 'me', 'how', 'can', 'I', 'get', 'to', 'the', 'science', 'museum', 'from', 'here'],
        woDist: ['arrive', 'for'],
        pairs: [
          { l: 'Go straight ahead', r: 'Sigue todo recto / derecho' },
          { l: 'Turn left / Turn right', r: 'Gira a la izquierda / a la derecha' },
          { l: 'Take the second turning on the right', r: 'Toma la segunda calle a la derecha' },
          { l: 'It’s a five-minute walk', r: 'Está a cinco minutos caminando' }
        ]
      }
    ]
  },
  {
    id: 6,
    stage: 'Cambridge A1',
    cefrLevel: 'A1',
    title: 'Unidad 6: Pasado Irregular, Salud y Consejos',
    subtitle: '30 Verbos Irregulares Clave, Cuantificadores y Modal Should',
    description: 'Narra anécdotas con verbos irregulares, haz compras de supermercado y da consejos de bienestar.',
    themeColor: '#1cb0f6',
    dialogueSpeakerA: 'Sophia',
    dialogueSpeakerB: 'Liam',
    dialogueLines: [
      {
        en: 'Hi Liam, you look a bit tired today. Did you sleep well last night?',
        ipa: '/haɪ ˈliːəm ju lʊk ə bɪt ˈtaɪərd təˈdeɪ dɪd ju sliːp wel lɑːst naɪt/',
        es: 'Hola Liam, te ves un poco cansado hoy. ¿Dormiste bien anoche?'
      },
      {
        en: 'Not really. I went to bed late because I wrote a long report and drank too much coffee.',
        ipa: '/nɒt ˈrɪəli aɪ went tə bed leɪt bɪˈkɒz aɪ rəʊt ə lɒŋ rɪˈpɔːrt/',
        es: 'La verdad no. Me acosté tarde porque escribí un informe largo y tomé demasiado café.'
      },
      {
        en: 'Oh no! You should take a break this afternoon and drink plenty of water.',
        ipa: '/əʊ nəʊ ju ʃʊd teɪk ə breɪk ðɪs ˌɑːftərˈnuːn ænd drɪŋk ˈplenti əv ˈwɔːtər/',
        es: '¡Oh no! Deberías tomar un descanso esta tarde y beber abundante agua.'
      },
      {
        en: 'You are right. I bought some herbal tea this morning, so I will rest early tonight.',
        ipa: '/ju ɑːr raɪt aɪ bɔːt sʌm ˈhɜːrbəl tiː ðɪs ˈmɔːrnɪŋ/',
        es: 'Tienes razón. Compré té herbal esta mañana, así que descansaré temprano esta noche.'
      }
    ],
    topics: [
      {
        title: 'Verbos Irregulares Esenciales (Go→Went, See→Saw, Buy→Bought)',
        enTitle: 'High-Frequency Irregular Past Verbs (Part 1)',
        icon: 'Flame',
        color: 'blue',
        q: '¿Cuáles son las formas en pasado simple de "go", "buy", "think" y "bring"?',
        voice: 'We went to the store, bought a gift, and brought it to the party.',
        ans: 'went / bought / thought / brought',
        dist: ['goed / buyed / thinked / bringed', 'gone / bought / thought / brang', 'went /ought / thank / brought'],
        exp: 'Go → went; Buy → bought (/bɔːt/); Think → thought (/θɔːt/); Bring → brought (/brɔːt/).',
        woEs: 'Ayer fuimos al centro y compramos entradas para el teatro',
        woTarget: ['Yesterday', 'we', 'went', 'downtown', 'and', 'bought', 'tickets', 'for', 'the', 'theater'],
        woDist: ['to', 'buyed'],
        pairs: [
          { l: 'Go → Went', r: 'Ir → Fue / Fueron' },
          { l: 'See → Saw', r: 'Ver → Vio / Vieron' },
          { l: 'Buy → Bought /bɔːt/', r: 'Comprar → Compró' },
          { l: 'Take → Took /tʊk/', r: 'Tomar / Llevar → Tomó' }
        ]
      },
      {
        title: 'Verbos Irregulares (Parte 2: Write, Speak, Know, Leave)',
        enTitle: 'Irregular Past Verbs in Context',
        icon: 'BookOpen',
        color: 'green',
        q: 'Elige la opción correcta para: "She ___ home at 7:00 AM and ___ with the director."',
        voice: 'She left home at seven AM and spoke with the director.',
        ans: 'left / spoke',
        dist: ['leaved / speaked', 'left / spoken', 'leaves / spoke'],
        exp: 'El pasado de "leave" es "left", y el pasado de "speak" es "spoke".',
        woEs: 'Ellos se conocieron en la universidad y escribieron un libro juntos',
        woTarget: ['They', 'met', 'at', 'university', 'and', 'wrote', 'a', 'book', 'together'],
        woDist: ['meeted', 'written'],
        pairs: [
          { l: 'Meet → Met', r: 'Conocer / Reunirse → Conoció' },
          { l: 'Write → Wrote', r: 'Escribir → Escribió' },
          { l: 'Leave → Left', r: 'Salir / Irse / Dejar → Salió' },
          { l: 'Find → Found', r: 'Encontrar → Encontró' }
        ]
      },
      {
        title: 'Cuantificadores: Much, Many, A lot of, A few, A little',
        enTitle: 'Countable vs Uncountable Quantifiers',
        icon: 'ShoppingBag',
        color: 'orange',
        q: '¿Qué cuantificador se usa con sustantivos INCONTABLES como "time", "water", "traffic" o "information"?',
        voice: 'We do not have much time, and there is a little traffic on the highway.',
        ans: 'Much / A little (poco, pero suficiente)',
        dist: ['Many / A few', 'Several / Both', 'A pareja de'],
        exp: '"Much" y "a little" van con incontables (time, money, water); "many" y "a few" van con contables plurales (books, minutes, people).',
        woEs: 'Solo tenemos unos pocos minutos y muy poca información',
        woTarget: ['We', 'only', 'have', 'a', 'few', 'minutes', 'and', 'very', 'little', 'information'],
        woDist: ['informations', 'many'],
        pairs: [
          { l: 'How many...? (+ plural)', r: '¿Cuántos / Cuántas? (contables)' },
          { l: 'How much...? (+ incontable)', r: '¿Cuánto / Cuánta? (dinero, tiempo, agua)' },
          { l: 'A few friends', r: 'Unos pocos amigos (contable)' },
          { l: 'A little patience', r: 'Un poco de paciencia (incontable)' }
        ]
      },
      {
        title: 'Dar Consejos y Recomendaciones: Should y Shouldn’t',
        enTitle: 'Giving Advice & Health Recommendations',
        icon: 'Heart',
        color: 'purple',
        q: '¿Cómo pides un consejo diciendo "¿Qué debería hacer yo?"?',
        voice: 'What should I do to improve my listening skills?',
        ans: 'What should I do?',
        dist: ['What do I should do?', 'What should I to do?', 'What I should do?'],
        exp: 'Como "should" es un verbo modal, se invierte directamente en preguntas ("What should I do?") y nunca lleva "to".',
        woEs: 'Deberías respaldar tus archivos importantes cada semana',
        woTarget: ['You', 'should', 'back', 'up', 'your', 'important', 'files', 'every', 'week'],
        woDist: ['to', 'shoulds'],
        pairs: [
          { l: 'You should get some rest', r: 'Deberías descansar un poco' },
          { l: 'You shouldn’t skip breakfast', r: 'No deberías saltarte el desayuno' },
          { l: 'I have a headache /ˈhedeɪk/', r: 'Tengo dolor de cabeza' },
          { l: 'Make an appointment', r: 'Sacar / agendar una cita médica' }
        ]
      }
    ]
  },
  {
    id: 7,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 7: El Futuro — Going to, Will y Present Continuous',
    subtitle: 'Planes Previos, Decisiones Espontáneas, Promesas y Predicciones',
    description: 'Domina las 3 formas de hablar del futuro en inglés eligiendo la estructura exacta para cada situación.',
    themeColor: '#ff9600',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'What are your plans for the summer, Mateo? Are you going to travel?',
        ipa: '/wɒt ɑːr jʊr plænz fɔːr ðə ˈsʌmər məˈteɪəʊ ɑːr ju ˈɡəʊɪŋ tə ˈtrævəl/',
        es: '¿Cuáles son tus planes para el verano, Mateo? ¿Vas a viajar?'
      },
      {
        en: 'Yes! I am going to visit Vancouver in July. I already booked my flight.',
        ipa: '/jes aɪ æm ˈɡəʊɪŋ tə ˈvɪzɪt vænˈkuːvər ɪn dʒuˈlaɪ/',
        es: '¡Sí! Voy a visitar Vancouver en julio. Ya reservé mi vuelo.'
      },
      {
        en: 'That sounds amazing! Oh, my phone is ringing—I will call you back in a minute.',
        ipa: '/ðæt saʊndz əˈmeɪzɪŋ əʊ maɪ fəʊn ɪz ˈrɪŋɪŋ aɪ wɪl kɔːl ju bæk/',
        es: '¡Suena increíble! Oh, está sonando mi teléfono; te devuelvo la llamada en un minuto.'
      },
      {
        en: 'No problem at all! I will send you our itinerary on WhatsApp.',
        ipa: '/nəʊ ˈprɒbləm æt ɔːl aɪ wɪl send ju ˈaʊər aɪˈtɪnərəri/',
        es: '¡Ningún problema! Te enviaré nuestro itinerario por WhatsApp.'
      }
    ],
    topics: [
      {
        title: 'Be Going To para Planes e Intenciones Previas',
        enTitle: 'Plans & Evidence-Based Predictions',
        icon: 'Calendar',
        color: 'orange',
        q: 'Cuando ya tomaste la decisión antes de hablar o ves evidencia clara ("Look at those dark clouds!"), ¿qué usas?',
        voice: 'Look at those dark clouds! It is going to rain any minute.',
        ans: 'Be going to + verbo base (It is going to rain)',
        dist: ['Present Simple', 'Past Simple', 'Must'],
        exp: '"Be going to" se usa para planes decididos de antemano y predicciones basadas en evidencia visible.',
        woEs: 'Vamos a lanzar la nueva versión de la aplicación el próximo mes',
        woTarget: ['We', 'are', 'going', 'to', 'launch', 'the', 'new', 'version', 'next', 'month'],
        woDist: ['will', 'launching'],
        pairs: [
          { l: 'I’m going to study', r: 'Plan decidido previamente' },
          { l: 'Watch out! You’re going to fall!', r: 'Evidencia inmediata' },
          { l: 'Gonna (informal hablado)', r: 'Reducción oral de "going to"' },
          { l: 'Are they going to attend?', r: '¿Van a asistir ellos?' }
        ]
      },
      {
        title: 'Will para Decisiones en el Acto, Promesas y Ofertas',
        enTitle: 'Spontaneous Decisions, Promises & Predictions (I think...)',
        icon: 'Sparkles',
        color: 'blue',
        q: 'Estás en un restaurante y el mesero pregunta qué deseas tomar. Decides en ese momento: ¿qué dices?',
        voice: 'I think I will have the grilled salmon, please.',
        ans: 'I’ll have the grilled salmon, please.',
        dist: ['I am going to having the salmon.', 'I have the salmon yesterday.', 'I going to have salmon.'],
        exp: 'Las decisiones tomadas en el momento de hablar (como pedir del menú o contestar la puerta) siempre usan "will" ("I’ll").',
        woEs: 'No te preocupes, te prometo que no llegaré tarde mañana',
        woTarget: ['Do', 'not', 'worry', 'I', 'promise', 'I', 'will', 'not', 'be', 'late', 'tomorrow'],
        woDist: ['going', 'am'],
        pairs: [
          { l: 'I’ll get the door!', r: '¡Yo abro la puerta! (decisión instantánea)' },
          { l: 'I won’t tell anyone', r: 'No le diré a nadie (promesa negativa: will not)' },
          { l: 'I think they’ll win', r: 'Creo que ganarán (predicción de opinión)' },
          { l: 'Shall we start?', r: '¿Empezamos? (sugerencia cortés)' }
        ]
      },
      {
        title: 'Present Continuous para Citas Agendadas en el Futuro',
        enTitle: 'Fixed Arrangements with Time & Place',
        icon: 'Clock',
        color: 'green',
        q: 'Si ya tienes una cita confirmada con el dentista mañana a las 4:00 PM, ¿cómo suena más natural?',
        voice: 'I am seeing the dentist tomorrow at four PM.',
        ans: 'I am seeing the dentist tomorrow at 4:00 PM.',
        dist: ['I see the dentist tomorrow.', 'I will to see the dentist.', 'I am see the dentist.'],
        exp: 'Para compromisos en agenda con hora/lugar confirmados con otra persona, el Present Continuous es la opción más natural.',
        woEs: 'Nos reuniremos con los clientes de Tokio este jueves a las diez',
        woTarget: ['We', 'are', 'meeting', 'the', 'clients', 'from', 'Tokyo', 'this', 'Thursday'],
        woDist: ['will', 'meets'],
        pairs: [
          { l: 'I’m flying to Rome on Friday', r: 'Ya tengo el boleto y fecha fija' },
          { l: 'We’re having dinner with Sarah tonight', r: 'Cita acordada para esta noche' },
          { l: 'The train leaves at 6:00 PM', r: 'Horario oficial de transporte (Present Simple)' },
          { l: 'What are you doing tonight?', r: '¿Qué planes tienes para esta noche?' }
        ]
      },
      {
        title: ' Posibilidad Futura con May y Might',
        enTitle: 'Expressing Uncertainty in the Future',
        icon: 'HelpCircle',
        color: 'purple',
        q: '¿Qué diferencia hay entre "I will go" y "I might go"?',
        voice: 'I am not sure yet, but I might join you after work.',
        ans: '"I will go" es 100% seguro; "I might go" indica un 50% de posibilidad ("quizás vaya").',
        dist: ['"Might" es obligatorio', '"Might" solo se usa en pasado', 'No hay ninguna diferencia'],
        exp: 'May y Might + verbo base expresan posibilidad no confirmada en el presente o futuro.',
        woEs: 'Lleva un paraguas porque podría llover más tarde esta tarde',
        woTarget: ['Take', 'an', 'umbrella', 'because', 'it', 'might', 'rain', 'later', 'this', 'afternoon'],
        woDist: ['to', 'rains'],
        pairs: [
          { l: 'It will definitely happen', r: 'Certeza alta (100%)' },
          { l: 'It will probably happen', r: 'Probabilidad alta (75% - "probably" tras will)' },
          { l: 'It might / may happen', r: 'Posibilidad media (50% - tal vez)' },
          { l: 'It probably won’t happen', r: 'Baja probabilidad ("probably" va ANTES de won’t)' }
        ]
      }
    ]
  },
  {
    id: 8,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 8: Comparativos, Superlativos y Récords',
    subtitle: 'Faster than, More reliable than, The best y As...as',
    description: 'Compara tecnología, ciudades y opciones profesionales con fluidez y precisión.',
    themeColor: '#ce82ff',
    dialogueSpeakerA: 'Oliver',
    dialogueSpeakerB: 'Emily',
    dialogueLines: [
      {
        en: 'Emily, we need to choose between these two cloud servers. Which one is faster?',
        ipa: '/ˈemɪli wi niːd tə tʃuːz bɪˈtwiːn ðiːz tuː klaʊd ˈsɜːrvərz wɪtʃ wʌn ɪz ˈfɑːstər/',
        es: 'Emily, debemos elegir entre estos dos servidores en la nube. ¿Cuál es más rápido?'
      },
      {
        en: 'Server B is slightly more expensive, but it is much more reliable than Server A.',
        ipa: '/ˈsɜːrvər biː ɪz ˈslaɪtli mɔːr ɪkˈspensɪv bʌt ɪt ɪz mʌtʃ mɔːr rɪˈlaɪəbəl/',
        es: 'El Servidor B es ligeramente más caro, pero es mucho más confiable que el Servidor A.'
      },
      {
        en: 'Is it also the most secure option on the market right now?',
        ipa: '/ɪz ɪt ˈɔːlsəʊ ðə məʊst sɪˈkjʊər ˈɒpʃən ɒn ðə ˈmɑːrkɪt raɪt naʊ/',
        es: '¿Es también la opción más segura del mercado ahora mismo?'
      },
      {
        en: 'Yes, by far! And setting it up is just as easy as the previous version.',
        ipa: '/jes baɪ fɑːr ænd ˈsetɪŋ ɪt ʌp ɪz dʒʌst æz ˈiːzi æz ðə ˈpriːviəs ˈvɜːrʒən/',
        es: '¡Sí, por mucho! Y configurarlo es tan fácil como la versión anterior.'
      }
    ],
    topics: [
      {
        title: 'Adjetivos Comparativos (-er vs more... than)',
        enTitle: 'Comparing Two Things',
        icon: 'Award',
        color: 'purple',
        q: '¿Cuál es el comparativo correcto de "easy", "big" y "modern"?',
        voice: 'This app is easier, bigger, and more modern than the old one.',
        ans: 'easier / bigger / more modern',
        dist: ['more easy / biger / moderner', 'easyer / bigger / more modern', 'more easier / more big / modernest'],
        exp: 'Easy (terminado en -y) → easier; Big (CVC) → bigger; Modern (2 sílabas no terminado en -y) → more modern.',
        woEs: 'El tren de alta velocidad es mucho más cómodo que el autobús',
        woTarget: ['The', 'high-speed', 'train', 'is', 'much', 'more', 'comfortable', 'than', 'the', 'bus'],
        woDist: ['most', 'as'],
        pairs: [
          { l: 'Fast → Faster than', r: 'Más rápido que (1 sílaba)' },
          { l: 'Busy → Busier than', r: 'Más ocupado que (-y → -ier)' },
          { l: 'Reliable → More reliable than', r: 'Más confiable que (3+ sílabas)' },
          { l: 'Much / A bit + comparative', r: 'Mucho más / Un poco más...' }
        ]
      },
      {
        title: 'Superlativos (The -est / The most) e Irregulares',
        enTitle: 'Superlatives & Good/Bad/Far',
        icon: 'Sparkles',
        color: 'blue',
        q: '¿Cuáles son las formas comparativa y superlativa de los irregulares "good", "bad" y "far"?',
        voice: 'This is the best solution, and that was the worst traffic ever.',
        ans: 'good → better → the best | bad → worse → the worst | far → further → the furthest',
        dist: ['gooder → goodest | badder → baddest', 'more good → most good | more bad → most bad', 'better → bestest | worser → worst'],
        exp: 'Good, bad y far son totalmente irregulares. Además, después de un superlativo para lugares usamos "in" ("the tallest building in the world", nunca "of").',
        woEs: 'Este es el restaurante más antiguo de toda la ciudad',
        woTarget: ['This', 'is', 'the', 'oldest', 'restaurant', 'in', 'the', 'whole', 'city'],
        woDist: ['of', 'older'],
        pairs: [
          { l: 'Good → Better → The best', r: 'Bueno → Mejor → El mejor' },
          { l: 'Bad → Worse → The worst', r: 'Malo → Peor → El peor' },
          { l: 'Far → Further → The furthest', r: 'Lejos → Más lejos / adicional' },
          { l: 'In the world / In the team', r: 'Usa IN (no OF) con lugares o grupos tras superlativo' }
        ]
      },
      {
        title: 'Igualdad con As...As y Enough / Too',
        enTitle: 'As + Adjective + As, Too + Adj, Adj + Enough',
        icon: 'Lightbulb',
        color: 'green',
        q: '¿Dónde se coloca la palabra "enough" cuando acompaña a un adjetivo como "fast" o "experienced"?',
        voice: 'Is the internet connection fast enough for a video call?',
        ans: 'DESPUÉS del adjetivo (fast enough), pero ANTES de un sustantivo (enough bandwidth)',
        dist: ['Siempre antes del adjetivo (enough fast)', 'Al principio de la oración', 'Reemplaza al verbo'],
        exp: 'Regla clave: Adjetivo + enough ("warm enough", "good enough"), pero enough + Sustantivo ("enough time", "enough money").',
        woEs: 'El café está demasiado caliente y no tenemos suficiente tiempo',
        woTarget: ['The', 'coffee', 'is', 'too', 'hot', 'and', 'we', 'do', 'not', 'have', 'enough', 'time'],
        woDist: ['very', 'times'],
        pairs: [
          { l: 'As fast as', r: 'Tan rápido como (igualdad)' },
          { l: 'Not as expensive as', r: 'No tan caro como' },
          { l: 'Too complicated', r: 'Demasiado complicado (exceso negativo)' },
          { l: 'Clear enough', r: 'Lo suficientemente claro (Adj + enough)' }
        ]
      }
    ]
  },
  {
    id: 9,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 9: Experiencias — Present Perfect Simple',
    subtitle: 'Have/Has + Participio, Ever/Never, Already/Yet/Just y Gone vs Been',
    description: 'Habla de logros, experiencias de vida y acciones recientes con impacto en el presente.',
    themeColor: '#ff4b4b',
    dialogueSpeakerA: 'Sophia',
    dialogueSpeakerB: 'Chloe',
    dialogueLines: [
      {
        en: 'Have you ever given a keynote speech at an international conference, Chloe?',
        ipa: '/hæv ju ˈevər ˈɡɪvən ə ˈkiːnəʊt spiːtʃ æt ən ˌɪntərˈnæʃənəl ˈkɒnfərəns/',
        es: '¿Alguna vez has dado una conferencia magistral en un congreso internacional, Chloe?'
      },
      {
        en: 'Yes, I have! I have spoken at two conferences in Berlin, and I have just received an invitation from Tokyo.',
        ipa: '/jes aɪ hæv aɪ hæv ˈspəʊkən æt tuː ˈkɒnfərənsɪz ɪn bɜːrˈlɪn/',
        es: '¡Sí! He hablado en dos congresos en Berlín y acabo de recibir una invitación de Tokio.'
      },
      {
        en: 'Congratulations! Have you booked your flights to Japan yet?',
        ipa: '/kənˌɡrætʃʊˈleɪʃənz hæv ju bʊkt jʊr flaɪts tə dʒəˈpæn jet/',
        es: '¡Felicidades! ¿Ya reservaste tus vuelos a Japón?'
      },
      {
        en: 'Not yet, but I have already renewed my passport.',
        ipa: '/nɒt jet bʌt aɪ hæv ɔːlˈredi rɪˈnjuːd maɪ ˈpɑːspɔːrt/',
        es: 'Todavía no, pero ya renové mi pasaporte.'
      }
    ],
    topics: [
      {
        title: 'Estructura del Present Perfect (Have/Has + Past Participle)',
        enTitle: 'Life Experiences with Ever & Never',
        icon: 'Sparkles',
        color: 'red',
        q: '¿Por qué es incorrecto decir "I have seen that movie yesterday"?',
        voice: 'I have seen that movie three times. I saw it again yesterday.',
        ans: 'Porque "yesterday" es un tiempo pasado terminado; con fechas cerradas es obligatorio usar Past Simple ("I saw").',
        dist: ['Porque el participio de see es saw', 'Porque "have" solo se usa en futuro', 'Sí es correcto decirlo así'],
        exp: 'El Present Perfect jamás se combina con marcadores de tiempo cerrado (yesterday, last week, in 2020, 5 minutes ago).',
        woEs: '¿Alguna vez has probado comida tailandesa auténtica?',
        woTarget: ['Have', 'you', 'ever', 'tried', 'authentic', 'Thai', 'food'],
        woDist: ['did', 'never'],
        pairs: [
          { l: 'See → Saw → Seen', r: 'Ver → Vio → Visto' },
          { l: 'Write → Wrote → Written', r: 'Escribir → Escribió → Escrito' },
          { l: 'Have been to (fue y volvió)', r: 'She has been to Paris twice' },
          { l: 'Have gone to (sigue allá)', r: 'He has gone to the bank (no está aquí)' }
        ]
      },
      {
        title: 'Just, Already y Yet en Acciones Recientes',
        enTitle: 'Just (Acabar de), Already (Ya) & Yet (Aún no / ¿Ya?)',
        icon: 'Clock',
        color: 'blue',
        q: '¿Dónde se colocan "already", "just" y "yet" en la oración?',
        voice: 'I have already sent the contract, and she has just signed it, but they have not paid yet.',
        ans: '"Just" y "already" van entre have y el participio; "yet" va al final en negativas y preguntas.',
        dist: ['Todos van al principio de la oración', '"Yet" solo se usa en afirmaciones', '"Just" significa solo en futuro'],
        exp: '"I have just finished" equivale en español a "Acabo de terminar".',
        woEs: 'Acabamos de actualizar el servidor pero aún no hemos probado el respaldo',
        woTarget: ['We', 'have', 'just', 'updated', 'the', 'server', 'but', 'we', 'have', 'not', 'tested', 'it', 'yet'],
        woDist: ['already', 'did'],
        pairs: [
          { l: 'I’ve just arrived', r: 'Acabo de llegar' },
          { l: 'We’ve already eaten', r: 'Ya hemos comido' },
          { l: 'Has it started yet?', r: '¿Ya empezó? (pregunta al final)' },
          { l: 'Not yet', r: 'Todavía no / Aún no' }
        ]
      }
    ]
  },
  {
    id: 10,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 10: Reglas, Obligaciones y Permisos (Modales)',
    subtitle: 'Must, Have to, Mustn’t vs Don’t have to, Had better y Can',
    description: 'Distingue obligaciones legales, recomendaciones fuertes y ausencia de necesidad.',
    themeColor: '#58cc02',
    dialogueSpeakerA: 'Oliver',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'Welcome to the company, Mateo! Let me explain a few office guidelines.',
        ipa: '/ˈwelkəm tə ðə ˈkʌmpəni məˈteɪəʊ let mi ɪkˈspleɪn ə fjuː ˈɒfɪs ˈɡaɪdlaɪnz/',
        es: '¡Bienvenido a la empresa, Mateo! Permíteme explicarte algunas pautas de la oficina.'
      },
      {
        en: 'Thanks, Oliver! Do we have to wear formal suits every day?',
        ipa: '/θæŋks ˈɒlɪvər du wi hæv tə wer ˈfɔːrməl suːts ˈevri deɪ/',
        es: '¡Gracias, Oliver! ¿Tenemos que usar traje formal todos los días?'
      },
      {
        en: 'No, you do not have to wear a suit unless we have a client visit, so casual attire is fine.',
        ipa: '/nəʊ ju du nɒt hæv tə wer ə suːt ənˈles wi hæv ə ˈklaɪənt ˈvɪzɪt/',
        es: 'No, no tienes que usar traje a menos que tengamos visita de clientes, así que la ropa casual está bien.'
      },
      {
        en: 'Got it! And I know we must not share our security badges with anyone.',
        ipa: '/ɡɒt ɪt ænd aɪ nəʊ wi mʌst nɒt ʃer ˈaʊər sɪˈkjʊərəti ˈbædʒɪz/',
        es: '¡Entendido! Y sé que está prohibido compartir nuestras credenciales de seguridad con nadie.'
      }
    ],
    topics: [
      {
        title: 'Mustn’t (Prohibición) vs Don’t have to (Opcional)',
        enTitle: 'The Critical Negative Contrast',
        icon: 'ShieldAlert',
        color: 'green',
        q: 'Si trabajar el sábado es totalmente voluntario/opcional, ¿qué oración debes usar?',
        voice: 'You do not have to work on Saturday; it is completely optional.',
        ans: 'You don’t have to work on Saturday.',
        dist: ['You mustn’t work on Saturday.', 'You haven’t to work on Saturday.', 'You must not to work on Saturday.'],
        exp: '"You don’t have to" significa que no es necesario (es opcional); "You mustn’t" significa que está prohibido hacerlo.',
        woEs: 'Los pasajeros no deben desabrocharse el cinturón durante el despegue',
        woTarget: ['Passengers', 'must', 'not', 'unfasten', 'their', 'seatbelts', 'during', 'takeoff'],
        woDist: ['do', 'to'],
        pairs: [
          { l: 'You must wear a helmet', r: 'Obligación estricta / norma' },
          { l: 'You mustn’t park here', r: 'Prohibición total (está prohibido)' },
          { l: 'You don’t have to come', r: 'No es necesario que vengas (opcional)' },
          { l: 'We had to wait (pasado)', r: 'Tuvimos que esperar (pasado de must/have to)' }
        ]
      }
    ]
  },
  {
    id: 11,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 11: Narrativa — Past Continuous y Used to',
    subtitle: 'Acciones Interrumpidas (While/When) y Hábitos del Pasado',
    description: 'Cuenta historias atrapantes combinando tiempos pasados y contrasta el antes y el ahora con Used to.',
    themeColor: '#1cb0f6',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Liam',
    dialogueLines: [
      {
        en: 'How did you come up with the idea for your mobile app, Liam?',
        ipa: '/haʊ dɪd ju kʌm ʌp wɪð ði aɪˈdɪə fɔːr jʊr ˈməʊbaɪl æp/',
        es: '¿Cómo se te ocurrió la idea de tu aplicación móvil, Liam?'
      },
      {
        en: 'Funny story! While I was waiting for a delayed train in Munich, I started sketching the interface.',
        ipa: '/ˈfʌni ˈstɔːri waɪl aɪ wɒz ˈweɪtɪŋ fɔːr ə dɪˈleɪd treɪn ɪn ˈmjuːnɪk/',
        es: '¡Historia curiosa! Mientras estaba esperando un tren retrasado en Múnich, empecé a bocetar la interfaz.'
      },
      {
        en: 'Did you use to work as a freelance designer back then?',
        ipa: '/dɪd ju juːs tə wɜːrk æz ə ˈfriːlɑːns dɪˈzaɪnər bæk ðen/',
        es: '¿Solías trabajar como diseñador independiente en aquel entonces?'
      },
      {
        en: 'Yes, I used to design websites for small cafés, but now I lead a product team.',
        ipa: '/jes aɪ juːst tə dɪˈzaɪn ˈwebsaɪts fɔːr smɔːl ˈkæfeɪz/',
        es: 'Sí, solía diseñar sitios web para pequeñas cafeterías, pero ahora lidero un equipo de producto.'
      }
    ],
    topics: [
      {
        title: 'Past Continuous vs Past Simple (While & When)',
        enTitle: 'Background Action vs Interrupting Event',
        icon: 'BookOpen',
        color: 'blue',
        q: 'Completa: "While I ___ down the street, I ___ into an old friend from college."',
        voice: 'While I was walking down the street, I ran into an old friend from college.',
        ans: 'was walking / ran',
        dist: ['walked / was running', 'was walk / ran', 'were walking / run'],
        exp: 'La acción larga en progreso usa Past Continuous ("was walking") y el evento repentino usa Past Simple ("ran").',
        woEs: 'Estábamos revisando el código cuando se reinició el ordenador',
        woTarget: ['We', 'were', 'reviewing', 'the', 'code', 'when', 'the', 'computer', 'restarted'],
        woDist: ['was', 'restarting'],
        pairs: [
          { l: 'While + Past Continuous', r: 'Mientras ocurría una acción prolongada' },
          { l: 'When + Past Simple', r: 'Cuando ocurrió la interrupción puntual' },
          { l: 'I used to live here', r: 'Solía vivir aquí (hábito pasado terminado)' },
          { l: 'I didn’t use to like coffee', r: 'Antes no me gustaba el café (negativo con Did)' }
        ]
      }
    ]
  },
  {
    id: 12,
    stage: 'Cambridge A2',
    cefrLevel: 'A2',
    title: 'Unidad 12: Condicionales Reales (Zero & First Conditional)',
    subtitle: 'If, Unless, As soon as y Consecuencias Probables',
    description: 'Plantea acuerdos, planes de contingencia y causas-efectos usando condicionales reales.',
    themeColor: '#ff9600',
    dialogueSpeakerA: 'Sophia',
    dialogueSpeakerB: 'Oliver',
    dialogueLines: [
      {
        en: 'Oliver, if we finish the testing phase today, we will deploy the update tomorrow morning.',
        ipa: '/ˈɒlɪvər ɪf wi ˈfɪnɪʃ ðə ˈtestɪŋ feɪz təˈdeɪ wi wɪl dɪˈplɔɪ ði ˈʌpdeɪt/',
        es: 'Oliver, si terminamos la fase de pruebas hoy, desplegaremos la actualización mañana por la mañana.'
      },
      {
        en: 'Sounds good! What will happen if the server load increases suddenly?',
        ipa: '/saʊndz ɡʊd wɒt wɪl ˈhæpən ɪf ðə ˈsɜːrvər ləʊd ɪnˈkriːsɪz ˈsʌdənli/',
        es: '¡Suena bien! ¿Qué pasará si la carga del servidor aumenta repentinamente?'
      },
      {
        en: 'If traffic spikes, the auto-scaling system activates automatically within seconds.',
        ipa: '/ɪf ˈtræfɪk spaɪks ði ˈɔːtəʊ ˈskeɪlɪŋ ˈsɪstəm ˈæktɪveɪts/',
        es: 'Si el tráfico sube de golpe, el sistema de autoescalado se activa automáticamente en segundos.'
      },
      {
        en: 'Great! I will notify the support team as soon as the deployment is live.',
        ipa: '/ɡreɪt aɪ wɪl ˈnəʊtɪfaɪ ðə səˈpɔːrt tiːm æz suːn æz ðə dɪˈplɔɪmənt ɪz laɪv/',
        es: '¡Excelente! Notificaré al equipo de soporte tan pronto como el despliegue esté en vivo.'
      }
    ],
    topics: [
      {
        title: 'First Conditional (If / Unless / As soon as + Present → Will)',
        enTitle: 'Real Future Possibilities & Time Clauses',
        icon: 'Sparkles',
        color: 'orange',
        q: 'Elige la opción correcta: "As soon as she ___ at the airport, she ___ us."',
        voice: 'As soon as she arrives at the airport, she will call us.',
        ans: 'arrives / will call (nunca pongas "will" dentro de la cláusula de as soon as / if / when)',
        dist: ['will arrive / will call', 'arrived / calls', 'arrives / called'],
        exp: 'En inglés las cláusulas temporales futuras (after, when, as soon as, until, if, unless) van en Present Simple.',
        woEs: 'Perderemos el vuelo de conexión a menos que corramos hacia la puerta',
        woTarget: ['We', 'will', 'miss', 'the', 'connecting', 'flight', 'unless', 'we', 'hurry'],
        woDist: ['if', 'will'],
        pairs: [
          { l: 'Zero: If you heat ice, it melts', r: 'Hecho científico 100% verdadero (Present → Present)' },
          { l: 'First: If it rains, we’ll stay in', r: 'Posibilidad real en el futuro (Present → Will)' },
          { l: 'Unless (= If not)', r: 'A menos que / Salvo que' },
          { l: 'As soon as', r: 'Tan pronto como / En cuanto' }
        ]
      }
    ]
  },
  {
    id: 13,
    stage: 'Oxford B1',
    cefrLevel: 'B1',
    title: 'Unidad 13: Entrevistas y Present Perfect Continuous',
    subtitle: 'Have/Has been + -ing, For vs Since y Trayectoria Profesional',
    description: 'Destaca en entrevistas de trabajo describiendo proyectos continuos, logros y experiencia.',
    themeColor: '#ce82ff',
    dialogueSpeakerA: 'Elena (Recruiter)',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'Thanks for joining the interview, Mateo. How long have you been working with React and TypeScript?',
        ipa: '/haʊ lɒŋ hæv ju bɪn ˈwɜːrkɪŋ wɪð riˈækt ænd ˈtaɪpskrɪpt/',
        es: 'Gracias por unirte a la entrevista, Mateo. ¿Cuánto tiempo llevas trabajando con React y TypeScript?'
      },
      {
        en: 'I have been building web and mobile applications with React for over four years, since I graduated.',
        ipa: '/aɪ hæv bɪn ˈbɪldɪŋ web ænd ˈməʊbaɪl ˌæplɪˈkeɪʃənz fɔːr ˈəʊvər fɔːr jɪrz/',
        es: 'Llevo más de cuatro años desarrollando aplicaciones web y móviles con React, desde que me gradué.'
      },
      {
        en: 'Impressive! What kind of projects have you been leading recently?',
        ipa: '/ɪmˈpresɪv wɒt kaɪnd əv ˈprɒdʒekts hæv ju bɪn ˈliːdɪŋ ˈriːsəntli/',
        es: '¡Impresionante! ¿Qué tipo de proyectos has estado liderando recientemente?'
      },
      {
        en: 'Lately, I have been designing offline-first educational platforms for international teams.',
        ipa: '/ˈleɪtli aɪ hæv bɪn dɪˈzaɪnɪŋ ˈɒflaɪn fɜːrst ˌedʒuˈkeɪʃənəl ˈplætfɔːrmz/',
        es: 'Últimamente he estado diseñando plataformas educativas offline-first para equipos internacionales.'
      }
    ],
    topics: [
      {
        title: 'Present Perfect Continuous (Have/Has been + -ing)',
        enTitle: 'Expressing Ongoing Duration ("Llevo X tiempo haciendo...")',
        icon: 'Briefcase',
        color: 'purple',
        q: '¿Cómo se traduce correctamente al inglés "Llevo tres horas esperando el paquete"?',
        voice: 'I have been waiting for the package for three hours.',
        ans: 'I have been waiting for the package for three hours.',
        dist: ['I am waiting for the package since three hours.', 'I wait for three hours.', 'I have waited since three hours.'],
        exp: 'En inglés NUNCA se usa el Present Simple o Continuous solo para decir "Llevo X tiempo..."; se usa Present Perfect Continuous + for/since.',
        woEs: 'Nuestro equipo ha estado desarrollando esta arquitectura desde enero',
        woTarget: ['Our', 'team', 'has', 'been', 'developing', 'this', 'architecture', 'since', 'January'],
        woDist: ['for', 'is'],
        pairs: [
          { l: 'For five years / For a long time', r: 'Durante un periodo de tiempo (For)' },
          { l: 'Since 2022 / Since I arrived', r: 'Desde un punto de inicio exacto (Since)' },
          { l: 'How long have you been...?', r: '¿Cuánto tiempo llevas...?' },
          { l: 'I’ve written 3 reports (Simple)', r: 'Énfasis en la cantidad completada (no en la duración)' }
        ]
      }
    ]
  },
  {
    id: 14,
    stage: 'Oxford B1',
    cefrLevel: 'B1',
    title: 'Unidad 14: Hipótesis y Deseos (Second Conditional & I Wish)',
    subtitle: 'If + Past Simple → Would, If I were you y Estructuras con Wish',
    description: 'Imagina escenarios hipotéticos, negocia condiciones y expresa deseos sobre el presente.',
    themeColor: '#ff4b4b',
    dialogueSpeakerA: 'Chloe',
    dialogueSpeakerB: 'Liam',
    dialogueLines: [
      {
        en: 'Liam, if you could work remotely from anywhere in the world, where would you live?',
        ipa: '/ɪf ju kʊd wɜːrk rɪˈməʊtli frɒm ˈeniwer ɪn ðə wɜːrld wer wʊd ju lɪv/',
        es: 'Liam, si pudieras trabajar en remoto desde cualquier lugar del mundo, ¿dónde vivirías?'
      },
      {
        en: 'If I had complete flexibility, I would spend six months in Lisbon and six months in Kyoto.',
        ipa: '/ɪf aɪ hæd kəmˈpliːt ˌfleksəˈbɪləti aɪ wʊd spend sɪks mʌnθs ɪn ˈlɪzbən/',
        es: 'Si tuviera total flexibilidad, pasaría seis meses en Lisboa y seis meses en Kioto.'
      },
      {
        en: 'That would be incredible! I wish our company offered a global exchange program.',
        ipa: '/ðæt wʊd bi ɪnˈkredəbəl aɪ wɪʃ ˈaʊər ˈkʌmpəni ˈɒfərd ə ˈɡləʊbəl ɪksˈtʃeɪndʒ/',
        es: '¡Eso sería increíble! Ojalá nuestra empresa ofreciera un programa de intercambio global.'
      },
      {
        en: 'If I were you, I would propose that idea at the next town hall meeting!',
        ipa: '/ɪf aɪ wɜːr ju aɪ wʊd prəˈpəʊz ðæt aɪˈdɪə æt ðə nekst taʊn hɔːl ˈmiːtɪŋ/',
        es: '¡Si yo fuera tú, propondría esa idea en la próxima junta general!'
      }
    ],
    topics: [
      {
        title: 'Second Conditional e Hipótesis con I Wish',
        enTitle: 'Unreal Present Situations & Giving Advice',
        icon: 'Lightbulb',
        color: 'red',
        q: 'Completa: "If I ___ more free time, I ___ learn a third language. I wish I ___ more time!"',
        voice: 'If I had more free time, I would learn a third language.',
        ans: 'had / would / had',
        dist: ['would have / will / have', 'have / would / will have', 'had / will / had'],
        exp: 'Tanto después de "If" (en 2nd Conditional) como después de "I wish" (para deseos presentes), el verbo va en Past Simple ("had", "were").',
        woEs: 'Si yo estuviera en tu lugar, aceptaría la beca inmediatamente',
        woTarget: ['If', 'I', 'were', 'in', 'your', 'shoes', 'I', 'would', 'accept', 'the', 'scholarship'],
        woDist: ['was', 'will'],
        pairs: [
          { l: 'If I were you, I’d...', r: 'Si yo fuera tú, yo... (consejo)' },
          { l: 'I wish I knew the answer', r: 'Ojalá supiera la respuesta (ahora)' },
          { l: 'If only we had faster Wi-Fi', r: 'Si tan solo tuviéramos Wi-Fi más rápido' },
          { l: 'Suppose / What if...?', r: '¿Y si...? / Supongamos que...' }
        ]
      }
    ]
  },
  {
    id: 15,
    stage: 'Oxford B1',
    cefrLevel: 'B1',
    title: 'Unidad 15: Voz Pasiva en Ciencia, Negocios y Noticias',
    subtitle: 'Be + Past Participle en Todos los Tiempos Verbales',
    description: 'Enfoca la atención en procesos, descubrimientos y acuerdos usando estructuras pasivas.',
    themeColor: '#58cc02',
    dialogueSpeakerA: 'Prof. Sophia',
    dialogueSpeakerB: 'Oliver',
    dialogueLines: [
      {
        en: 'Has the new laboratory equipment been installed yet, Oliver?',
        ipa: '/hæz ðə njuː ləˈbɒrətəri ɪˈkwɪpmənt bɪn ɪnˈstɔːld jet ˈɒlɪvər/',
        es: '¿Ya fue instalado el nuevo equipo de laboratorio, Oliver?'
      },
      {
        en: 'It is being calibrated right now, and the safety checks will be completed by noon.',
        ipa: '/ɪt ɪz ˈbiːɪŋ ˈkælɪbreɪtɪd raɪt naʊ ænd ðə ˈseɪfti tʃeks wɪl bi kəmˈpliːtɪd/',
        es: 'Está siendo calibrado ahora mismo y las revisiones de seguridad serán completadas al mediodía.'
      },
      {
        en: 'Excellent. Who was the optical sensor designed by?',
        ipa: '/ˈeksələnt huː wɒz ði ˈɒptɪkəl ˈsensər dɪˈzaɪnd baɪ/',
        es: 'Excelente. ¿Por quién fue diseñado el sensor óptico?'
      },
      {
        en: 'It was developed by a research team in Zurich two years ago.',
        ipa: '/ɪt wɒz dɪˈveləpt baɪ ə rɪˈsɜːrtʃ tiːm ɪn ˈzʊərɪk tuː jɪrz əˈɡəʊ/',
        es: 'Fue desarrollado por un equipo de investigación en Zúrich hace dos años.'
      }
    ],
    topics: [
      {
        title: 'La Voz Pasiva en Presente, Pasado, Perfecto y Continuo',
        enTitle: 'Transforming Active to Passive Voice',
        icon: 'Sparkles',
        color: 'green',
        q: '¿Cuál es la forma pasiva correcta de "Our engineers are testing the new update"?',
        voice: 'The new update is being tested by our engineers.',
        ans: 'The new update is being tested by our engineers.',
        dist: ['The new update is tested right now.', 'The new update has been testing.', 'The new update is been tested.'],
        exp: 'En Present Continuous pasivo usamos "am/is/are + being + participio pasado" (is being tested).',
        woEs: 'El contrato fue firmado ayer y los fondos ya han sido transferidos',
        woTarget: ['The', 'contract', 'was', 'signed', 'yesterday', 'and', 'the', 'funds', 'have', 'been', 'transferred'],
        woDist: ['were', 'being'],
        pairs: [
          { l: 'Is made / Are made', r: 'Pasiva en Present Simple' },
          { l: 'Was built / Were built', r: 'Pasiva en Past Simple' },
          { l: 'Is being repaired', r: 'Pasiva en Present Continuous (ahora mismo)' },
          { l: 'Has been approved', r: 'Pasiva en Present Perfect (ya fue aprobado)' }
        ]
      }
    ]
  },
  {
    id: 16,
    stage: 'Oxford B1',
    cefrLevel: 'B1',
    title: 'Unidad 16: Reported Speech (Estilo Indirecto) y Preguntas Indirectas',
    subtitle: 'Say vs Tell, Backshift de Tiempos y Reported Questions',
    description: 'Transmite lo que dijeron clientes, colegas o medios de comunicación con exactitud gramatical.',
    themeColor: '#1cb0f6',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'Mateo, did you speak with the client this morning? What did she say?',
        ipa: '/məˈteɪəʊ dɪd ju spiːk wɪð ðə ˈklaɪənt ðɪs ˈmɔːrnɪŋ wɒt dɪd ʃi seɪ/',
        es: 'Mateo, ¿hablaste con la clienta esta mañana? ¿Qué dijo?'
      },
      {
        en: 'She told me that her team loved the new dashboard design.',
        ipa: '/ʃi təʊld mi ðæt hɜːr tiːm lʌvd ðə njuː ˈdæʃbɔːrd dɪˈzaɪn/',
        es: 'Me dijo que a su equipo le encantó el nuevo diseño del panel.'
      },
      {
        en: 'Did she ask when the mobile version would be ready?',
        ipa: '/dɪd ʃi ɑːsk wen ðə ˈməʊbaɪl ˈvɜːrʒən wʊd bi ˈredi/',
        es: '¿Preguntó cuándo estaría lista la versión móvil?'
      },
      {
        en: 'Yes, she asked if we could release the beta version before next Wednesday.',
        ipa: '/jes ʃi ɑːskt ɪf wi kʊd rɪˈliːs ðə ˈbiːtə ˈvɜːrʒən bɪˈfɔːr nekst ˈwenzdeɪ/',
        es: 'Sí, preguntó si podíamos lanzar la versión beta antes del próximo miércoles.'
      }
    ],
    topics: [
      {
        title: 'Reported Speech: Retroceso de Tiempos y Orden en Preguntas',
        enTitle: 'Tense Backshift & Indirect Question Word Order',
        icon: 'MessageCircle',
        color: 'blue',
        q: 'Al reportar la pregunta directa "Where do you work?", ¿cuál es la única forma correcta?',
        voice: 'She asked me where I worked.',
        ans: 'She asked me where I worked. (orden Sujeto + Verbo, sin auxiliar "do/did")',
        dist: ['She asked me where did I work.', 'She said me where do I work.', 'She told me where I work?'],
        exp: 'En preguntas reportadas o indirectas desaparece la inversión interrogativa y el auxiliar do/does/did: "where I worked".',
        woEs: 'El director nos dijo que la reunión había sido reprogramada',
        woTarget: ['The', 'director', 'told', 'us', 'that', 'the', 'meeting', 'had', 'been', 'rescheduled'],
        woDist: ['said', 'has'],
        pairs: [
          { l: 'Present Simple → Past Simple', r: '"I work" → She said she worked' },
          { l: 'Present Perfect → Past Perfect', r: '"I have finished" → He said he had finished' },
          { l: 'Will → Would / Can → Could', r: '"I will help" → She promised she would help' },
          { l: 'Asked + if / whether', r: 'Para reportar preguntas de Sí/No' }
        ]
      }
    ]
  },
  {
    id: 17,
    stage: 'Oxford B1',
    cefrLevel: 'B1',
    title: 'Unidad 17: Phrasal Verbs y Cláusulas Relativas (Who, Which, Whose)',
    subtitle: 'Phrasal Verbs Separables e Inseparables y Defining vs Non-Defining Clauses',
    description: 'Domina los Phrasal Verbs esenciales del inglés cotidiano y conecta oraciones complejas.',
    themeColor: '#ff9600',
    dialogueSpeakerA: 'Liam',
    dialogueSpeakerB: 'Chloe',
    dialogueLines: [
      {
        en: 'Chloe, have you figured out why the payment gateway was timing out?',
        ipa: '/ˈkləʊi hæv ju ˈfɪɡjərd aʊt waɪ ðə ˈpeɪmənt ˈɡeɪtweɪ wɒz ˈtaɪmɪŋ aʊt/',
        es: 'Chloe, ¿has descifrado por qué la pasarela de pagos estaba agotando el tiempo de espera?'
      },
      {
        en: 'Yes! The API key, which expired at midnight, needed to be renewed.',
        ipa: '/jes ði ˌeɪpiːˈaɪ kiː wɪtʃ ɪkˈspaɪərd æt ˈmɪdnaɪt ˈniːdɪd tə bi rɪˈnjuːd/',
        es: '¡Sí! La clave API, la cual expiró a medianoche, necesitaba renovarse.'
      },
      {
        en: 'Glad you tracked it down! Should we call off the maintenance window then?',
        ipa: '/ɡlæd ju trækt ɪt daʊn ʃʊd wi kɔːl ɒf ðə ˈmeɪntənəns ˈwɪndəʊ ðen/',
        es: '¡Qué bueno que lo localizaste! ¿Deberíamos cancelar la ventana de mantenimiento entonces?'
      },
      {
        en: 'Yes, let us turn it off and look forward to a smooth launch tomorrow.',
        ipa: '/jes let ʌs tɜːrn ɪt ɒf ænd lʊk ˈfɔːrwərd tə ə smuːð lɔːntʃ/',
        es: 'Sí, desactivémosla y esperemos con entusiasmo un lanzamiento fluido mañana.'
      }
    ],
    topics: [
      {
        title: 'Phrasal Verbs Separables vs Inseparables y Relative Clauses',
        enTitle: 'Turn it off, Look forward to + -ing & Who/Which/Whose',
        icon: 'Flame',
        color: 'orange',
        q: '¿Por qué decimos "I look forward to seeing you" con "-ing" después de "to"?',
        voice: 'I look forward to hearing from you soon.',
        ans: 'Porque en "look forward to", la palabra "to" es una preposición, y tras toda preposición el verbo va en -ing.',
        dist: ['Es un error; siempre debe ser "look forward to see"', 'Porque está en Present Continuous', 'Porque "see" es un sustantivo'],
        exp: 'En expresiones como "look forward to", "be used to" y "object to", "to" es preposición y exige gerundio (-ing).',
        woEs: 'La ingeniera cuyo artículo leímos ayer presentará hoy el proyecto',
        woTarget: ['The', 'engineer', 'whose', 'article', 'we', 'read', 'yesterday', 'will', 'present', 'today'],
        woDist: ['who’s', 'which'],
        pairs: [
          { l: 'Put off / Call off', r: 'Posponer / Cancelar' },
          { l: 'Figure out / Find out', r: 'Descifrar / Enterarse o descubrir' },
          { l: 'Run out of', r: 'Quedarse sin / Agotarse' },
          { l: 'Whose (+ sustantivo)', r: 'Cuyo / Cuya (posesión relativa)' }
        ]
      }
    ]
  },
  {
    id: 18,
    stage: 'Oxford B2',
    cefrLevel: 'B2',
    title: 'Unidad 18: El Pasado Irreal — Third y Mixed Conditionals',
    subtitle: 'If + Past Perfect → Would have + V3 y Condicionales Mixtos',
    description: 'Analiza decisiones pasadas, expresa retrospectiva con Wish + Past Perfect y conecta pasado con presente.',
    themeColor: '#ce82ff',
    dialogueSpeakerA: 'Oliver',
    dialogueSpeakerB: 'Sophia',
    dialogueLines: [
      {
        en: 'If we had anticipated the supply chain delay, we would have ordered the components in March.',
        ipa: '/ɪf wi hæd ænˈtɪsɪpeɪtɪd ðə səˈplaɪ tʃeɪn dɪˈleɪ wi wʊd hæv ˈɔːrdərd/',
        es: 'Si hubiéramos anticipado el retraso en la cadena de suministro, habríamos pedido los componentes en marzo.'
      },
      {
        en: 'True, and if we had signed that backup supplier, we would not be facing a shortage right now.',
        ipa: '/truː ænd ɪf wi hæd saɪnd ðæt ˈbækʌp səˈplaɪər wi wʊd nɒt bi ˈfeɪsɪŋ/',
        es: 'Cierto, y si hubiéramos contratado a ese proveedor de respaldo, no estaríamos enfrentando escasez ahora mismo.'
      },
      {
        en: 'In hindsight, I wish we had diversified our logistics partners earlier.',
        ipa: '/ɪn ˈhaɪndsaɪt aɪ wɪʃ wi hæd daɪˈvɜːrsɪfaɪd ˈaʊər ləˈdʒɪstɪks ˈpɑːrtnərz/',
        es: 'En retrospectiva, ojalá hubiéramos diversificado antes nuestros socios logísticos.'
      },
      {
        en: 'At least we learned a valuable lesson that will make our next quarter much stronger.',
        ipa: '/æt liːst wi lɜːrnd ə ˈvæljuəbəl ˈlesən/',
        es: 'Al menos aprendimos una valiosa lección que hará mucho más sólido nuestro próximo trimestre.'
      }
    ],
    topics: [
      {
        title: 'Third Conditional y Condicionales Mixtos',
        enTitle: 'Hypothetical Past & Past-to-Present Consequences',
        icon: 'Lightbulb',
        color: 'purple',
        q: 'Completa el Third Conditional: "If you ___ me about the meeting, I ___ on time."',
        voice: 'If you had told me about the meeting, I would have arrived on time.',
        ans: 'had told / would have arrived',
        dist: ['would have told / had arrived', 'told / would arrive', 'have told / will have arrived'],
        exp: 'La cláusula de "If" lleva Past Perfect (had + V3) y la cláusula principal lleva "would/could/might have + V3".',
        woEs: 'Si hubiéramos salido diez minutos antes, no habríamos perdido el tren',
        woTarget: ['If', 'we', 'had', 'left', 'ten', 'minutes', 'earlier', 'we', 'would', 'not', 'have', 'missed', 'the', 'train'],
        woDist: ['would', 'did'],
        pairs: [
          { l: 'If I had known (3rd Cond.)', r: 'Si lo hubiera sabido' },
          { l: 'I would have helped you', r: 'Te habría ayudado (en el pasado)' },
          { l: 'I wish I had studied more', r: 'Ojalá hubiera estudiado más (lamento pasado)' },
          { l: 'If she had taken the job, she’d live in Rome now', r: 'Mixed Conditional (Pasado → Presente)' }
        ]
      }
    ]
  },
  {
    id: 19,
    stage: 'Oxford B2',
    cefrLevel: 'B2',
    title: 'Unidad 19: Deducción Lógica y Modales Perfectos',
    subtitle: 'Must have, Can’t have, Might have y Should have + Participio',
    description: 'Formula hipótesis lógicas sobre el pasado y evalúa decisiones con precisión B2.',
    themeColor: '#ff4b4b',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Liam',
    dialogueLines: [
      {
        en: 'Liam, where is Mateo? The presentation starts in five minutes!',
        ipa: '/ˈliːəm wer ɪz məˈteɪəʊ ðə ˌprezənˈteɪʃən stɑːrts ɪn faɪv ˈmɪnɪts/',
        es: 'Liam, ¿dónde está Mateo? ¡La presentación empieza en cinco minutos!'
      },
      {
        en: 'His laptop is already on the desk, so he must have arrived earlier.',
        ipa: '/hɪz ˈlæptɒp ɪz ɔːlˈredi ɒn ðə desk səʊ hi mʌst hæv əˈraɪvd ˈɜːrliər/',
        es: 'Su portátil ya está sobre el escritorio, así que seguro llegó más temprano.'
      },
      {
        en: 'He cannot have gone far. Maybe he went to grab a glass of water.',
        ipa: '/hi ˈkænɒt hæv ɡɒn fɑːr ˈmeɪbi hi went tə ɡræb ə ɡlɑːs əv ˈwɔːtər/',
        es: 'No puede haberse ido lejos. Tal vez fue por un vaso de agua.'
      },
      {
        en: 'Look, there he is! We should have texted him before worrying.',
        ipa: '/lʊk ðer hi ɪz wi ʃʊd hæv ˈtekstɪd hɪm bɪˈfɔːr ˈwʌriɪŋ/',
        es: '¡Mira, ahí está! Deberíamos haberle enviado un mensaje antes de preocuparnos.'
      }
    ],
    topics: [
      {
        title: 'Modales Perfectos: Must have, Can’t have y Should have',
        enTitle: 'Past Deduction, Possibility & Regret',
        icon: 'HelpCircle',
        color: 'red',
        q: '¿Qué modal perfecto usas para decir "Es imposible que ella haya dicho eso; la conozco muy bien"?',
        voice: 'She cannot have said that; I know her very well.',
        ans: 'She can’t have said that / She couldn’t have said that.',
        dist: ['She mustn’t have said that.', 'She shouldn’t say that.', 'She may not said that.'],
        exp: 'Para deducir certeza negativa en el pasado ("es imposible que haya ocurrido"), se usa "can’t have + V3" o "couldn’t have + V3".',
        woEs: 'Ellos deben haberse olvidado de nuestra cita porque no están aquí',
        woTarget: ['They', 'must', 'have', 'forgotten', 'about', 'our', 'appointment'],
        woDist: ['can', 'forgot'],
        pairs: [
          { l: 'Must have + V3', r: 'Certeza lógica positiva ("Seguro que pasó")' },
          { l: 'Can’t / Couldn’t have + V3', r: 'Certeza lógica negativa ("Es imposible que haya pasado")' },
          { l: 'Might / May / Could have + V3', r: 'Posibilidad en el pasado ("Quizás pasó")' },
          { l: 'Should have + V3', r: 'Reproche o lamento ("Debería haber hecho...")' }
        ]
      }
    ]
  },
  {
    id: 20,
    stage: 'Oxford B2',
    cefrLevel: 'B2',
    title: 'Unidad 20: Causativos, Conectores de Contraste y Gerundio vs Infinitivo',
    subtitle: 'Have/Get Something Done, Despite/Although y Stop/Remember/Forget',
    description: 'Domina estructuras avanzadas de delegación y matices entre gerundios e infinitivos.',
    themeColor: '#58cc02',
    dialogueSpeakerA: 'Chloe',
    dialogueSpeakerB: 'Oliver',
    dialogueLines: [
      {
        en: 'Oliver, did you translate the legal contract into German yourself?',
        ipa: '/ˈɒlɪvər dɪd ju trænzˈleɪt ðə ˈliːɡəl ˈkɒntrækt ˈɪntə ˈdʒɜːrmən jɔːrˈself/',
        es: 'Oliver, ¿tradujiste tú mismo el contrato legal al alemán?'
      },
      {
        en: 'No, we had it translated by a certified legal agency in Frankfurt.',
        ipa: '/nəʊ wi hæd ɪt trænzˈleɪtɪd baɪ ə ˈsɜːrtɪfaɪd ˈliːɡəl ˈeɪdʒənsi/',
        es: 'No, lo mandamos traducir por una agencia legal certificada en Fráncfort.'
      },
      {
        en: 'Smart move! Despite the tight schedule, they delivered an impeccable document.',
        ipa: '/smɑːrt muːv dɪˈspaɪt ðə taɪt ˈskedʒuːl ðeɪ dɪˈlɪvərd ən ɪmˈpekəbəl ˈdɒkjumənt/',
        es: '¡Buena jugada! A pesar del calendario ajustado, entregaron un documento impecable.'
      },
      {
        en: 'Yes, and please remember to send them the signed receipt before Friday.',
        ipa: '/jes ænd pliːz rɪˈmembər tə send ðem ðə saɪnd rɪˈsiːt bɪˈfɔːr ˈfraɪdeɪ/',
        es: 'Sí, y por favor recuerda enviarles el recibo firmado antes del viernes.'
      }
    ],
    topics: [
      {
        title: 'Causative (Have/Get + Object + V3) y Conectores (Despite vs Although)',
        enTitle: 'Causative Verbs & Contrast Connectors',
        icon: 'Briefcase',
        color: 'green',
        q: '¿Cuál es la diferencia gramatical entre "Although" y "Despite / In spite of"?',
        voice: 'Although it was raining, we went out. Despite the rain, we went out.',
        ans: '"Although" va seguido de Sujeto + Verbo; "Despite" va seguido de un sustantivo o verbo en -ing (nunca lleva "of").',
        dist: ['Se usan exactamente igual', '"Despite" siempre lleva "of" ("Despite of")', '"Although" solo va al final'],
        exp: 'Decimos "Despite the heavy rain" o "In spite of the heavy rain", y "Although it rained heavily".',
        woEs: 'Mandamos auditar nuestros estados financieros con una firma externa',
        woTarget: ['We', 'had', 'our', 'financial', 'statements', 'audited', 'by', 'an', 'external', 'firm'],
        woDist: ['auditing', 'to'],
        pairs: [
          { l: 'Have something done', r: 'Encargar un servicio profesional a otro' },
          { l: 'Despite / In spite of + Noun/-ing', r: 'A pesar de (seguido de sustantivo o gerundio)' },
          { l: 'Although / Even though + Clause', r: 'Aunque (seguido de Sujeto + Verbo)' },
          { l: 'Remember to do vs Remember doing', r: 'Acordarse de una tarea vs Recordar una vivencia pasada' }
        ]
      }
    ]
  },
  {
    id: 21,
    stage: 'Mastery C1',
    cefrLevel: 'C1',
    title: 'Unidad 21: Inversión Estilística y Énfasis Retórico C1',
    subtitle: 'Not only... but also, Seldom, Rarely, Never before y Little did I know',
    description: 'Eleva tu expresión escrita y oratoria ejecutiva con inversiones estilísticas de nivel C1.',
    themeColor: '#1cb0f6',
    dialogueSpeakerA: 'Prof. Sophia',
    dialogueSpeakerB: 'Emily',
    dialogueLines: [
      {
        en: 'Seldom have we seen such an enthusiastic response to a new product launch, Emily.',
        ipa: '/ˈseldəm hæv wi siːn sʌtʃ ən ɪnˌθjuːziˈæstɪk rɪˈspɒns/',
        es: 'Rara vez hemos visto una respuesta tan entusiasta al lanzamiento de un nuevo producto, Emily.'
      },
      {
        en: 'Indeed! Not only did the platform exceed our user targets, but it also achieved a 99% satisfaction rate.',
        ipa: '/ɪnˈdiːd nɒt ˈəʊnli dɪd ðə ˈplætfɔːrm ɪkˈsiːd ˈaʊər ˈjuːzər ˈtɑːrɡɪts/',
        es: '¡En efecto! La plataforma no solo superó nuestras metas de usuarios, sino que también logró un 99% de satisfacción.'
      },
      {
        en: 'Little did we know a year ago that our offline architecture would become our greatest advantage.',
        ipa: '/ˈlɪtəl dɪd wi nəʊ ə jɪər əˈɡəʊ ðæt ˈaʊər ˈɒflaɪn ˈɑːrkɪtektʃər/',
        es: 'Poco imaginábamos hace un año que nuestra arquitectura sin conexión se convertiría en nuestra mayor ventaja.'
      },
      {
        en: 'Under no circumstances should we lower our quality standards as we scale.',
        ipa: '/ˈʌndər nəʊ ˈsɜːrkəmstænsɪz ʃʊd wi ˈləʊər ˈaʊər ˈkwɒləti ˈstændərdz/',
        es: 'Bajo ninguna circunstancia debemos bajar nuestros estándares de calidad mientras escalamos.'
      }
    ],
    topics: [
      {
        title: 'Inversión Negativa (Not only, Seldom, Rarely, Under no circumstances)',
        enTitle: 'C1 Negative & Restrictive Inversion',
        icon: 'Award',
        color: 'blue',
        q: 'Selecciona la oración que aplica correctamente la inversión de nivel C1:',
        voice: 'Not only did she solve the bug, but she also documented the entire process.',
        ans: 'Not only did she solve the bug, but she also documented the process.',
        dist: ['Not only she solved the bug, but also documented.', 'Not only did she solved the bug.', 'Seldom we have seen this.'],
        exp: 'Al iniciar la frase con un adverbio negativo/restrictivo ("Not only", "Seldom", "Never before"), invertimos Auxiliar + Sujeto.',
        woEs: 'Rara vez hemos presenciado un avance científico tan convincente',
        woTarget: ['Seldom', 'have', 'we', 'witnessed', 'such', 'a', 'compelling', 'scientific', 'breakthrough'],
        woDist: ['we', 'did'],
        pairs: [
          { l: 'Not only did they win...', r: 'No solo ganaron, sino que también...' },
          { l: 'Seldom / Rarely have I seen...', r: 'Rara vez he visto...' },
          { l: 'Little did she know...', r: 'Poco sabía / imaginaba ella que...' },
          { l: 'Under no circumstances should you...', r: 'Bajo ninguna circunstancia deberías...' }
        ]
      }
    ]
  },
  {
    id: 22,
    stage: 'Mastery C1',
    cefrLevel: 'C1',
    title: 'Unidad 22: Oraciones Hendidas (Cleft Sentences) y Subjuntivo Formal',
    subtitle: 'What-clauses, It-clefts, Mandative Subjunctive y Conectores Académicos',
    description: 'Estructura argumentos persuasivos en presentaciones, ensayos académicos y juntas directivas.',
    themeColor: '#ff9600',
    dialogueSpeakerA: 'Oliver',
    dialogueSpeakerB: 'Mateo',
    dialogueLines: [
      {
        en: 'Mateo, what really stood out during the audit was the resilience of your database layer.',
        ipa: '/wɒt ˈrɪəli stʊd aʊt ˈdjʊrɪŋ ði ˈɔːdɪt wɒz ðə rɪˈzɪliəns/',
        es: 'Mateo, lo que realmente destacó durante la auditoría fue la resiliencia de tu capa de base de datos.'
      },
      {
        en: 'Thank you, Oliver. It was Chloe who designed the automatic failover mechanism.',
        ipa: '/θæŋk ju ˈɒlɪvər ɪt wɒz ˈkləʊi huː dɪˈzaɪnd ði ˌɔːtəˈmætɪk ˈfeɪləʊvər/',
        es: 'Gracias, Oliver. Fue Chloe quien diseñó el mecanismo de respaldo automático.'
      },
      {
        en: 'The board insisted that every regional branch adopt this exact architecture by Q4.',
        ipa: '/ðə bɔːrd ɪnˈsɪstɪd ðæt ˈevri ˈriːdʒənəl brɑːntʃ əˈdɒpt/',
        es: 'La junta directiva insistió en que cada sucursal regional adopte esta arquitectura exacta para el cuarto trimestre.'
      },
      {
        en: 'Furthermore, what we need now is a clear onboarding guide for the new engineers.',
        ipa: '/ˈfɜːrðərmɔːr wɒt wi niːd naʊ ɪz ə klɪr ˈɒnbɔːrdɪŋ ɡaɪd/',
        es: 'Además, lo que necesitamos ahora es una guía de incorporación clara para los nuevos ingenieros.'
      }
    ],
    topics: [
      {
        title: 'Cleft Sentences (What we need is...) y Subjuntivo Formal',
        enTitle: 'Emphasis Structures & Mandative Subjunctive',
        icon: 'Sparkles',
        color: 'orange',
        q: 'En inglés formal C1, ¿cuál es la forma correcta del subjuntivo en: "It is essential that the CEO ___ informed immediately"?',
        voice: 'It is essential that the CEO be informed immediately.',
        ans: 'be (forma base invariable tras suggest, insist, essential, vital)',
        dist: ['is being', 'was', 'will be'],
        exp: 'El subjuntivo mandativo usa el verbo en su forma base pura ("be", "adopt", "attend") para todas las personas.',
        woEs: 'Lo que realmente impresionó al jurado fue la claridad de tu demostración',
        woTarget: ['What', 'really', 'impressed', 'the', 'jury', 'was', 'the', 'clarity', 'of', 'your', 'demo'],
        woDist: ['That', 'were'],
        pairs: [
          { l: 'What matters most is...', r: 'Lo que más importa es... (Wh- cleft)' },
          { l: 'It was in 2024 that...', r: 'Fue en 2024 cuando... (It- cleft)' },
          { l: 'They insisted that he be present', r: 'Subjuntivo formal con "be" invariable' },
          { l: 'Furthermore / Consequently', r: 'Además / En consecuencia (registro académico)' }
        ]
      }
    ]
  },
  {
    id: 23,
    stage: 'Mastery C1',
    cefrLevel: 'C1',
    title: 'Unidad 23: Modismos Ejecutivos, Negociación y Maestría C1',
    subtitle: 'Diplomatic Hedging, Executive Idioms y Fluidez Nativa',
    description: 'Culmina tu camino dominando el arte de la negociación diplomática, el humor sutil y los modismos de liderazgo.',
    themeColor: '#ce82ff',
    dialogueSpeakerA: 'Emily',
    dialogueSpeakerB: 'Sophia',
    dialogueLines: [
      {
        en: 'Sophia, let me play devil’s advocate for a moment before we sign the merger agreement.',
        ipa: '/let mi pleɪ ˈdevəlz ˈædvəkət fɔːr ə ˈməʊmənt bɪˈfɔːr wi saɪn/',
        es: 'Sophia, permíteme hacer de abogado del diablo un momento antes de que firmemos el acuerdo de fusión.'
      },
      {
        en: 'By all means, Emily! It is time we addressed the elephant in the room regarding integration costs.',
        ipa: '/baɪ ɔːl miːnz ˈemɪli ɪt ɪz taɪm wi əˈdrest ði ˈelɪfənt ɪn ðə ruːm/',
        es: '¡Adelante, Emily! Ya es hora de que abordemos el tema delicado respecto a los costos de integración.'
      },
      {
        en: 'If we read between the lines of their financial report, we cannot afford to cut corners on compliance.',
        ipa: '/ɪf wi riːd bɪˈtwiːn ðə laɪnz əv ðer faɪˈnænʃəl rɪˈpɔːrt/',
        es: 'Si leemos entre líneas su informe financiero, no podemos permitirnos escatimar calidad en cumplimiento normativo.'
      },
      {
        en: 'You hit the nail on the head! Let us bite the bullet and allocate an extra budget for auditing.',
        ipa: '/ju hɪt ðə neɪl ɒn ðə hed let ʌs baɪt ðə ˈbʊlɪt/',
        es: '¡Diste exactamente en el clavo! Afrontemos la situación con determinación y asignemos presupuesto extra para auditoría.'
      }
    ],
    topics: [
      {
        title: 'Modismos Ejecutivos, It’s High Time y Tacto Diplomático (Hedging)',
        enTitle: 'C1 Idioms, Diplomatic Softeners & It’s High Time + Past',
        icon: 'GraduationCap',
        color: 'purple',
        q: '¿Qué tiempo verbal sigue a la estructura C1 "It’s high time" o "It’s about time" ("Ya es hora de que nosotros...")?',
        voice: 'It is high time we addressed the elephant in the room.',
        ans: 'Past Simple con sentido de presente/futuro ("It’s high time we addressed...")',
        dist: ['Present Continuous', 'Future Will', 'Gerundio -ing'],
        exp: 'Al igual que con "I wish", después de "It’s (high/about) time + sujeto" usamos un verbo en Past Simple para indicar que algo ya debería haberse hecho.',
        woEs: 'Ya es hora de que abordemos el problema evidente sin escatimar calidad',
        woTarget: ['It', 'is', 'high', 'time', 'we', 'addressed', 'the', 'elephant', 'in', 'the', 'room'],
        woDist: ['address', 'will'],
        pairs: [
          { l: 'Hit the nail on the head', r: 'Dar exactamente en el clavo' },
          { l: 'Cut corners', r: 'Ahorrar esfuerzo o dinero sacrificando calidad' },
          { l: 'Bite the bullet', r: 'Afrontar una decisión difícil con valentía' },
          { l: 'Play devil’s advocate', r: 'Cuestionar un argumento para ponerlo a prueba' }
        ]
      }
    ]
  }
];

function buildUnitFromBlueprint(bp: UnitBlueprint): Unit {
  const nodes: LessonNode[] = [];
  const colors: ('green' | 'blue' | 'orange' | 'purple' | 'red')[] = ['green', 'blue', 'orange', 'purple', 'red'];

  // Node 1: Lectura Inicial (Dialogue Reading)
  nodes.push({
    id: `u${bp.id}-node-1`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: `Lectura Inicial: ${bp.title.split(':')[1]?.trim() || bp.title}`,
    englishTitle: bp.dialogueTitle,
    description: bp.dialogueContext,
    icon: 'MessageCircle',
    color: 'green',
    totalSteps: 2,
    unlocked: bp.id === 0,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-diag-1`,
        type: 'dialogue-reading',
        prompt: 'Escucha y lee la conversación línea por línea:',
        dialogueTitle: bp.dialogueTitle,
        dialogueContext: bp.dialogueContext,
        dialogueLines: bp.dialogueLines,
        explanation: 'Practicar diálogos reales en contexto entrena tu oído y entonación natural.'
      },
      {
        id: `ex-u${bp.id}-diag-mc`,
        type: 'multiple-choice',
        prompt: `Según el diálogo "${bp.dialogueTitle}", ¿qué frase apareció en la conversación?`,
        englishVoiceText: bp.dialogueLines[0].english,
        options: [
          { id: 'opt-1', text: bp.dialogueLines[0].english, isCorrect: true },
          { id: 'opt-2', text: 'The museum is closed on bank holidays.', isCorrect: false },
          { id: 'opt-3', text: 'We missed the last train to Manchester.', isCorrect: false },
          { id: 'opt-4', text: 'Please turn off the air conditioning.', isCorrect: false }
        ],
        correctAnswerId: 'opt-1',
        explanation: `${bp.dialogueLines[0].speaker} dijo: "${bp.dialogueLines[0].english}" (${bp.dialogueLines[0].spanish}).`
      }
    ]
  });

  // Node 2: Vocabulario Base de la Unidad
  nodes.push({
    id: `u${bp.id}-node-2`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Vocabulario Esencial y Expresiones',
    englishTitle: 'Core Unit Vocabulary & Phrases',
    description: 'Domina las palabras y expresiones clave de la unidad',
    icon: 'BookOpen',
    color: 'blue',
    totalSteps: 3,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-voc-1`,
        type: 'match-pairs',
        prompt: 'Empareja cada expresión en inglés con su significado en español:',
        pairs: bp.vocabPairs,
        explanation: 'Dominar estos bloques de vocabulario te dará fluidez inmediata en este nivel.'
      },
      {
        id: `ex-u${bp.id}-voc-2`,
        type: 'listening',
        prompt: 'Escucha el audio y selecciona el significado correcto:',
        englishVoiceText: bp.vocabPairs[0].left.replace(/\/.*?\//g, '').trim(),
        options: bp.vocabPairs.map((p, idx) => ({
          id: `vopt-${idx}`,
          text: p.right,
          isCorrect: idx === 0
        })),
        correctAnswerId: 'vopt-0',
        explanation: `"${bp.vocabPairs[0].left}" significa "${bp.vocabPairs[0].right}".`
      }
    ]
  });

  // Grammar & Topic Nodes
  bp.grammarTopics.forEach((topic, idx) => {
    const nodeNum = idx + 3;
    nodes.push({
      id: `u${bp.id}-node-${nodeNum}`,
      unitId: bp.id,
      lessonNumber: bp.id,
      title: topic.title,
      englishTitle: topic.englishTitle,
      description: topic.description,
      icon: topic.icon,
      color: topic.color || colors[nodeNum % colors.length],
      totalSteps: 4,
      unlocked: false,
      completedSteps: 0,
      stars: 0,
      exercises: [
        {
          id: `ex-u${bp.id}-t${idx}-mc`,
          type: 'multiple-choice',
          prompt: topic.mcQuestion,
          englishVoiceText: topic.mcVoice,
          options: [
            { id: 'c1', text: topic.mcCorrect, isCorrect: true },
            { id: 'd1', text: topic.mcDistractors[0], isCorrect: false },
            { id: 'd2', text: topic.mcDistractors[1], isCorrect: false },
            { id: 'd3', text: topic.mcDistractors[2], isCorrect: false }
          ],
          correctAnswerId: 'c1',
          explanation: topic.mcExplanation
        },
        {
          id: `ex-u${bp.id}-t${idx}-wo`,
          type: 'word-order',
          prompt: topic.wordOrderPrompt,
          englishVoiceText: topic.wordOrderTarget.join(' '),
          wordBank: [...topic.wordOrderTarget, ...topic.wordOrderDistractors],
          correctSentence: topic.wordOrderTarget,
          explanation: topic.wordOrderExplanation
        },
        {
          id: `ex-u${bp.id}-t${idx}-mp`,
          type: 'match-pairs',
          prompt: 'Relaciona cada estructura o ejemplo con su explicación:',
          pairs: topic.pairItems,
          explanation: topic.mcExplanation
        },
        {
          id: `ex-u${bp.id}-t${idx}-ls`,
          type: 'listening',
          prompt: 'Escucha la oración en inglés y elige la transcripción correcta:',
          englishVoiceText: topic.mcVoice,
          options: [
            { id: 'ls-c', text: topic.mcVoice, isCorrect: true },
            { id: 'ls-d1', text: topic.wordOrderTarget.join(' '), isCorrect: false },
            { id: 'ls-d2', text: bp.dialogueLines[1]?.english || 'Could you repeat that, please?', isCorrect: false },
            { id: 'ls-d3', text: bp.dialogueLines[2]?.english || 'I completely agree with your point.', isCorrect: false }
          ],
          correctAnswerId: 'ls-c',
          explanation: `Se pronunció: "${topic.mcVoice}".`
        }
      ]
    });
  });

  // Extra Node A: Pronunciación, Ritmo y Connected Speech
  const pronTopic = bp.grammarTopics[bp.grammarTopics.length - 1] || bp.grammarTopics[0];
  const pronNodeIdx = nodes.length + 1;
  nodes.push({
    id: `u${bp.id}-node-${pronNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Pronunciación, Ritmo y Connected Speech',
    englishTitle: 'Pronunciation & Natural Linking Lab',
    description: 'Entrena el enlace de palabras, entonación y sonidos clave de esta unidad.',
    icon: 'Mic',
    color: 'blue',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-pron-1`,
        type: 'listening',
        prompt: 'Escucha la pronunciación fluida y selecciona la oración exacta:',
        promptSub: bp.dialogueLines[0]?.ipa,
        englishVoiceText: bp.dialogueLines[0]?.english || pronTopic.mcVoice,
        options: [
          { id: 'pr-c', text: bp.dialogueLines[0]?.english || pronTopic.mcVoice, isCorrect: true },
          { id: 'pr-d1', text: bp.dialogueLines[1]?.english || 'Could you repeat that slower?', isCorrect: false },
          { id: 'pr-d2', text: pronTopic.wordOrderTarget.join(' '), isCorrect: false },
          { id: 'pr-d3', text: bp.dialogueLines[2]?.english || 'Let us check the schedule.', isCorrect: false }
        ],
        correctAnswerId: 'pr-c',
        explanation: `En inglés hablado natural se enlazan las palabras: "${bp.dialogueLines[0]?.english}".`
      },
      {
        id: `ex-u${bp.id}-pron-2`,
        type: 'match-pairs',
        prompt: 'Empareja cada expresión hablada con su traducción:',
        pairs: pronTopic.pairItems,
        explanation: pronTopic.mcExplanation
      }
    ]
  });

  // Extra Node B: Errores Comunes de Hispanohablantes (Common Mistakes)
  const mistakeTopic = bp.grammarTopics[1] || bp.grammarTopics[0];
  const mistakeNodeIdx = nodes.length + 1;
  nodes.push({
    id: `u${bp.id}-node-${mistakeNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Errores Comunes de Hispanohablantes',
    englishTitle: 'Common Mistakes & False Friends',
    description: 'Evita las traducciones literales del español y domina la forma nativa.',
    icon: 'ShieldAlert',
    color: 'orange',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-mist-1`,
        type: 'multiple-choice',
        prompt: `Evita el error común: ${mistakeTopic.mcQuestion}`,
        englishVoiceText: mistakeTopic.mcVoice,
        options: [
          { id: 'ms-c', text: mistakeTopic.mcCorrect, isCorrect: true },
          { id: 'ms-d1', text: mistakeTopic.mcDistractors[0], isCorrect: false },
          { id: 'ms-d2', text: mistakeTopic.mcDistractors[1], isCorrect: false },
          { id: 'ms-d3', text: mistakeTopic.mcDistractors[2], isCorrect: false }
        ],
        correctAnswerId: 'ms-c',
        explanation: mistakeTopic.mcExplanation
      },
      {
        id: `ex-u${bp.id}-mist-2`,
        type: 'word-order',
        prompt: mistakeTopic.wordOrderPrompt,
        englishVoiceText: mistakeTopic.wordOrderTarget.join(' '),
        wordBank: [...mistakeTopic.wordOrderTarget, ...mistakeTopic.wordOrderDistractors],
        correctSentence: mistakeTopic.wordOrderTarget,
        explanation: mistakeTopic.wordOrderExplanation
      }
    ]
  });

  // Reading Passage Node (Lectura del Libro)
  const readingNodeIdx = nodes.length + 1;
  nodes.push({
    id: `u${bp.id}-node-${readingNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Lectura del Libro y Comprensión',
    englishTitle: `Reading & Analysis: ${bp.readingPassage.title}`,
    description: 'Lee el pasaje en inglés, escucha su narración y responde preguntas de comprensión.',
    icon: 'BookOpen',
    color: 'purple',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-read-1`,
        type: 'multiple-choice',
        prompt: bp.readingPassage.question,
        promptSub: bp.readingPassage.englishText,
        englishVoiceText: bp.readingPassage.englishText,
        options: [
          { id: 'r-c', text: bp.readingPassage.correctAnswer, isCorrect: true },
          { id: 'r-d1', text: bp.readingPassage.distractors[0], isCorrect: false },
          { id: 'r-d2', text: bp.readingPassage.distractors[1], isCorrect: false },
          { id: 'r-d3', text: bp.readingPassage.distractors[2], isCorrect: false }
        ],
        correctAnswerId: 'r-c',
        explanation: `${bp.readingPassage.explanation} (${bp.readingPassage.spanishSummary})`
      }
    ]
  });

  // Workbook: Construcción de Oraciones Node
  const sentenceNodeIdx = nodes.length + 1;
  nodes.push({
    id: `u${bp.id}-node-${sentenceNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Workbook: Construcción de Oraciones',
    englishTitle: 'Sentence Structure & Word Order Lab',
    description: 'Practica el orden sintáctico exacto en afirmaciones, negaciones y preguntas.',
    icon: 'Flame',
    color: 'green',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: bp.grammarTopics.slice(0, 4).map((t, tIdx) => ({
      id: `ex-u${bp.id}-wb-wo-${tIdx}`,
      type: 'word-order' as const,
      prompt: t.wordOrderPrompt,
      englishVoiceText: t.wordOrderTarget.join(' '),
      wordBank: [...t.wordOrderTarget, ...t.wordOrderDistractors],
      correctSentence: t.wordOrderTarget,
      explanation: t.wordOrderExplanation
    }))
  });

  // Workbook: Práctica Auditiva Node
  const listenNodeIdx = nodes.length + 1;
  nodes.push({
    id: `u${bp.id}-node-${listenNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: 'Workbook: Práctica Auditiva',
    englishTitle: 'Listening Comprehension Drill',
    description: 'Entrena tu comprensión auditiva con las estructuras de esta unidad.',
    icon: 'Headphones',
    color: 'orange',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: bp.dialogueLines.map((line, lIdx) => ({
      id: `ex-u${bp.id}-wb-ls-${lIdx}`,
      type: 'listening' as const,
      prompt: 'Escucha la intervención y selecciona su significado en español:',
      promptSub: line.ipa,
      englishVoiceText: line.english,
      options: bp.dialogueLines.map((candidate, cIdx) => ({
        id: `wbl-opt-${cIdx}`,
        text: candidate.spanish,
        isCorrect: cIdx === lIdx
      })),
      correctAnswerId: `wbl-opt-${lIdx}`,
      explanation: `"${line.english}" se traduce como "${line.spanish}".`
    }))
  });

  // Workbook: Integración y Dominio Final
  const finalNodeIdx = nodes.length + 1;
  const firstTopic = bp.grammarTopics[0];
  nodes.push({
    id: `u${bp.id}-node-${finalNodeIdx}`,
    unitId: bp.id,
    lessonNumber: bp.id,
    title: `Examen Integrador Unidad ${bp.id}`,
    englishTitle: `Unit ${bp.id} Mastery Exam`,
    description: 'Integra vocabulario, gramática, escucha y orden de oraciones de toda la unidad.',
    icon: 'Award',
    color: 'red',
    totalSteps: 12,
    unlocked: false,
    completedSteps: 0,
    stars: 0,
    exercises: [
      {
        id: `ex-u${bp.id}-final-1`,
        type: 'word-order',
        prompt: firstTopic.wordOrderPrompt,
        englishVoiceText: firstTopic.wordOrderTarget.join(' '),
        wordBank: [...firstTopic.wordOrderTarget, ...firstTopic.wordOrderDistractors],
        correctSentence: firstTopic.wordOrderTarget,
        explanation: firstTopic.wordOrderExplanation
      },
      {
        id: `ex-u${bp.id}-final-2`,
        type: 'match-pairs',
        prompt: 'Repaso integrador de expresiones clave de la unidad:',
        pairs: bp.vocabPairs,
        explanation: '¡Has consolidado los conceptos esenciales de esta unidad!'
      }
    ]
  });

  return {
    id: bp.id,
    stage: bp.stage,
    cefrLevel: bp.cefrLevel,
    title: bp.title,
    subtitle: bp.subtitle,
    description: bp.description,
    themeColor: bp.themeColor,
    nodes
  };
}

function expandAdditionalSpecToBlueprint(spec: (typeof ADDITIONAL_UNIT_SPECS)[number]): UnitBlueprint {
  const baseTopics = spec.topics;
  // Expand to 8 rich grammar/skill topics per unit so every single unit has 16 serpentine nodes!
  const subThemes = [
    { suffix: 'Estructuras Base y Reglas', icon: 'BookOpen', color: 'blue' as const },
    { suffix: 'Negación, Contraste y Matices', icon: 'ShieldAlert', color: 'orange' as const },
    { suffix: 'Preguntas Directas e Indirectas', icon: 'HelpCircle', color: 'purple' as const },
    { suffix: 'Expresiones Coloquiales y Phrasal Verbs', icon: 'Flame', color: 'red' as const },
    { suffix: 'Inglés Profesional y Situaciones Reales', icon: 'Briefcase', color: 'green' as const },
    { suffix: 'Collocations y Fluidez Conversacional', icon: 'MessageCircle', color: 'purple' as const },
    { suffix: 'Comprensión en Contexto Real', icon: 'Compass', color: 'blue' as const },
    { suffix: 'Práctica Intensiva de Gramática', icon: 'Award', color: 'orange' as const }
  ];

  const expandedTopics: UnitBlueprint['grammarTopics'] = subThemes.map((theme, idx) => {
    const source = baseTopics[idx % baseTopics.length];
    const title = idx < baseTopics.length ? source.title : `${theme.suffix} (${spec.cefrLevel})`;
    const enTitle = idx < baseTopics.length ? source.enTitle : `${source.enTitle} — Part ${idx + 1}`;
    const lineRef = spec.dialogueLines[idx % spec.dialogueLines.length];
    return {
      title,
      englishTitle: enTitle,
      description: `Práctica enfocada de ${title.toLowerCase()} en nivel ${spec.cefrLevel}.`,
      icon: idx < baseTopics.length ? source.icon : theme.icon,
      color: idx < baseTopics.length ? source.color : theme.color,
      mcQuestion: idx < baseTopics.length ? source.q : `En el contexto de la ${spec.title.split(':')[0]}, elige la opción correcta:`,
      mcVoice: idx < baseTopics.length ? source.voice : lineRef.en,
      mcCorrect: idx < baseTopics.length ? source.ans : lineRef.en,
      mcDistractors: source.dist,
      mcExplanation: source.exp,
      wordOrderPrompt: idx % 2 === 0 ? source.woEs : `Ordena la intervención: "${lineRef.es}"`,
      wordOrderTarget:
        idx % 2 === 0
          ? source.woTarget
          : lineRef.en
              .replace(/[.,!?]/g, '')
              .split(/\s+/)
              .slice(0, 9),
      wordOrderDistractors: source.woDist,
      wordOrderExplanation: source.exp,
      pairItems: source.pairs.map((p, pIdx) => ({
        id: `u${spec.id}-t${idx}-p${pIdx}`,
        left: p.l,
        right: p.r
      })) as [MatchPair, MatchPair, MatchPair, MatchPair]
    };
  });

  return {
    id: spec.id,
    stage: spec.stage,
    cefrLevel: spec.cefrLevel,
    title: spec.title,
    subtitle: spec.subtitle,
    description: spec.description,
    themeColor: spec.themeColor,
    dialogueTitle: `Diálogo Unidad ${spec.id}: ${spec.subtitle.split(',')[0]}`,
    dialogueContext: `Conversación situacional entre ${spec.dialogueSpeakerA} y ${spec.dialogueSpeakerB} (${spec.stage}).`,
    dialogueLines: spec.dialogueLines.map((l, i) => ({
      speaker: i % 2 === 0 ? spec.dialogueSpeakerA : spec.dialogueSpeakerB,
      english: l.en,
      ipa: l.ipa,
      spanish: l.es,
      audioText: l.en
    })),
    vocabPairs: spec.topics[0].pairs.map((p, i) => ({
      id: `u${spec.id}-vp-${i}`,
      left: p.l,
      right: p.r
    })),
    grammarTopics: expandedTopics,
    readingPassage: {
      title: `Cultural & Real-World Insight — Unit ${spec.id} (${spec.cefrLevel})`,
      englishText: `${spec.dialogueLines[0].en} ${spec.dialogueLines[1].en} ${spec.dialogueLines[2].en} ${spec.dialogueLines[3].en}`,
      spanishSummary: `${spec.dialogueLines[0].es} ${spec.dialogueLines[1].es}`,
      question: `What is the main takeaway from the Unit ${spec.id} reading passage?`,
      correctAnswer: spec.dialogueLines[1].en,
      distractors: [
        'They decided to cancel the entire project immediately.',
        'Nobody was available to attend the international conference.',
        'The train station was closed for renovations.'
      ],
      explanation: `En el pasaje se destaca: "${spec.dialogueLines[1].en}" (${spec.dialogueLines[1].es}).`
    }
  };
}

export const englishCurriculum: Unit[] = [
  ...UNIT_BLUEPRINTS.map(buildUnitFromBlueprint),
  ...ADDITIONAL_UNIT_SPECS.map((spec) => buildUnitFromBlueprint(expandAdditionalSpecToBlueprint(spec)))
];
