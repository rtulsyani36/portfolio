import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  // CLS FIX: Initialized with a placeholder to prevent width change from '' to 'HH:MM'
  const [time, setTime] = useState('00:00');
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Dark Mode based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 bg-white/50 dark:bg-black/50 backdrop-blur-xl border-b border-white/30 dark:border-white/10 text-ink transition-all duration-300 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Logo - Premium Minimalist */}
          <div className="cursor-pointer relative z-[120]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight">ROHIT TULSYANI</span>
              <span className="w-1.5 h-1.5 bg-mac-blue rounded-full"></span>
            </div>
          </div>

          {/* Desktop Menu - Visible on MD (Tablet) and up */}
          <div className="hidden md:flex gap-4 lg:gap-8 items-center">
            {['About', 'Experience', 'Skills', 'Work', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-sans text-xs lg:text-sm font-medium hover:text-mac-blue transition-colors tracking-wide uppercase"
              >
                {item}
              </button>
            ))}
            
            <span className="font-mono text-[10px] lg:text-xs opacity-60 ml-2 lg:ml-4 border-l border-ink/20 pl-2 lg:pl-4 min-w-[32px] text-center">{time}</span>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                  <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
              ) : (
                  <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
              )}
            </button>

            <button 
              onClick={() => scrollTo('chat')}
              className="ml-2 font-sans font-bold text-[10px] lg:text-xs border border-ink/20 px-3 lg:px-5 py-2 uppercase tracking-widest hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-full whitespace-nowrap"
            >
              Rohit's AI Twin
            </button>
          </div>

          {/* Mobile Controls (Visible below MD) */}
          <div className="flex md:hidden items-center gap-4 relative z-[120]">
              {/* Dark Mode Toggle (Mobile) */}
              <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? (
                      <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                  ) : (
                      <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                  )}
              </button>

              {/* Hamburger Button (Opens Menu) */}
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                  <div className="space-y-1.5 w-6">
                      <span className="block w-full h-0.5 bg-ink"></span>
                      <span className="block w-full h-0.5 bg-ink"></span>
                      <span className="block w-full h-0.5 bg-ink"></span>
                  </div>
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fixed Full Screen - High Z-Index to cover Hero Widgets */}
      {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[110] bg-paper/98 backdrop-blur-xl flex flex-col animate-fade-in h-screen overflow-y-auto w-full">
              {/* Close Button Header */}
              <div className="flex justify-end items-center p-6 pb-2">
                  <button 
                      onClick={() => setIsMenuOpen(false)} 
                      className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Close menu"
                  >
                    <svg className="w-8 h-8 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
              </div>

              <div className="flex flex-col gap-6 mt-2 px-6 pb-10 flex-1">
                {['About', 'Experience', 'Skills', 'Work', 'Contact'].map((item) => (
                    <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="font-display text-3xl font-bold uppercase tracking-tight text-ink text-left hover:text-mac-blue transition-colors border-b border-ink/5 pb-2"
                    >
                    {item}
                    </button>
                ))}
              
              
              <div className="mt-auto pt-8">
                  <p className="font-mono text-xs opacity-50 mb-4">{time} • System Online</p>
                  <button 
                     onClick={() => scrollTo('chat')}
                     className="w-full font-sans font-bold text-xs border border-ink px-5 py-4 uppercase tracking-widest bg-ink text-white dark:bg-white dark:text-black hover:opacity-90 transition-all rounded-lg shadow-lg"
                  >
                    Launch AI Assistant
                  </button>
                  </div>
              </div>
          </div>
      )}
      
      <style>{`
        .animate-fade-in {
            animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;