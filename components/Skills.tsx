import React from 'react';
import { SKILL_CATEGORIES } from '../constants';

const Skills: React.FC = () => {
  // Map gradients to the categories
  // Order: Design, Strategy, Management, Technical
  const categoryStyles = [
    {
      // Design - Warm creative vibes
      gradient: "from-orange-400 via-pink-500 to-rose-600",
      lightBg: "bg-orange-50/50 dark:bg-orange-900/20",
      border: "border-orange-100 dark:border-orange-500/30",
      textGradient: "bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      // Strategy - Fresh/Growth vibes
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      lightBg: "bg-emerald-50/50 dark:bg-emerald-900/20",
      border: "border-emerald-100 dark:border-emerald-500/30",
      textGradient: "bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      // Management - Leadership/Royal vibes
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      lightBg: "bg-violet-50/50 dark:bg-violet-900/20",
      border: "border-violet-100 dark:border-violet-500/30",
      textGradient: "bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      // Technical - High tech/System vibes
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
      lightBg: "bg-blue-50/50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-500/30",
      textGradient: "bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-paper">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-300/30 dark:bg-yellow-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter text-ink dark:text-white mb-6 relative inline-block">
                The Stack
            </h2>
            <p className="font-mono text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest max-w-lg mx-auto">
                / System_Capabilities_v2.5 <br/>
                <span className="normal-case opacity-70">A blend of creative direction and technical execution.</span>
            </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILL_CATEGORIES.map((category, idx) => {
                const style = categoryStyles[idx % categoryStyles.length];
                
                return (
                    <div key={idx} className="group relative">
                        {/* Hover Glow Effect - Toned Down */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-br ${style.gradient} rounded-2xl opacity-0 group-hover:opacity-40 transition duration-500 blur-md group-hover:blur-md`}></div>
                        
                        {/* Card Body */}
                        <div className="relative h-full bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-6 rounded-xl border border-white/60 dark:border-white/10 shadow-glass transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/80 dark:group-hover:bg-zinc-900/60">
                            
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                    {style.icon}
                                </div>
                                <div>
                                    <h3 className={`font-display font-bold text-lg uppercase text-transparent bg-clip-text ${style.textGradient}`}>
                                        {category.title}
                                    </h3>
                                    <div className="h-1 w-8 rounded-full bg-gray-200 dark:bg-gray-700 mt-1 overflow-hidden">
                                        <div className={`h-full w-full bg-gradient-to-r ${style.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Chips */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIdx) => (
                                    <div 
                                        key={skill}
                                        className={`
                                            px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide
                                            border ${style.border} ${style.lightBg} text-gray-700 dark:text-gray-200
                                            hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:scale-105 transition-all duration-300 cursor-default
                                            relative overflow-hidden group/chip
                                        `}
                                    >
                                        <span className="relative z-10">{skill}</span>
                                        {/* Subtle fill animation on chip hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0 group-hover/chip:opacity-10 transition-opacity duration-300`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
      
      <style>{`
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Skills;