import { useEffect, useState, useMemo } from 'react';

// Snow component
const Snow = () => {
  const snowflakes = useMemo(() => {
    const symbols = ['❄', '❅', '❆', '✧', '✦', '•', '◦'];
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      opacity: 0.35 + Math.random() * 0.5,
      size: 8 + Math.random() * 16,
      initialOffset: Math.random(),
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      blur: Math.random() > 0.7 ? 1 : 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
            animationDelay: `-${flake.initialOffset * flake.animationDuration}s`,
            filter: flake.blur ? 'blur(1px)' : 'none',
            color: 'white',
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(200,220,255,0.5)',
          }}
        >
          {flake.symbol}
        </div>
      ))}
    </div>
  );
};

// Ski icon SVG
const SkiIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 4.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5S21 8.38 21 7s-1.12-2.5-2.5-2.5zm-3.74 14.5c-.59 0-1.05.27-1.41.71L12 21.5l-1.35-1.79c-.36-.44-.82-.71-1.41-.71-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.59 0 1.05-.27 1.41-.71L12 19.5l1.35 1.79c.36.44.82.71 1.41.71.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM22.71 6.29a1.003 1.003 0 00-1.42 0L17 10.59V12l2.59 2.59c.39-.39.39-1.02 0-1.41l-.88-.88 3.29-3.29c.4-.39.4-1.03.01-1.42l-1.3-1.3zM10.5 12H8c-1.1 0-2 .9-2 2v4h2v-4h2.5c.55 0 1-.45 1-1s-.45-1-1-1zM6 10H3c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1z"/>
  </svg>
);

// Mountain SVG
const MountainSVG = () => (
  <svg className="absolute bottom-0 left-0 w-full h-48 md:h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <defs>
      <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
      </linearGradient>
      <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
      </linearGradient>
    </defs>
    <path fill="url(#mountainGrad2)" d="M0,320 L200,180 L400,240 L600,120 L800,200 L1000,100 L1200,180 L1440,140 L1440,320 Z" />
    <path fill="url(#mountainGrad1)" d="M0,320 L300,200 L500,260 L700,160 L900,220 L1100,140 L1300,200 L1440,180 L1440,320 Z" />
  </svg>
);

// Smooth scroll helper
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'О мероприятии' },
    { id: 'program', label: 'Программа' },
    { id: 'package', label: 'Спортпакет' },
    { id: 'travel', label: 'Как добраться' },
    { id: 'register', label: 'Архив' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-[#e2e8f0]/95 dark:bg-slate-900/90 backdrop-blur-md shadow-lg shadow-blue-500/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-black text-2xl text-blue-600 dark:text-blue-400">
          <span className="bg-blue-600 text-white p-2 rounded-xl">
            <SkiIcon className="w-5 h-5" />
          </span>
          SKILLON
        </button>

        <button
          className="md:hidden text-slate-700 dark:text-slate-200 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#e2e8f0]/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-300 dark:border-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setIsMenuOpen(false); }}
              className="block w-full text-left px-6 py-4 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Hero Section
const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center gradient-hero text-white overflow-hidden">
    <div className="aurora-bg" />
    <MountainSVG />
    <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
    <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-20 md:pt-8 md:pb-16">
      <div className="mb-6 inline-flex items-center gap-2">
        <span className="glass text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="text-lg">🎿</span>
          Спортивный кэмп
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight tracking-tight">
        <span className="block drop-shadow-lg">SKILLON</span>
        <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-2 gradient-text">
          Праздник Севера 2026
        </span>
      </h1>

      <p className="text-base sm:text-xl md:text-2xl mb-6 text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
        Легендарный лыжный марафон за полярным кругом с поддержкой профессиональных тренеров!
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <div className="glass flex items-center gap-2 px-4 py-2.5 rounded-2xl panel-hover">
          <span className="text-xl">📅</span>
          <div className="text-left">
            <div className="text-xs text-blue-200 uppercase tracking-wider">Дата</div>
            <div className="font-bold text-sm sm:text-base">26 — 28 марта 2026</div>
          </div>
        </div>
        <div className="glass flex items-center gap-2 px-4 py-2.5 rounded-2xl panel-hover">
          <span className="text-xl">📍</span>
          <div className="text-left">
            <div className="text-xs text-blue-200 uppercase tracking-wider">Место</div>
            <div className="font-bold text-sm sm:text-base">Мурманск, Долина Уюта</div>
          </div>
        </div>
        <div className="glass flex items-center gap-2 px-4 py-2.5 rounded-2xl panel-hover">
          <span className="text-xl">🏔️</span>
          <div className="text-left">
            <div className="text-xs text-blue-200 uppercase tracking-wider">Дистанции</div>
            <div className="font-bold text-sm sm:text-base">25 км / 50 км</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => scrollTo('register')}
          className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-blue-900/30 btn-glow text-sm sm:text-base"
        >
          <span>Статус проекта</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <button
          onClick={() => scrollTo('about')}
          className="inline-flex items-center justify-center gap-2 glass hover:bg-white/20 font-bold px-8 py-4 rounded-2xl transition-all text-sm sm:text-base"
        >
          <span>Подробнее</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block">
      <div className="flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  </div>
);

// Section Header
const SectionHeader = ({ title, icon }: { title: string; icon?: string }) => (
  <div className="text-center mb-10">
    <div className="inline-flex items-center gap-3 mb-4">
      {icon && <span className="text-4xl animate-float">{icon}</span>}
      <h2 className="text-3xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">{title}</h2>
    </div>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 mx-auto rounded-full" />
  </div>
);

// About Section
const About = () => (
  <section id="about" className="py-20 md:py-28 px-4 section-light">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="О мероприятии" icon="🏔️" />

      <div className="bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 mb-10 panel-hover">
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center">
          <strong className="text-blue-600 dark:text-blue-400">Skillon</strong> — спортивный кэмп на легендарный марафон
          «Праздник Севера» за полярным кругом! Профессиональная поддержка тренеров на протяжении всего мероприятия.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: '📍', title: 'Место проведения', description: 'г. Мурманск, СК «Долина Уюта»' },
          { icon: '📅', title: 'Даты', description: '26 — 28 марта 2026' },
          { icon: '👨‍🏫', title: 'Тренер кэмпа', description: 'Ордин Евгений, МС, главный тренер Skillon' },
          { icon: '📦', title: 'Формат', description: 'Спортпакет без проживания' },
        ].map((item, i) => (
          <div key={i} className="bg-[#e2e8f0] dark:bg-slate-700 rounded-2xl p-6 card-hover border border-slate-300 dark:border-slate-600 text-center">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Package Section
const Package = () => (
  <section id="package" className="py-20 md:py-28 px-4 section-alt pattern-dots">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="Спортпакет" icon="🎁" />

      <div className="max-w-3xl mx-auto bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 panel-hover">
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-6xl md:text-7xl font-black py-4 px-8 rounded-3xl shadow-xl mb-4">
            27 900 ₽
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Стоимость участия (архив)</p>
        </div>

        <h3 className="font-bold text-2xl mb-6 text-slate-800 dark:text-slate-200 text-center">Что входит в пакет:</h3>

        <div className="grid sm:grid-cols-2 gap-4 text-left mb-8">
          {[
            { icon: '🎿', text: 'Лыжные тренировки' },
            { icon: '🎯', text: 'Помощь в подготовке к старту' },
            { icon: '📋', text: 'Предстартовое собрание' },
            { icon: '🔧', text: 'Помощь в подготовке лыж' },
            { icon: '👥', text: 'Сопровождение 1-2 тренеров' },
            { icon: '🏠', text: 'Вакс комната' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🏨</span>
            <div className="text-left">
              <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">Рекомендуемое проживание</h4>
              <p className="text-amber-700 dark:text-amber-300">Отель Азимут, г. Мурманск</p>
              <p className="text-amber-600 dark:text-amber-400 text-sm">Там же пройдёт предстартовое собрание</p>
              <a
                href="https://azimuthotels.com/ru/murmansk/azimut-hotel-murmansk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-medium mt-2 underline"
              >
                Забронировать →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Timeline Item
const TimelineItem = ({ time, title, isHighlight = false }: { time: string; title: string; isHighlight?: boolean }) => (
  <div className={`flex gap-4 items-start ${isHighlight ? 'scale-105' : ''}`}>
    <div className={`font-mono text-sm whitespace-nowrap px-3 py-1 rounded-lg ${
      isHighlight
        ? 'bg-green-500 text-white font-bold'
        : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
    }`}>
      {time}
    </div>
    <span className={`${isHighlight ? 'font-bold text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-slate-300'}`}>
      {title}
    </span>
  </div>
);

// Program Section
const Program = () => (
  <section id="program" className="py-20 md:py-28 px-4 section-light">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="Программа" icon="📅" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Competition */}
        <div className="bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 panel-hover">
          <h3 className="font-bold text-2xl mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <span>🏆</span> Соревнования
          </h3>
          <div className="space-y-6 text-left">
            <div className="border-l-4 border-blue-400 pl-5 py-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">26 марта (четверг)</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1 text-sm">
                <li>13:00 – 20:00 — Регистрация участников</li>
                <li>16:00 – 19:00 — Неофициальный просмотр трасс</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-400 pl-5 py-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">27 марта (пятница)</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1 text-sm">
                <li>09:00 – 21:00 — Регистрация участников</li>
                <li>11:00 – 16:00 — Официальный просмотр трасс</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-400 pl-5 py-2 bg-green-50/50 dark:bg-green-900/20 rounded-r-xl">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">28 марта — Свободный стиль</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1 text-sm">
                <li>🏅 50 км, 25 км, 25 км (юноши 16-17 лет)</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-400 pl-5 py-2 bg-purple-50/50 dark:bg-purple-900/20 rounded-r-xl">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">29 марта — Классический стиль</h4>
              <ul className="text-slate-600 dark:text-slate-400 space-y-1 text-sm">
                <li>🏅 50 км, 25 км, 25 км (юноши 16-17 лет)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Camp */}
        <div className="bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 panel-hover">
          <h3 className="font-bold text-2xl mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <span>🎿</span> Кэмп Skillon
          </h3>
          <div className="space-y-5 text-left">
              <div className="bg-[#d8e0ea] dark:bg-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">День 1</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">26 марта</span>
              </div>
              <div className="space-y-2">
                <TimelineItem time="16:20" title="Встреча у вакс комнаты" />
                <TimelineItem time="16:30" title="Адаптационная тренировка" />
              </div>
            </div>

              <div className="bg-[#d8e0ea] dark:bg-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">День 2</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">27 марта</span>
              </div>
              <div className="space-y-2">
                <TimelineItem time="10:15" title="Открытие вакс комнаты" />
                <TimelineItem time="10:30" title="Утренняя тренировка" />
                <TimelineItem time="12:00" title="Сдача лыж, получение пакетов" />
                <TimelineItem time="18:30" title="Предстартовое собрание" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-5 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">🏁 СТАРТ</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">28 марта</span>
              </div>
              <div className="space-y-2">
                <TimelineItem time="09:45" title="Открытие вакс кабины" />
                <TimelineItem time="10:00" title="Разминка, откатка лыж" />
                <TimelineItem time="11:00" title="Старт 50 км" isHighlight />
                <TimelineItem time="11:20" title="Старт 25 км" isHighlight />
                <TimelineItem time="17:00" title="Командный ужин 🍽️" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Travel Section
const Travel = () => (
  <section id="travel" className="py-20 md:py-28 px-4 section-alt pattern-dots">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="Как добраться" icon="🗺️" />

      {/* Warning */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-amber-400/60 dark:bg-amber-500/60 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-5 border border-amber-300 dark:border-amber-400">
          <p className="text-amber-950 dark:text-amber-950 font-bold flex items-center justify-center gap-2 text-lg">
            <span className="text-2xl">⚠️</span>
            Рекомендуем брать обратные билеты!
          </p>
        </div>
      </div>

      {/* Transport cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Airplane */}
        <div className="bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 panel-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              ✈️
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200">Самолёт</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Аэрофлот</p>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-semibold">ТУДА</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">26 марта</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">СПб 09:10 → Мурманск 11:10</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-semibold">ОБРАТНО</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">28 марта</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Мурманск 15:35 → СПб 17:35</p>
            </div>
          </div>
        </div>

        {/* Train */}
        <div className="bg-[#e2e8f0] dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border border-slate-300 dark:border-slate-700 panel-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🚂
            </div>
            <div className="text-left">
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200">Поезд</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">РЖД</p>
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-semibold">ТУДА</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">25 марта</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">СПб 10:10 → Мурманск 12:10 (+1д)</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-semibold">ОБРАТНО 1</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">28 марта</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Мурманск 19:30 → СПб 21:49 (+1д)</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded font-semibold">ОБРАТНО 2</span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">29 марта</span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Мурманск 10:10 → СПб 10:09 (+1д)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Registration Section
const Registration = () => (
  <section id="register" className="relative py-28 px-4 gradient-hero text-white overflow-hidden">
    <div className="aurora-bg" />
    <MountainSVG />

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-6xl font-black mb-6">Архивный концепт</h2>
      <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
        Соревнования были отменены из-за погодных условий. Этот лендинг сохранён как пример frontend-разработки.
      </p>

      <div className="glass rounded-3xl p-8 md:p-12 max-w-lg mx-auto">
        <div className="text-6xl md:text-7xl font-black mb-2 gradient-text">27 900 ₽</div>
        <p className="text-blue-200 mb-8 text-lg">Историческая стоимость спортпакета</p>

        <div
          role="status"
          className="inline-flex items-center justify-center w-full bg-white/85 text-blue-700 font-bold px-8 py-5 rounded-2xl shadow-2xl text-lg"
        >
          Регистрация закрыта
        </div>

        <p className="text-sm text-blue-200 mt-6">
          Демонстрационная страница. Приём заявок и оплат не осуществляется.
        </p>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-slate-900 dark:bg-black text-white py-16 px-4 relative overflow-hidden">
    <div className="absolute inset-0 pattern-dots opacity-30" />

    <div className="relative z-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="bg-blue-600 text-white p-3 rounded-2xl">
            <SkiIcon className="w-6 h-6" />
          </span>
          <span className="font-black text-3xl text-blue-400">SKILLON</span>
        </div>
        <p className="text-slate-400 text-lg">Спортивный кэмп на марафон «Праздник Севера»</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-slate-400 mb-10">
        <div className="flex items-center gap-2"><span>📍</span><span>Мурманск, Долина Уюта</span></div>
        <div className="flex items-center gap-2"><span>📅</span><span>26—28 марта 2026</span></div>
        <div className="flex items-center gap-2"><span>🎿</span><span>25 км / 50 км</span></div>
      </div>

      <div className="border-t border-slate-800 pt-8 text-center">
        <p className="text-slate-500">© 2026 Skillon. Все права защищены.</p>
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#e2e8f0] dark:bg-slate-900 text-slate-900 dark:text-white">
      <Snow />
      <Navigation />
      <Hero />
      <About />
      <Package />
      <Program />
      <Travel />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;
