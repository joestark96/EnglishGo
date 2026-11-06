export interface TheoryExample {
  english: string;
  ipa: string;
  spanish: string;
}

export interface TheorySection {
  id: string;
  title: string;
  englishSubtitle: string;
  category: 'grammar' | 'phonetics' | 'vocabulary' | 'culture';
  summary: string;
  content: string[];
  formula?: string;
  examples: TheoryExample[];
}

export interface UnitTheory {
  unitId: number;
  stageLabel: string;
  title: string;
  description: string;
  themeColor: string;
  sections: TheorySection[];
}

export const unitTheories: UnitTheory[] = [
  {
    unitId: 0,
    stageLabel: 'Fonética & IPA',
    title: 'Los 44 Sonidos del Inglés, Schwa y Ritmo',
    description: 'Domina la diferencia entre cómo se escribe el inglés y cómo suena realmente con el Alfabeto Fonético Internacional (IPA).',
    themeColor: '#58cc02',
    sections: [
      {
        id: 'th-0-1',
        title: 'El Sonido Schwa /ə/ y el Ritmo Acentual',
        englishSubtitle: 'The Schwa Sound & Stress-Timed Rhythm',
        category: 'phonetics',
        summary: 'El sonido vocálico más frecuente del inglés aparece en todas las sílabas átonas.',
        formula: 'Sílaba Tónica (Fuerte y Clara) + Sílaba Átona → /ə/',
        content: [
          'A diferencia del español (donde cada vocal suena igual de clara), el inglés reduce las vocales no acentuadas al sonido neutro /ə/ (Schwa).',
          'Palabras funcionales como "to", "for", "of", "can" y "from" se pronuncian con /ə/ en conversación fluida (/tə/, /fər/, /əv/).'
        ],
        examples: [
          { english: 'Wait a minute, I want a cup of coffee.', ipa: '/weɪt ə ˈmɪnɪt aɪ wɒnt ə kʌp əv ˈkɒfi/', spanish: 'Espera un minuto, quiero una taza de café.' },
          { english: 'Photography is an amazing profession.', ipa: '/fəˈtɒɡrəfi ɪz ən əˈmeɪzɪŋ prəˈfeʃən/', spanish: 'La fotografía es una profesión increíble.' }
        ]
      },
      {
        id: 'th-0-2',
        title: 'Las 3 Pronunciaciones del Pasado Regular (-ed)',
        englishSubtitle: '-ed Ending Pronunciation Rules (/t/, /d/, /ɪd/)',
        category: 'phonetics',
        summary: 'Nunca pronuncies "-ed" como "/ed/" salvo después de los sonidos /t/ o /d/.',
        formula: 'Sordas → /t/ • Sonoras/Vocales → /d/ • Tras T o D → /ɪd/',
        content: [
          '1. Si el verbo termina en sonido sordo (/p/, /k/, /f/, /s/, /ʃ/, /tʃ/), la terminación "-ed" suena como una /t/ seca: worked (/wɜːrkt/), watched (/wɒtʃt/).',
          '2. Si termina en vocal o sonido sonoro (/b/, /g/, /v/, /z/, /l/, /m/, /n/, /r/), suena como /d/: played (/pleɪd/), called (/kɔːld/).',
          '3. Solo si el verbo base ya termina en sonido /t/ o /d/, añadimos una sílaba extra /ɪd/: wanted (/ˈwɒntɪd/), needed (/ˈniːdɪd/).'
        ],
        examples: [
          { english: 'She worked late and watched a movie.', ipa: '/ʃi wɜːrkt leɪt ænd wɒtʃt ə ˈmuːvi/', spanish: 'Ella trabajó hasta tarde y vio una película.' },
          { english: 'We decided to visit the museum.', ipa: '/wi dɪˈsaɪdɪd tə ˈvɪzɪt ðə mjuˈziːəm/', spanish: 'Decidimos visitar el museo.' }
        ]
      }
    ]
  },
  {
    unitId: 1,
    stageLabel: 'Cambridge A1 • Unidad 1',
    title: 'Nuevos Amigos, Verbo To Be y Presentaciones',
    description: 'Estructuras esenciales para presentarte, hablar de tu origen, profesión y hacer preguntas directas.',
    themeColor: '#1cb0f6',
    sections: [
      {
        id: 'th-1-1',
        title: 'El Verbo To Be (Am, Is, Are)',
        englishSubtitle: 'Affirmative, Negative & Interrogative Forms',
        category: 'grammar',
        summary: 'En inglés el sujeto nunca se omite y el verbo "to be" se invierte para hacer preguntas.',
        formula: 'Afirmativo: Sujeto + am/is/are • Pregunta: Am/Is/Are + Sujeto + ...?',
        content: [
          'Usamos "am" con I, "is" con he/she/it, y "are" con you/we/they.',
          'En inglés también usamos "to be" para decir la edad ("I am twenty-five years old", nunca con "have") y estados como hambre o frío ("Are you hungry?").'
        ],
        examples: [
          { english: 'Hi! I am Emily, and I am twenty-four years old.', ipa: '/haɪ aɪ æm ˈemɪli ænd aɪ æm ˈtwenti fɔːr jɪrz əʊld/', spanish: '¡Hola! Soy Emily y tengo veinticuatro años.' },
          { english: 'Are you from Madrid? No, I am from Barcelona.', ipa: '/ɑːr ju frɒm məˈdrɪd nəʊ aɪ æm frɒm ˌbɑːrsəˈləʊnə/', spanish: '¿Eres de Madrid? No, soy de Barcelona.' }
        ]
      },
      {
        id: 'th-1-2',
        title: 'Preguntas Informativas (Wh- Questions)',
        englishSubtitle: 'Where, What, Who, How old, How',
        category: 'grammar',
        summary: 'Coloca la palabra interrogativa al inicio seguida de am/is/are.',
        formula: 'Wh- Word + am/is/are + Sujeto + Complemento?',
        content: [
          'Las preposiciones como "from" o "about" suelen colocarse al final de la pregunta en inglés natural: "Where are you from?".'
        ],
        examples: [
          { english: 'What is your email address?', ipa: '/wɒt ɪz jʊr ˈiːmeɪl əˈdres/', spanish: '¿Cuál es tu dirección de correo electrónico?' },
          { english: 'Who is that person over there?', ipa: '/huː ɪz ðæt ˈpɜːrsən ˈəʊvər ðer/', spanish: '¿Quién es esa persona de allá?' }
        ]
      }
    ]
  },
  {
    unitId: 2,
    stageLabel: 'Cambridge A1 • Unidad 2',
    title: 'En la Ciudad, De Compras y Existencia',
    description: 'Demostrativos (this/that/these/those), artículos (a/an/the), precios y describir lugares con There is / There are.',
    themeColor: '#ff9600',
    sections: [
      {
        id: 'th-2-1',
        title: 'Demostrativos: This, That, These, Those',
        englishSubtitle: 'Singular vs Plural & Near vs Far',
        category: 'grammar',
        summary: 'Distingue objetos cercanos y lejanos tanto en singular como en plural.',
        formula: 'Cerca: This (sing.) / These (pl.) • Lejos: That (sing.) / Those (pl.)',
        content: [
          'Presta especial atención a la pronunciación: "this" (/ðɪs/, vocal corta y S sorda) vs "these" (/ðiːz/, vocal larga y Z sonora).'
        ],
        examples: [
          { english: 'How much is this leather jacket?', ipa: '/haʊ mʌtʃ ɪz ðɪs ˈleðər ˈdʒækɪt/', spanish: '¿Cuánto cuesta esta chaqueta de cuero?' },
          { english: 'Those shoes on the top shelf are on sale.', ipa: '/ðəʊz ʃuːz ɒn ðə tɒp ʃelf ɑːr ɒn seɪl/', spanish: 'Esos zapatos en el estante superior están en oferta.' }
        ]
      },
      {
        id: 'th-2-2',
        title: 'Existencia: There is y There are',
        englishSubtitle: 'Describing Places & Quantities',
        category: 'grammar',
        summary: 'Equivale al verbo impersonal "hay" en español, pero concuerda en singular o plural.',
        formula: 'There is + singular/incontable • There are + plural',
        content: [
          'Para preguntar invertimos: "Is there a pharmacy near here?" / "Are there any free tables?".'
        ],
        examples: [
          { english: 'There is a cozy coffee shop across the street.', ipa: '/ðer ɪz ə ˈkəʊzi ˈkɒfi ʃɒp əˈkrɒs ðə striːt/', spanish: 'Hay una cafetería acogedora cruzando la calle.' },
          { english: 'Are there any ATMs in this station?', ipa: '/ɑːr ðer ˈeni ˌeɪtiːˈemz ɪn ðɪs ˈsteɪʃən/', spanish: '¿Hay cajeros automáticos en esta estación?' }
        ]
      }
    ]
  },
  {
    unitId: 3,
    stageLabel: 'Cambridge A1 • Unidad 3',
    title: 'Rutinas Diarias, Present Simple y Frecuencia',
    description: 'Habla de tus hábitos, horarios de trabajo, gustos y cómo formular preguntas con Do y Does.',
    themeColor: '#ce82ff',
    sections: [
      {
        id: 'th-3-1',
        title: 'Present Simple y Auxiliares Do / Does',
        englishSubtitle: 'Habits, Schedules & Third Person -s',
        category: 'grammar',
        summary: 'En afirmaciones con He/She/It añadimos -s al verbo; con Do/Does el verbo vuelve a su forma base.',
        formula: '(+) He works • (-) He doesn’t work • (?) Does he work?',
        content: [
          'Los adverbios de frecuencia (always, usually, often, sometimes, never) van ANTES del verbo principal ("I usually drink tea"), pero DESPUÉS del verbo to be ("She is always on time").'
        ],
        examples: [
          { english: 'She usually starts work at nine in the morning.', ipa: '/ʃi ˈjuːʒuəli stɑːrts wɜːrk æt naɪn ɪn ðə ˈmɔːrnɪŋ/', spanish: 'Ella usualmente empieza a trabajar a las nueve de la mañana.' },
          { english: 'What time do you finish your shift on Fridays?', ipa: '/wɒt taɪm du ju ˈfɪnɪʃ jʊr ʃɪft ɒn ˈfraɪdeɪz/', spanish: '¿A qué hora terminas tu turno los viernes?' }
        ]
      }
    ]
  },
  {
    unitId: 4,
    stageLabel: 'Cambridge A1 • Unidad 4',
    title: 'Hogar, Present Continuous y Habilidades (Can)',
    description: 'Contrasta acciones en progreso ahora mismo con hábitos generales y expresa habilidades o peticiones.',
    themeColor: '#ff4b4b',
    sections: [
      {
        id: 'th-4-1',
        title: 'Present Continuous vs Present Simple',
        englishSubtitle: 'Right Now vs Every Day & Stative Verbs',
        category: 'grammar',
        summary: 'Usa am/is/are + -ing para acciones en curso o planes cercanos confirmados.',
        formula: 'Sujeto + am/is/are + Verbo-ing',
        content: [
          'Los verbos de estado mental o posesión (know, understand, believe, want, need, belong) NO suelen usarse con -ing: decimos "I understand now", nunca "I am understanding".'
        ],
        examples: [
          { english: 'I usually work from the office, but today I am working from home.', ipa: '/aɪ ˈjuːʒuəli wɜːrk frɒm ði ˈɒfɪs bʌt təˈdeɪ aɪ æm ˈwɜːrkɪŋ frɒm həʊm/', spanish: 'Usualmente trabajo desde la oficina, pero hoy estoy trabajando desde casa.' }
        ]
      }
    ]
  },
  {
    unitId: 5,
    stageLabel: 'Cambridge A1 • Unidad 5',
    title: 'Viajes y Pasado Simple (Was/Were & Regulares)',
    description: 'Relata viajes pasados, experiencias en hoteles y aeropuertos usando Was/Were y el auxiliar Did.',
    themeColor: '#58cc02',
    sections: [
      {
        id: 'th-5-1',
        title: 'Past Simple: Was/Were y Auxiliar Did',
        englishSubtitle: 'Talking About Past Events & Trips',
        category: 'grammar',
        summary: 'Con "didn’t" y "Did...?", el verbo principal se mantiene en forma base (sin -ed).',
        formula: '(+) We booked • (-) We didn’t book • (?) Did you book?',
        content: [
          'Con Was/Were no se usa Did: "Were you at the airport on time?" / "The flight wasn’t delayed".'
        ],
        examples: [
          { english: 'Did you enjoy your trip to Scotland last month?', ipa: '/dɪd ju ɪnˈdʒɔɪ jʊr trɪp tə ˈskɒtlənd lɑːst mʌnθ/', spanish: '¿Disfrutaste tu viaje a Escocia el mes pasado?' }
        ]
      }
    ]
  },
  {
    unitId: 6,
    stageLabel: 'Cambridge A1 • Unidad 6',
    title: 'Verbos Irregulares, Salud y Cuantificadores',
    description: 'Domina los verbos irregulares más frecuentes, narra historias con conectores y da consejos con Should.',
    themeColor: '#1cb0f6',
    sections: [
      {
        id: 'th-6-1',
        title: 'Verbos Irregulares de Alta Frecuencia y Consejos con Should',
        englishSubtitle: 'Go → Went, See → Saw, Buy → Bought & Giving Advice',
        category: 'grammar',
        summary: 'Los verbos irregulares solo cambian en oraciones afirmativas; en negativas y preguntas vuelven a la base con Did.',
        formula: 'Afirmativo: She went • Negativo: She didn’t go • Consejo: You should rest',
        content: [
          'Usa "should" / "shouldn’t" + verbo base para dar recomendaciones amables o consejos médicos.'
        ],
        examples: [
          { english: 'We went to the market and bought fresh fruit.', ipa: '/wi went tə ðə ˈmɑːrkɪt ænd bɔːt freʃ fruːt/', spanish: 'Fuimos al mercado y compramos fruta fresca.' }
        ]
      }
    ]
  },
  {
    unitId: 7,
    stageLabel: 'Cambridge A2 • Unidad 7',
    title: 'El Futuro: Be Going To, Will y Present Continuous',
    description: 'Distingue entre planes decididos de antemano, decisiones espontáneas, promesas y predicciones.',
    themeColor: '#ff9600',
    sections: [
      {
        id: 'th-7-1',
        title: 'Going to vs Will en Contextos Reales',
        englishSubtitle: 'Prior Plans vs Spontaneous Decisions & Predictions',
        category: 'grammar',
        summary: 'Usa "going to" para intenciones previas o evidencia visual, y "will" para decisiones en el acto u ofrecimientos.',
        formula: 'Plan: am/is/are going to + V • Decisión rápida / Promesa: will + V',
        content: [
          'Cuando el teléfono suena y decides contestar en ese instante, dices "I’ll get it!" (con will). Si ya planeaste mudarte el próximo mes, dices "I’m going to move next month".'
        ],
        examples: [
          { english: 'Look at those dark clouds! It is going to rain soon.', ipa: '/lʊk æt ðəʊz dɑːrk klaʊdz ɪt ɪz ˈɡəʊɪŋ tə reɪn suːn/', spanish: '¡Mira esas nubes oscuras! Va a llover pronto.' },
          { english: 'Your bag looks heavy. I will help you carry it.', ipa: '/jʊr bæɡ lʊks ˈhevi aɪ wɪl help ju ˈkæri ɪt/', spanish: 'Tu bolso se ve pesado. Te ayudaré a cargarlo.' }
        ]
      }
    ]
  },
  {
    unitId: 8,
    stageLabel: 'Cambridge A2 • Unidad 8',
    title: 'Comparativos, Superlativos y Matices de Grado',
    description: 'Compara ciudades, productos y rendimiento usando -er/more, el superlativo -est/the most y estructuras as...as.',
    themeColor: '#ce82ff',
    sections: [
      {
        id: 'th-8-1',
        title: 'Reglas de Comparación e Igualdad (As...As)',
        englishSubtitle: 'Comparatives, Superlatives & Irregular Forms',
        category: 'grammar',
        summary: 'Adjetivos cortos añaden -er/-est; largos usan more/the most; irregulares: good → better → the best.',
        formula: 'A is faster than B • C is more reliable than D • E is as efficient as F',
        content: [
          'Puedes intensificar un comparativo usando "much", "far" o "a bit" antes del comparativo: "much more affordable".'
        ],
        examples: [
          { english: 'Subway trains are much faster than taxis during rush hour.', ipa: '/ˈsʌbweɪ treɪnz ɑːr mʌtʃ ˈfɑːstər ðæn ˈtæksiz ˈdjʊrɪŋ rʌʃ ˈaʊər/', spanish: 'Los trenes del metro son mucho más rápidos que los taxis en hora pico.' }
        ]
      }
    ]
  },
  {
    unitId: 9,
    stageLabel: 'Cambridge A2 • Unidad 9',
    title: 'Experiencias de Vida: Present Perfect Simple',
    description: 'Conecta el pasado con el presente usando Have/Has + Participio junto con Ever, Never, Already, Yet y Just.',
    themeColor: '#ff4b4b',
    sections: [
      {
        id: 'th-9-1',
        title: 'Present Perfect vs Past Simple',
        englishSubtitle: 'Unspecified Time vs Specific Past Time',
        category: 'grammar',
        summary: 'Usa Present Perfect cuando importa el resultado o la experiencia sin especificar cuándo ocurrió; si dices "yesterday" o "in 2022", usa Past Simple.',
        formula: 'Sujeto + have/has + Past Participle (V3)',
        content: [
          'Diferencia clave: "She has gone to London" (sigue allá) vs "She has been to London" (fue y ya regresó).'
        ],
        examples: [
          { english: 'Have you ever tried authentic Japanese ramen? Yes, I tried it last year.', ipa: '/hæv ju ˈevər traɪd ɔːˈθentɪk ˌdʒæpəˈniːz ˈrɑːmən/', spanish: '¿Alguna vez has probado ramen japonés auténtico? Sí, lo probé el año pasado.' }
        ]
      }
    ]
  },
  {
    unitId: 10,
    stageLabel: 'Cambridge A2 • Unidad 10',
    title: 'Obligaciones, Prohibiciones y Permisos (Modales)',
    description: 'Domina la diferencia crítica entre Mustn’t (prohibición) y Don’t have to (ausencia de obligación).',
    themeColor: '#58cc02',
    sections: [
      {
        id: 'th-10-1',
        title: 'Must vs Have to en Negativo',
        englishSubtitle: 'Prohibition (Mustn’t) vs Lack of Necessity (Don’t have to)',
        category: 'grammar',
        summary: 'En afirmativo son parecidos, pero en negativo significan cosas opuestas.',
        formula: 'You mustn’t = Está prohibido • You don’t have to = No es necesario',
        content: [
          '"You mustn’t smoke here" significa que está estrictamente prohibido. "You don’t have to wear a tie" significa que es opcional.'
        ],
        examples: [
          { english: 'You do not have to pay for the ticket; admission is free today.', ipa: '/ju du nɒt hæv tə peɪ fɔːr ðə ˈtɪkɪt/', spanish: 'No tienes que pagar boleto; la entrada es gratuita hoy.' }
        ]
      }
    ]
  },
  {
    unitId: 11,
    stageLabel: 'Cambridge A2 • Unidad 11',
    title: 'Narrativa en Pasado: Past Continuous y Hábitos (Used to)',
    description: 'Ambienta historias combinando acciones en curso interrumpidas (While / When) y hábitos pasados con Used to.',
    themeColor: '#1cb0f6',
    sections: [
      {
        id: 'th-11-1',
        title: 'Past Continuous + Past Simple y Used to',
        englishSubtitle: 'Interrupted Actions & Past Habits',
        category: 'grammar',
        summary: 'Usa Past Continuous (was/were + -ing) para la acción larga de fondo y Past Simple para la acción que interrumpe.',
        formula: 'While + Past Continuous, Past Simple • I used to + verbo base',
        content: [
          '"Used to + verbo base" expresa algo que solías hacer en el pasado pero ya no haces. En negativo es "didn’t use to".'
        ],
        examples: [
          { english: 'While we were having dinner, the lights went out.', ipa: '/waɪl wi wɜːr ˈhævɪŋ ˈdɪnər ðə laɪts went aʊt/', spanish: 'Mientras estábamos cenando, se fue la luz.' }
        ]
      }
    ]
  },
  {
    unitId: 12,
    stageLabel: 'Cambridge A2 • Unidad 12',
    title: 'Condicionales Cero y Primero (Zero & First Conditional)',
    description: 'Expresa leyes universales, causas y consecuencias futuras probables con If, When, Unless y As soon as.',
    themeColor: '#ff9600',
    sections: [
      {
        id: 'th-12-1',
        title: 'First Conditional y Conectores de Tiempo Futuro',
        englishSubtitle: 'If / Unless / As soon as + Present Simple → Will',
        category: 'grammar',
        summary: 'Después de If, When, As soon as o Unless nunca usamos "will"; usamos Present Simple con sentido de futuro.',
        formula: 'If + Present Simple, Subject + will + base verb',
        content: [
          '"Unless" equivale a "If... not" (a menos que): "We won’t finish on time unless everyone helps".'
        ],
        examples: [
          { english: 'As soon as the plane lands, I will send you a message.', ipa: '/æz suːn æz ðə pleɪn lændz aɪ wɪl send ju ə ˈmesɪdʒ/', spanish: 'Tan pronto como aterrice el avión, te enviaré un mensaje.' }
        ]
      }
    ]
  },
  {
    unitId: 13,
    stageLabel: 'Oxford B1 • Unidad 13',
    title: 'Carrera Profesional y Present Perfect Continuous',
    description: 'Habla de tu trayectoria, proyectos en curso con For y Since, y responde preguntas de entrevistas laborales.',
    themeColor: '#ce82ff',
    sections: [
      {
        id: 'th-13-1',
        title: 'Present Perfect Continuous (Have/Has been + -ing)',
        englishSubtitle: 'Duration of Ongoing Activities with For & Since',
        category: 'grammar',
        summary: 'Enfatiza la duración ininterrumpida de una actividad que comenzó en el pasado y continúa en el presente.',
        formula: 'Subject + have/has been + Verb-ing + for (periodo) / since (inicio)',
        content: [
          'Usa "for" con periodos de tiempo ("for three years", "for two hours") y "since" con puntos de partida exactos ("since 2021", "since Monday").'
        ],
        examples: [
          { english: 'We have been optimizing the mobile application since last Tuesday.', ipa: '/wi hæv bɪn ˈɒptɪmaɪzɪŋ ðə ˈməʊbaɪl ˌæplɪˈkeɪʃən sɪns lɑːst ˈtjuːzdeɪ/', spanish: 'Hemos estado optimizando la aplicación móvil desde el martes pasado.' }
        ]
      }
    ]
  },
  {
    unitId: 14,
    stageLabel: 'Oxford B1 • Unidad 14',
    title: 'Hipótesis Presentes y Deseos (Second Conditional & I Wish)',
    description: 'Plantea situaciones imaginarias, da consejos con If I were you y expresa deseos con I wish / If only.',
    themeColor: '#ff4b4b',
    sections: [
      {
        id: 'th-14-1',
        title: 'Second Conditional e Hipótesis con Were',
        englishSubtitle: 'If + Past Simple → Would + Base Verb',
        category: 'grammar',
        summary: 'Aunque el verbo va en Past Simple después de If, el significado es hipótético en el presente o futuro.',
        formula: 'If I were you, I would accept the offer.',
        content: [
          'En inglés estándar y formal se prefiere "were" para todas las personas en el segundo condicional: "If she were here, she would know what to do".'
        ],
        examples: [
          { english: 'If we had more budget, we would expand the engineering team.', ipa: '/ɪf wi hæd mɔːr ˈbʌdʒɪt wi wʊd ɪkˈspænd ði ˌendʒɪˈnɪərɪŋ tiːm/', spanish: 'Si tuviéramos más presupuesto, ampliaríamos el equipo de ingeniería.' }
        ]
      }
    ]
  },
  {
    unitId: 15,
    stageLabel: 'Oxford B1 • Unidad 15',
    title: 'La Voz Pasiva en Contextos Técnicos y Noticias',
    description: 'Transforma oraciones activas en pasivas en todos los tiempos verbales para destacar el objeto o proceso.',
    themeColor: '#58cc02',
    sections: [
      {
        id: 'th-15-1',
        title: 'Estructura de la Voz Pasiva (Be + Past Participle)',
        englishSubtitle: 'Passive Voice Across Tenses',
        category: 'grammar',
        summary: 'El verbo "to be" adopta el tiempo verbal correspondiente y el verbo principal va siempre en participio pasado.',
        formula: 'Objeto + be (conjugado) + Participio Pasado (+ by Agente)',
        content: [
          'Muy utilizada en ciencia, tecnología, noticias y procesos empresariales donde quién realiza la acción es obvio o secundario.'
        ],
        examples: [
          { english: 'The new software update is being tested by our quality assurance team.', ipa: '/ðə njuː ˈsɒftwer ˈʌpdeɪt ɪz ˈbiːɪŋ ˈtestɪd baɪ ˈaʊər ˈkwɒləti əˈʃʊərəns tiːm/', spanish: 'La nueva actualización de software está siendo probada por nuestro equipo de calidad.' }
        ]
      }
    ]
  },
  {
    unitId: 16,
    stageLabel: 'Oxford B1 • Unidad 16',
    title: 'Estilo Indirecto (Reported Speech) y Preguntas Indirectas',
    description: 'Reporta declaraciones, preguntas y peticiones aplicando el salto atrás de tiempos (Backshift).',
    themeColor: '#1cb0f6',
    sections: [
      {
        id: 'th-16-1',
        title: 'Reported Statements & Questions',
        englishSubtitle: 'Say vs Tell, Tense Backshift & Word Order in Reported Questions',
        category: 'grammar',
        summary: 'Al reportar una pregunta con asked/wanted to know, el orden vuelve a ser afirmativo (Sujeto + Verbo) sin auxiliar do/did.',
        formula: 'Direct: "Where do you live?" → Reported: She asked me where I lived.',
        content: [
          'Recuerda: "Tell" requiere objeto personal ("She told me that..."), mientras que "Say" no lleva objeto directo sin "to" ("She said that...").'
        ],
        examples: [
          { english: 'The client asked whether we could deliver the prototype by Friday.', ipa: '/ðə ˈklaɪənt ɑːskt ˈweðər wi kʊd dɪˈlɪvər ðə ˈprəʊtətaɪp baɪ ˈfraɪdeɪ/', spanish: 'El cliente preguntó si podíamos entregar el prototipo para el viernes.' }
        ]
      }
    ]
  },
  {
    unitId: 17,
    stageLabel: 'Oxford B1 • Unidad 17',
    title: 'Phrasal Verbs Separables/Inseparables y Cláusulas Relativas',
    description: 'Domina la posición de los pronombres en Phrasal Verbs y une ideas con Who, Which, That, Whose y Where.',
    themeColor: '#ff9600',
    sections: [
      {
        id: 'th-17-1',
        title: 'Regla de Oro de los Phrasal Verbs Transivos Separables',
        englishSubtitle: 'Turn it on (✔) vs Turn on it (✘)',
        category: 'grammar',
        summary: 'Cuando el objeto de un phrasal verb separable es un pronombre (it, them, me), DEBE ir en medio.',
        formula: 'Turn off the light ✔ • Turn the light off ✔ • Turn it off ✔',
        content: [
          'En cambio, verbos como "look after" o "look forward to" son inseparables: el objeto siempre va después de toda la expresión.'
        ],
        examples: [
          { english: 'Here is the registration form. Please fill it out before the session.', ipa: '/hɪr ɪz ðə ˌredʒɪˈstreɪʃən fɔːrm pliːz fɪl ɪt aʊt/', spanish: 'Aquí está el formulario de registro. Por favor llénalo antes de la sesión.' }
        ]
      }
    ]
  },
  {
    unitId: 18,
    stageLabel: 'Oxford B2 • Unidad 18',
    title: 'Pasado Irreal: Third Conditional y Mixed Conditionals',
    description: 'Analiza escenarios pasados alternativos y cómo una decisión pasada afecta el presente.',
    themeColor: '#ce82ff',
    sections: [
      {
        id: 'th-18-1',
        title: 'Third Conditional y Condicional Mixto (Pasado → Presente)',
        englishSubtitle: 'If + Past Perfect → Would have + V3 / Would + Base Verb',
        category: 'grammar',
        summary: 'El Third Conditional evalúa consecuencias en el pasado; el Mixto conecta una condición pasada con un resultado actual.',
        formula: '3rd: If + had V3, would have V3 • Mixed: If + had V3, would + V (now)',
        content: [
          'En la cláusula del "If" jamás pongas "would have"; siempre va "had + participio".'
        ],
        examples: [
          { english: 'If we had invested in cloud infrastructure earlier, we would be much more scalable today.', ipa: '/ɪf wi hæd ɪnˈvestɪd ɪn klaʊd ˈɪnfrəstrʌktʃər ˈɜːrliər/', spanish: 'Si hubiéramos invertido antes en infraestructura en la nube, hoy seríamos mucho más escalables.' }
        ]
      }
    ]
  },
  {
    unitId: 19,
    stageLabel: 'Oxford B2 • Unidad 19',
    title: 'Modales Perfectos de Deducción y Crítica (Modal + Have + V3)',
    description: 'Expresa certeza, posibilidad o arrepentimiento sobre hechos pasados con Must have, Can’t have, Might have y Should have.',
    themeColor: '#ff4b4b',
    sections: [
      {
        id: 'th-19-1',
        title: 'Deducción Lógica en el Pasado',
        englishSubtitle: 'Must have been vs Can’t have been vs Might have been',
        category: 'grammar',
        summary: 'Para deducir que algo fue casi seguro usamos "must have + V3"; para deducir que fue imposible usamos "can’t/couldn’t have + V3".',
        formula: '95% seguro (+) → must have V3 • 95% seguro (-) → can’t have V3',
        content: [
          '"Should have + V3" expresa crítica o lamento porque algo recomendable no se hizo.'
        ],
        examples: [
          { english: 'She is not answering her phone; she must have already boarded the plane.', ipa: '/ʃi mʌst hæv ɔːlˈredi ˈbɔːrdɪd ðə pleɪn/', spanish: 'No contesta su teléfono; seguro ya abordó el avión.' }
        ]
      }
    ]
  },
  {
    unitId: 20,
    stageLabel: 'Oxford B2 • Unidad 20',
    title: 'Causativos (Have/Get Something Done) y Verbos con Cambio de Sentido',
    description: 'Delega servicios profesionales con estructura causativa y distingue verbos que cambian de significado con -ing o to.',
    themeColor: '#58cc02',
    sections: [
      {
        id: 'th-20-1',
        title: 'Causative Have/Get y Stop/Remember/Forget (+ -ing vs + to)',
        englishSubtitle: 'Have + Object + Past Participle',
        category: 'grammar',
        summary: '"I repaired my car" (lo hice yo) vs "I had my car repaired" (contraté a un especialista para hacerlo).',
        formula: 'Subject + have/get + Object + Past Participle (V3)',
        content: [
          'Además, recuerda: "remember doing" = recordar un hecho pasado; "remember to do" = acordarse de cumplir una tarea pendiente.'
        ],
        examples: [
          { english: 'We are having the office air conditioning serviced tomorrow morning.', ipa: '/wi ɑːr ˈhævɪŋ ði ˈɒfɪs er kənˈdɪʃənɪŋ ˈsɜːrvɪst/', spanish: 'Mañana por la mañana le harán mantenimiento al aire acondicionado de la oficina.' }
        ]
      }
    ]
  },
  {
    unitId: 21,
    stageLabel: 'Mastery C1 • Unidad 21',
    title: 'Inversión Estilística Negativa y Énfasis Retórico',
    description: 'Domina las inversiones de nivel C1 con Not only, Seldom, Rarely, Never before, Hardly... when y No sooner... than.',
    themeColor: '#1cb0f6',
    sections: [
      {
        id: 'th-21-1',
        title: 'Inversión tras Adverbios Negativos o Restrictivos',
        englishSubtitle: 'Negative Inversion for Rhetorical Impact',
        category: 'grammar',
        summary: 'Al colocar una expresión negativa o restrictiva al principio de la oración, invertimos el auxiliar y el sujeto como en una pregunta.',
        formula: 'Adv. Negativo + Auxiliar + Sujeto + Verbo Principal',
        content: [
          'Con "Only after", "Only when" o "Not until", la inversión ocurre en la cláusula principal (la segunda parte de la oración).'
        ],
        examples: [
          { english: 'Not only did the update boost performance, but it also reduced memory usage.', ipa: '/nɒt ˈəʊnli dɪd ði ˈʌpdeɪt buːst pərˈfɔːrməns/', spanish: 'La actualización no solo impulsó el rendimiento, sino que también redujo el uso de memoria.' },
          { english: 'Seldom have we witnessed such a rapid transformation in the industry.', ipa: '/ˈseldəm hæv wi ˈwɪtnəst sʌtʃ ə ˈræpɪd ˌtrænsfərˈmeɪʃən/', spanish: 'Rara vez hemos presenciado una transformación tan rápida en la industria.' }
        ]
      }
    ]
  },
  {
    unitId: 22,
    stageLabel: 'Mastery C1 • Unidad 22',
    title: 'Oraciones Hendidas (Cleft Sentences) y Subjuntivo Formal',
    description: 'Enfoca la atención del interlocutor con What-clauses, It-clefts y el modo subjuntivo en propuestas ejecutivas.',
    themeColor: '#ff9600',
    sections: [
      {
        id: 'th-22-1',
        title: 'Cleft Sentences (What we need is... / It was X that...)',
        englishSubtitle: 'Focusing Information & Formal Subjunctive',
        category: 'grammar',
        summary: 'Divide una oración simple en dos cláusulas para resaltar qué, quién o por qué ocurrió algo.',
        formula: 'What + Subject + Verb + is/was + [Elemento Enfatizado]',
        content: [
          'En el subjuntivo formal (tras suggest, recommend, insist, essential, vital), el verbo va siempre en forma base sin "-s" ni pasado: "The board recommended that she be appointed director".'
        ],
        examples: [
          { english: 'What really impressed the investors was the scalability of the architecture.', ipa: '/wɒt ˈrɪəli ɪmˈprest ði ɪnˈvestərz wɒz ðə ˌskeɪləˈbɪləti/', spanish: 'Lo que realmente impresionó a los inversionistas fue la escalabilidad de la arquitectura.' }
        ]
      }
    ]
  },
  {
    unitId: 23,
    stageLabel: 'Mastery C1 • Unidad 23',
    title: 'Modismos Ejecutivos, Diplomacia y Negociación C1',
    description: 'Comunícate con tacto diplomático (Hedging), domina modismos de liderazgo y cierra acuerdos internacionales.',
    themeColor: '#ce82ff',
    sections: [
      {
        id: 'th-23-1',
        title: 'Lenguaje Diplomático (Hedging) y Modismos de Alto Nivel',
        englishSubtitle: 'Diplomatic Nuance, Hedging & Executive Idioms',
        category: 'culture',
        summary: 'Suaviza desacuerdos y propuestas críticas para sonar persuasivo, profesional y natural en entornos internacionales.',
        formula: 'Directo: "That won’t work" → Diplomático C1: "That might pose a few challenges"',
        content: [
          'Utiliza expresiones como "With all due respect", "It appears that...", "We might want to reconsider..." y modismos como "read between the lines" o "address the elephant in the room".'
        ],
        examples: [
          { english: 'To be perfectly candid, we cannot afford to cut corners on cybersecurity.', ipa: '/tə bi ˈpɜːrfektli ˈkændɪd wi ˈkænɒt əˈfɔːrd tə kʌt ˈkɔːrnərz/', spanish: 'Para ser totalmente franco, no podemos permitirnos escatimar calidad en ciberseguridad.' }
        ]
      }
    ]
  }
];
