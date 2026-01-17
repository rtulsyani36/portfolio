
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project, ProjectFile } from '../types';

const FolderIcon: React.FC<{ 
    colorClass: string; 
    label: string; 
    onClick: (e: React.MouseEvent) => void;
    delay: number;
}> = ({ colorClass, label, onClick, delay }) => (
    <div 
        onClick={onClick}
        className="flex flex-col items-center gap-3 cursor-pointer group w-32 md:w-40 animate-float-slow"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className={`w-28 h-24 md:w-36 md:h-28 relative transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105`}>
            {/* Back Plate */}
            <div className={`absolute top-0 left-0 w-full h-full rounded-lg ${colorClass} opacity-80 shadow-md`}></div>
            {/* Tab */}
            <div className={`absolute -top-3 left-0 w-1/3 h-4 rounded-t-md ${colorClass} opacity-80`}></div>
            {/* Front Plate */}
            <div className={`absolute top-1 left-0 w-full h-full rounded-lg ${colorClass} bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm border-t border-white/30 shadow-xl z-10 flex items-center justify-center`}>
               {/* Subtle Shine */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-lg"></div>
            </div>
            {/* Content Hint */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/20 rounded-sm z-0 transform translate-y-2 scale-90 opacity-50"></div>
        </div>
        <span className="font-sans font-medium text-xs md:text-sm text-ink/80 dark:text-gray-300 text-center px-2 py-1 rounded bg-white/50 dark:bg-black/40 backdrop-blur-sm group-hover:bg-mac-blue group-hover:text-white transition-colors duration-200 line-clamp-2 max-w-full">
            {label}
        </span>
    </div>
);

const FinderWindow: React.FC<{ 
    project: Project; 
    onClose: () => void;
    originRect: DOMRect | null; 
}> = ({ project, onClose, originRect }) => {
    const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [exitStyle, setExitStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (originRect) {
            // Calculate vector from Center Screen to Center Folder
            const viewportCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            const folderCenter = { 
                x: originRect.left + originRect.width / 2, 
                y: originRect.top + originRect.height / 2 
            };

            const deltaX = folderCenter.x - viewportCenter.x;
            const deltaY = folderCenter.y - viewportCenter.y;

            setExitStyle({
                '--genie-x': `${deltaX}px`,
                '--genie-y': `${deltaY}px`,
            } as React.CSSProperties);
        }
    }, [originRect]);

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to finish before actual close
        setTimeout(onClose, 500); 
    };

    const handleFileClick = (file: ProjectFile) => {
        if (file.type === 'link' && file.externalLink) {
            window.open(file.externalLink, '_blank');
        } else {
            setPreviewFile(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`} 
                onClick={handleClose}
            ></div>
            
            {/* Window */}
            <div 
                className={`
                    relative w-full max-w-5xl h-[80vh] bg-[#f5f5f7]/90 dark:bg-[#1e1e1e]/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/40 dark:border-white/10 flex flex-col overflow-hidden 
                    ${isClosing ? 'animate-genie-exit' : 'animate-scale-up-center'}
                `}
                style={isClosing ? exitStyle : {}}
            >
                
                {/* Toolbar */}
                <div className="h-12 bg-gray-200/50 dark:bg-white/5 border-b border-gray-300/50 dark:border-white/10 flex items-center px-4 justify-between flex-shrink-0">
                    <div className="flex gap-2">
                        <button onClick={handleClose} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/10 hover:bg-[#FF5F57]/80 flex items-center justify-center group">
                            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/50">x</span>
                        </button>
                        <button className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10 hover:bg-[#FEBC2E]/80"></button>
                        <button className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10 hover:bg-[#28C840]/80"></button>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex bg-gray-300/50 dark:bg-white/10 rounded-md p-0.5">
                             <div className="px-3 py-0.5 bg-white dark:bg-gray-600 dark:text-white shadow-sm rounded-sm text-xs font-medium text-gray-600">Icons</div>
                             <div className="px-3 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">List</div>
                        </div>
                    </div>

                    <div className="w-16"></div> {/* Spacer for center alignment */}
                </div>

                {/* Main Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="hidden md:flex w-48 bg-gray-100/30 dark:bg-black/20 backdrop-blur-md border-r border-gray-300/30 dark:border-white/10 flex-col p-4 gap-6">
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-2">Favorites</h4>
                            <ul className="space-y-1">
                                <li className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-sm text-gray-700 dark:text-gray-300 cursor-default flex gap-2 items-center">
                                    <span className="text-blue-500">★</span> Desktop
                                </li>
                                <li className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-sm text-gray-900 dark:text-white font-medium cursor-default flex gap-2 items-center">
                                    <span className="text-blue-500">📂</span> Projects
                                </li>
                                <li className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-sm text-gray-700 dark:text-gray-300 cursor-default flex gap-2 items-center">
                                    <span className="text-blue-500">↓</span> Downloads
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-2">Tags</h4>
                            <ul className="space-y-1">
                                {project.tags.map((tag, i) => (
                                    <li key={i} className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 text-sm text-gray-700 dark:text-gray-300 cursor-default flex gap-2 items-center">
                                        <span className={`w-2 h-2 rounded-full ${['bg-red-400', 'bg-blue-400', 'bg-green-400'][i % 3]}`}></span> {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white dark:bg-[#1e1e1e] p-6 overflow-y-auto">
                        
                        {/* Breadcrumbs / Title */}
                        <div className="mb-8 flex items-end gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
                            <h2 className="text-2xl font-display font-bold text-ink dark:text-white">{project.title}</h2>
                            <span className="text-sm text-gray-400 font-mono mb-1">{project.gallery?.length || 0} items</span>
                        </div>

                        {/* Description File */}
                        <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/40 text-sm text-gray-700 dark:text-yellow-100 font-mono max-w-2xl shadow-sm">
                            <span className="font-bold block mb-1">README.md</span>
                            {project.description}
                        </div>

                        {/* Files Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {project.gallery?.map((file, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => handleFileClick(file)}
                                    className="group flex flex-col items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 active:bg-blue-100 transition-colors"
                                >
                                    <div className="w-full aspect-square bg-white dark:bg-black rounded shadow-sm border border-gray-200 dark:border-white/10 p-2 relative overflow-hidden group-hover:border-blue-300 flex items-center justify-center">
                                         
                                         {/* IMAGE TYPE */}
                                         {file.type === 'image' && <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-sm pointer-events-none" />}
                                         
                                         {/* VIDEO TYPE (Raw) */}
                                         {file.type === 'video' && (
                                            <div className="relative w-full h-full bg-black rounded-sm overflow-hidden flex items-center justify-center">
                                                 <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: `url('/assets/projects/gallery-placeholder.svg')` }}></div>
                                                 <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 border border-white/40">
                                                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                                                 </div>
                                                 <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/60 text-[8px] text-white font-mono rounded">MP4</div>
                                            </div>
                                         )}

                                         {/* YOUTUBE TYPE */}
                                         {file.type === 'youtube' && (
                                            <div className="relative w-full h-full bg-black rounded-sm overflow-hidden flex items-center justify-center group/file">
                                                 {/* Thumbnail */}
                                                 <img 
                                                    src={file.thumbnail || '/assets/projects/gallery-placeholder.svg'} 
                                                    alt={file.name}
                                                    className="w-full h-full object-cover opacity-80 group-hover/file:opacity-60 transition-opacity"
                                                 />
                                                 {/* Play Button Overlay */}
                                                 <div className="absolute inset-0 flex items-center justify-center">
                                                     <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-lg transform group-hover/file:scale-110 transition-transform">
                                                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                     </div>
                                                 </div>
                                                 <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/60 text-[8px] text-white font-mono rounded">YT</div>
                                            </div>
                                         )}
                                         
                                         {/* LINK TYPE */}
                                         {file.type === 'link' && (
                                            <div className="relative w-full h-full bg-gray-5 dark:bg-white/5 rounded-sm overflow-hidden flex items-center justify-center group/file">
                                                 <img src={file.url} alt={file.name} className="w-full h-full object-cover pointer-events-none opacity-100 group-hover/file:opacity-90 transition-opacity" />
                                                 
                                                 {/* Corner Indicator */}
                                                 <div className="absolute top-1 right-1 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded px-1 py-0.5 shadow-sm z-10">
                                                     <div className="text-[8px] font-bold text-ink dark:text-white uppercase tracking-tighter">LINK</div>
                                                 </div>
                                                 
                                                 {/* Hover Overlay */}
                                                 <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/file:opacity-100 transition-opacity">
                                                     <div className="w-8 h-8 bg-white dark:bg-black rounded-full shadow-md flex items-center justify-center transform scale-75 group-hover/file:scale-100 transition-transform">
                                                          <span className="text-mac-blue text-sm">↗</span>
                                                     </div>
                                                 </div>
                                            </div>
                                         )}
                                    </div>
                                    <span className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium px-1 rounded group-hover:bg-blue-500 group-hover:text-white truncate w-full">
                                        {file.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal (Image, Video, or YouTube) */}
            {previewFile && (
                <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 md:p-8 animate-fade-in-fast pointer-events-auto">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPreviewFile(null)}></div>
                    <div className={`
                        relative bg-[#2d2d2d] rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-scale-up-center border border-white/10 
                        ${(previewFile.type === 'video' || previewFile.type === 'youtube') 
                            ? 'w-[95%] md:w-[85%] max-w-6xl' 
                            : 'w-full md:w-auto max-w-5xl max-h-[90vh]'}
                    `}>
                        {/* Preview Header */}
                        <div className="h-10 bg-[#3a3a3a] border-b border-black/50 flex items-center justify-between px-4 text-gray-300 flex-shrink-0">
                            <div className="flex gap-2">
                                <button onClick={() => setPreviewFile(null)} className="w-3 h-3 rounded-full bg-[#FF5F57] group relative">
                                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center text-[8px] text-black font-bold">✕</span>
                                </button>
                                <button className="w-3 h-3 rounded-full bg-[#FEBC2E]"></button>
                                <button className="w-3 h-3 rounded-full bg-[#28C840]"></button>
                            </div>
                            <span className="text-xs font-medium opacity-70 flex items-center gap-2">
                                {previewFile.type === 'video' || previewFile.type === 'youtube' ? 'QuickTime Player' : 'Preview'} — {previewFile.name}
                            </span>
                            <div className="w-10"></div>
                        </div>
                        
                        {/* Content */}
                        <div className={`flex-1 overflow-hidden bg-black flex items-center justify-center p-0 ${(previewFile.type === 'youtube' || previewFile.type === 'video') ? 'aspect-video w-full' : 'min-w-[300px] min-h-[200px] p-1'}`}>
                            {previewFile.type === 'video' ? (
                                <video 
                                    src={previewFile.url} 
                                    controls 
                                    autoPlay 
                                    className="w-full h-full object-contain outline-none"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                ) : previewFile.type === 'youtube' ? (
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={previewFile.url} 
                                    title={previewFile.name} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full shadow-2xl"
                                ></iframe>
                            ) : (
                                <img 
                                    src={previewFile.url} 
                                    alt="Preview" 
                                    className="max-w-full max-h-[80vh] object-contain shadow-2xl" 
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  // Gradient presets for folders to match reference vibe
  const folderColors = [
      'bg-gradient-to-br from-blue-400 to-cyan-500',    // Social Media
      'bg-gradient-to-br from-purple-400 to-indigo-500', // Graphic Design
      'bg-gradient-to-br from-orange-400 to-pink-500',   // UI/UX
      'bg-gradient-to-br from-emerald-400 to-teal-500',  // Video (Changed to Green/Teal)
  ];

  const handleFolderClick = (project: Project, e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setOriginRect(rect);
      setSelectedProject(project);
  };

  return (
    <section id="work" className="py-32 bg-paper relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-6xl uppercase tracking-tighter text-ink mb-6 relative inline-block">
                Selected Works
                {/* Decorative underline */}
                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-3 text-mac-blue" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </h2>
            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest mt-6">
                / root / projects
            </p>
        </div>

        {/* Folders Grid */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {PROJECTS.map((project, idx) => (
                <FolderIcon 
                    key={idx}
                    label={project.title}
                    colorClass={folderColors[idx % folderColors.length]}
                    onClick={(e) => handleFolderClick(project, e)}
                    delay={idx * 0.1}
                />
            ))}
        </div>

        {/* Subtle Status Bar */}
        <div className="mt-24 flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
             <div className="flex items-center gap-6 px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full border border-gray-200 dark:border-white/5 backdrop-blur-sm text-[10px] font-mono text-gray-500 dark:text-gray-400">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span>System Online</span>
                 </div>
                 <span className="hidden md:inline text-gray-300 dark:text-gray-600">|</span>
                 <span className="hidden md:inline">Fun Fact: This website is not a template, it is entirely unique and vibe coded by me using different AI tools.</span>
             </div>
        </div>

      </div>

      {/* Finder Modal */}
      {selectedProject && (
          <FinderWindow 
            project={selectedProject} 
            originRect={originRect}
            onClose={() => setSelectedProject(null)} 
          />
      )}

      {/* Styles */}
      <style>{`
        @keyframes scale-up-center {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes genie-exit {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
                border-radius: 0.75rem;
            }
            100% {
                transform: translate(var(--genie-x), var(--genie-y)) scale(0);
                opacity: 0;
                border-radius: 50%;
            }
        }
        .animate-scale-up-center {
            animation: scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
        }
        .animate-genie-exit {
            animation: genie-exit 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        .animate-fade-in-fast {
            animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
