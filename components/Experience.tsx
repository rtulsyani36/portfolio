import React, { useState } from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const selectedExp = EXPERIENCES.find(e => e.id === selectedId) || EXPERIENCES[0];

  // Helper to get icon based on company name
  const getIcon = (company: string) => {
    if (company.includes('Ninja')) return '⚡';
    if (company.includes('Quizzy')) return '🚀';
    if (company.includes('Samvaad')) return '📢';
    if (company.includes('Freelance')) return '🎨';
    if (company.includes('YouTube') || company.includes('nonu')) return '▶️';
    return '📁';
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-paper flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 mix-blend-multiply dark:bg-blue-900/20"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl translate-x-1/4 mix-blend-multiply dark:bg-purple-900/20"></div>
      </div>

      <div className="max-w-7xl w-full px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter text-ink mb-2">
                Experience
            </h2>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                / var / log / career_history
            </p>
        </div>

        {/* System Settings Window */}
        <div className="bg-white/80 dark:bg-black/70 backdrop-blur-2xl rounded-xl border border-white/60 dark:border-white/10 shadow-deep overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">
            
            {/* Sidebar (Desktop: Left, Mobile: Top Scroll) */}
            <div className="w-full md:w-72 bg-gray-50/50 dark:bg-white/5 border-b md:border-b-0 md:border-r border-gray-200/60 dark:border-white/10 flex flex-col backdrop-blur-md flex-shrink-0">
                
                {/* Window Controls (Fake) */}
                <div className="h-12 px-4 flex items-center gap-2 border-b border-gray-200/30 dark:border-white/10 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-sm"></div>
                    <span className="ml-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Settings</span>
                </div>

                {/* Search Bar Visual */}
                <div className="p-3 hidden md:block">
                     <div className="bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-md px-3 py-1.5 flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span>Search</span>
                     </div>
                </div>

                {/* Navigation List */}
                <div className="flex-1 overflow-x-auto md:overflow-y-auto p-3 flex md:flex-col gap-1 md:gap-1.5 scrollbar-hide">
                    {EXPERIENCES.map((exp) => {
                        const isActive = selectedId === exp.id;
                        return (
                            <button
                                key={exp.id}
                                onClick={() => setSelectedId(exp.id)}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal
                                    ${isActive 
                                        ? 'bg-mac-blue text-white shadow-md' 
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'
                                    }
                                `}
                            >
                                <span className={`text-lg ${isActive ? 'scale-110' : 'opacity-70'} transition-transform`}>
                                    {getIcon(exp.company)}
                                </span>
                                <span className="truncate">{exp.company}</span>
                                {isActive && <span className="hidden md:block ml-auto text-[10px] opacity-70">›</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#111] relative">
                
                {/* Content Header */}
                <div className="h-16 border-b border-gray-100 dark:border-white/5 flex items-center px-8 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl shadow-sm border border-gray-200 dark:border-white/5">
                             {getIcon(selectedExp.company)}
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-xl text-ink dark:text-white leading-none">
                                {selectedExp.company}
                            </h3>
                            <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                                ID: {selectedExp.id.toString().padStart(3, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Details (No Scroll, grows naturally) */}
                <div key={selectedExp.id} className="p-8 animate-fade-in-fast">
                    <div className="space-y-10">
                        {selectedExp.roles.map((role, idx) => (
                            <div key={idx} className="relative pl-6 border-l-2 border-gray-100 dark:border-white/10">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-mac-blue border-2 border-white dark:border-[#111] ring-1 ring-mac-blue/20"></div>
                                
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                                    <h4 className="font-sans font-bold text-lg text-ink dark:text-white">
                                        {role.title}
                                    </h4>
                                    <span className="font-mono text-xs font-semibold text-mac-blue bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">
                                        {role.period}
                                    </span>
                                </div>
                                
                                <ul className="space-y-3 mb-6">
                                    {role.description.map((point, pIdx) => (
                                        <li key={pIdx} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex gap-3">
                                            <span className="text-gray-300 select-none">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Skills */}
                    <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/10">
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                            Technologies & Skills
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {selectedExp.skills_used.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/5 rounded-md text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in-fast {
            animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Experience;