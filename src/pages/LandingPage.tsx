import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Volume2,
  Brain,
  CheckCircle2,
  Flame,
  Trophy,
  Star,
  HelpCircle,
  ExternalLink,
  Code2,
  Play,
  GraduationCap,
  Mic,
  Languages,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  // Ruta directa al APK compilado en public/downloads/englishgo-v1.0.apk
  const apkUrl = './downloads/englishgo-v1.0.apk';

  const handleDownloadClick = () => {
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-['Nunito',sans-serif] selection:bg-duo-green selection:text-white overflow-x-hidden">
      {/* Navegación superior */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-duo-blue to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 font-black text-xl border border-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white">
                English<span className="text-duo-green">Go!</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-duo-green/15 text-duo-green border border-duo-green/30">
                v1.0 Oficial (A1–C1)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onEnterApp}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-duo-green fill-duo-green" />
              <span>Probar App Web</span>
            </button>
            <a
              href={apkUrl}
              download="englishgo-v1.0.apk"
              onClick={handleDownloadClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm bg-duo-green hover:bg-emerald-500 text-white shadow-lg shadow-duo-green/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden xs:inline">Descargar</span> APK
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Principal */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-8 overflow-hidden">
        {/* Luces decorativas de fondo */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-duo-blue/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-36 right-10 w-[350px] h-[350px] bg-duo-green/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Columna izquierda: Texto y botones */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-duo-blue text-xs sm:text-sm font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Currículo Completo Cambridge (A1–C1) + Oxford (B1–B2) + Fonética IPA</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Domina el inglés con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400">
                EnglishGo!
              </span>{' '}
              en tu Android
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-semibold leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Aprende desde los 44 sonidos fonéticos (IPA) hasta fluidez avanzada C1 con una ruta
              gamificada de <strong>24 unidades y más de 375 lecciones</strong>, voces nativas
              neurales (US/UK/AU), conjugador de 12 tiempos verbales y práctica de pronunciación.
            </p>

            {/* Botones de Acción Principal */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={apkUrl}
                download="englishgo-v1.0.apk"
                onClick={handleDownloadClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-duo-green to-emerald-500 hover:from-emerald-500 hover:to-duo-green text-white shadow-xl shadow-duo-green/30 border-b-4 border-emerald-700 active:translate-y-0.5 transition-all"
              >
                <Download className="w-6 h-6 animate-bounce" />
                <div className="text-left">
                  <div className="leading-none">Descargar APK Gratis</div>
                  <div className="text-[11px] font-bold text-emerald-100 mt-1">
                    Versión 1.0 • Android 7.0+ • Oficial
                  </div>
                </div>
              </a>

              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-black text-base bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 text-sky-400 fill-sky-400" />
                <span>Abrir Versión Web Ahora</span>
              </button>
            </div>

            {/* Aviso de confirmación al iniciar descarga */}
            {downloadStarted && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-sm font-bold flex items-center gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  ¡Descarga iniciada! Una vez descargado el archivo{' '}
                  <code className="text-white font-black">englishgo-v1.0.apk</code>, ábrelo en tu
                  teléfono Android para instalarlo.
                </div>
              </div>
            )}

            {/* Insignias de confianza */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Sin anuncios ni suscripciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-sky-400" />
                <span>Progreso guardado localmente (Offline-first)</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <span>Voces Neurales US / UK / AU</span>
              </div>
            </div>
          </div>

          {/* Columna derecha: Mockup interactivo del teléfono */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[310px] sm:w-[340px] rounded-[42px] bg-slate-900 p-3.5 border-4 border-slate-800 shadow-2xl shadow-sky-500/15">
              {/* Notch superior */}
              <div className="w-28 h-5 bg-slate-950 rounded-full mx-auto mb-2.5 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
              </div>

              {/* Pantalla simulada */}
              <div className="rounded-[30px] bg-slate-950 border border-slate-800 overflow-hidden p-4 space-y-4">
                {/* Barra de estado de la app */}
                <div className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-1 text-orange-400 font-black text-xs">
                    <Flame className="w-4 h-4 fill-orange-400" /> 14
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 font-black text-xs">
                    <Star className="w-4 h-4 fill-amber-400" /> 2,450 XP
                  </div>
                  <div className="text-xs font-black text-rose-400">❤️ 5</div>
                </div>

                {/* Banner de Unidad */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-duo-blue to-indigo-600 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black uppercase tracking-wider opacity-90">
                      Unidad 1 • Cambridge A1
                    </div>
                    <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">
                      16 Nodos
                    </span>
                  </div>
                  <div className="font-black text-sm mt-0.5">Greetings, Verb To Be & Identity</div>
                  <div className="text-[11px] opacity-90 mt-0.5 font-mono">
                    /ˈɡriːtɪŋz ænd aɪˈdɛntɪti/
                  </div>
                </div>

                {/* Camino de nodos simulado */}
                <div className="py-3 flex flex-col items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full bg-duo-green flex items-center justify-center shadow-lg shadow-duo-green/30 border-b-4 border-emerald-700 font-black text-xl">
                    ✓
                  </div>
                  <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30 border-b-4 border-sky-700 font-black text-xl translate-x-6 animate-pulse">
                    ★
                  </div>
                  <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 border-b-4 border-amber-700 font-black text-lg -translate-x-5">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Mini tarjeta de pronunciación e IPA */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-400">
                      PHONETICS & SPEAKING
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                      IPA + Audio Nativo
                    </span>
                  </div>
                  <div className="text-center py-1">
                    <div className="text-base font-black text-white">
                      &ldquo;Could you repeat that, please?&rdquo;
                    </div>
                    <div className="text-xs font-bold text-sky-400 font-mono mt-0.5">
                      /kʊd juː rɪˈpiːt ðæt pliːz/
                    </div>
                    <div className="text-xs font-bold text-slate-400 mt-1">
                      ¿Podrías repetir eso, por favor?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas del Currículo */}
      <section className="py-10 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-duo-green">24 Unidades</div>
            <div className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
              Ruta completa IPA + A1 a C1
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-sky-400">375+ Lecciones</div>
            <div className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
              12 ejercicios dinámicos por nodo
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">12 Tiempos</div>
            <div className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
              Conjugador verbal + Phrasal Verbs
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-purple-400">100% Gratis</div>
            <div className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
              Sin bloqueos ni pagos ocultos
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Todo lo que incluye la versión Android (APK)
          </h2>
          <p className="text-slate-400 font-semibold mt-3">
            Diseñado con arquitectura gamificada e interactiva, adaptado al inglés internacional con
            estándares Cambridge & Oxford.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-duo-green/15 text-duo-green flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Laboratorio Fonético IPA (44 Sonidos)</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              Domina las 12 vocales, 8 diptongos y 24 consonantes del inglés con pares mínimos
              (ship vs sheep, bat vs bet) y transcripción IPA en cada frase.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Sistema SRS y Maestría CEFR</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              Algoritmo de repetición espaciada inteligente y módulo de repaso rápido para tus
              ítems débiles, phrasal verbs, idioms y vocabulario académico.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">5 Voces Neurales Nativas (US / UK / AU)</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              Escucha pronunciación real estadounidense, británica y australiana con Emily, Oliver,
              Sophia, Liam y Chloe sin acento robótico español.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Lecturas Graduadas y Conjugador</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              Historias interactivas por nivel con glosario emergente, más un diccionario con
              conjugador de los 12 tiempos verbales (afirmativo, negativo e interrogativo).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Speaking Studio & Roleplay</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              Practica conversación con reconocimiento de voz en tiempo real, simulaciones de
              entrevistas de trabajo, aeropuertos y retos contrarreloj.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black">Exámenes de Salto (Jump-Ahead)</h3>
            <p className="text-slate-400 text-sm font-semibold leading-relaxed">
              ¿Ya sabes algo de inglés? Presenta exámenes de nivelación para desbloquear unidades
              completas automáticamente con 3 estrellas.
            </p>
          </div>
        </div>
      </section>

      {/* Guía de instalación del APK en 3 pasos */}
      <section className="py-16 px-4 sm:px-8 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-extrabold mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>INSTALACIÓN RÁPIDA EN ANDROID</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              ¿Cómo instalar el archivo APK en tu celular?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-duo-green text-slate-950 font-black flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-black text-lg mb-2">Descarga el APK</h4>
              <p className="text-slate-400 text-sm font-semibold">
                Pulsa el botón verde <strong>&ldquo;Descargar APK Gratis&rdquo;</strong> para
                guardar el instalador <code className="text-slate-200">englishgo-v1.0.apk</code> en
                tu dispositivo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 font-black flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-black text-lg mb-2">Abre el archivo</h4>
              <p className="text-slate-400 text-sm font-semibold">
                Toca la notificación de descarga completada o búscalo en tu carpeta de{' '}
                <strong>Descargas (Downloads)</strong>. Si tu navegador lo solicita, autoriza{' '}
                <em>&ldquo;Instalar aplicaciones desconocidas&rdquo;</em>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-black text-lg mb-2">¡Empieza a aprender!</h4>
              <p className="text-slate-400 text-sm font-semibold">
                Abre <strong>EnglishGo!</strong> desde tu cajón de aplicaciones. Tu racha, gemas y
                progreso se guardarán automáticamente en tu teléfono.
              </p>
            </div>
          </div>

          {/* Ficha técnica del APK */}
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/90 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-extrabold uppercase tracking-wider text-duo-green">
                Especificaciones del Paquete Android
              </div>
              <div className="text-lg font-black text-white">
                englishgo-v1.0.apk • Aplicación Oficial Android
              </div>
              <div className="text-xs font-bold text-slate-400">
                Requiere Android 7.0 (Nougat) o superior • Motor Ionic 8 + Capacitor 6 • Modo Oscuro
                y Claro
              </div>
            </div>

            <a
              href={apkUrl}
              download="englishgo-v1.0.apk"
              onClick={handleDownloadClick}
              className="shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-sm bg-duo-green hover:bg-emerald-500 text-white shadow-lg shadow-duo-green/25 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Descargar APK (v1.0)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-8 border-t border-slate-900 text-center text-xs sm:text-sm font-bold text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-black">EnglishGo!</span>
            <span>•</span>
            <span>Plataforma Interactiva de Inglés A1–C1</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onEnterApp}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Entrar a la App Web
            </button>
            <a
              href="https://github.com/joestark96/EnglishGo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
