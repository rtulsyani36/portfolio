import React, { useState } from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-paper border-t border-ink pt-24 pb-12 relative overflow-hidden">
      
      {/* Big Background Text */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-5">
         <h1 className="font-display font-black text-[15vw] leading-none uppercase text-ink">CONTACT</h1>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        <div className="mb-12">
            <h3 className="font-display font-black text-2xl sm:text-4xl md:text-6xl uppercase mb-6 tracking-tight">
                Let's Build <br/> Something Great
            </h3>
            <p className="font-serif text-xl italic text-ink/70 dark:text-gray-400 max-w-xl mx-auto">
                Whether you need a full-scale automated content system or a strategic social overhaul, I'm ready to help.
            </p>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center gap-8 mb-20">
            
            {/* Primary CTA: Schedule Call */}
            <a 
                href="https://cal.id/rohit-tulsyani" 
                className="px-10 py-5 bg-ink dark:bg-white text-white dark:text-black font-display font-bold text-lg uppercase tracking-wider hover:bg-hyper-orange hover:text-white dark:hover:bg-hyper-orange dark:hover:text-white hover:scale-105 transition-all duration-300 rounded-lg shadow-xl"
            >
                Schedule a Call
            </a>

            {/* Social Icons */}
            <div className="flex gap-6 mt-4">
                {/* Email Icon */}
                <a 
                    href="mailto:rtulsyani36@gmail.com"
                    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 hover:border-gray-400 hover:scale-110 transition-all duration-300 shadow-sm group"
                    aria-label="Email"
                >
                    <svg className="w-5 h-5 group-hover:text-hyper-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </a>

                {/* LinkedIn Icon */}
                <a 
                    href="https://linkedin.com/in/rohit-tulsyani/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 hover:border-gray-400 hover:scale-110 transition-all duration-300 shadow-sm group"
                    aria-label="LinkedIn"
                >
                    <svg className="w-5 h-5 group-hover:text-mac-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
            </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500 gap-4">
            <p>
                &copy; 2025 Rohit Tulsyani. All systems go.
            </p>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-ink transition-colors uppercase font-bold flex items-center gap-1">
                Back to Top <span className="text-lg">↑</span>
            </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;