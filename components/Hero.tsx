import React, { useState, useRef, useEffect } from 'react';


type WindowType = 'music' | 'dictionary' | 'resume' | 'finder' | 'image' | 'selection';

interface DesktopItem {
  id: string;
  type: WindowType;
  x: number; // Percentage
  y: number; // Percentage
  zIndex: number;
  rotation?: number;
}

const INITIAL_ITEMS: DesktopItem[] = [
  { id: '1', type: 'image', x: 48, y: 43, zIndex: 10, rotation: 0 },
  { id: '2', type: 'music', x: 73, y: 22, zIndex: 20, rotation: 0 },
  { id: '3', type: 'dictionary', x: 28, y: 55, zIndex: 30, rotation: 0 },
  { id: '4', type: 'resume', x: 31, y: 17, zIndex: 40, rotation: 0 },
  { id: '5', type: 'finder', x: 68, y: 65, zIndex: 15, rotation: 0 },
];

const MOBILE_POSITIONS: Record<string, { x: number, y: number, zIndex: number }> = {
  '1': { x: 40, y: 50, zIndex: 10 }, // Image (Center)
  '4': { x: 20, y: 30, zIndex: 50 }, // Resume (Top Left) - Moved Up
  '2': { x: 80, y: 30, zIndex: 20 }, // Music (Top Right) - Moved Up
  '3': { x: 20, y: 70, zIndex: 30 }, // Dictionary (Bottom Left) - Moved Down
  '5': { x: 80, y: 70, zIndex: 15 }, // Finder (Bottom Right) - Moved Down
};

// --- Sub-components for Mac Widgets (Defined OUTSIDE Hero to prevent re-renders) ---

  const MacWindowHeader = ({ title = "", dark = false }: { title?: string, dark?: boolean }) => (
    <div className={`h-8 flex items-center px-4 space-x-2 rounded-t-xl ${dark ? 'bg-black/10 dark:bg-white/10' : 'bg-gray-100/50 dark:bg-white/10'} backdrop-blur-md border-b border-gray-300/30 dark:border-white/5`}>
      <div className="flex space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-mac-red border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-mac-yellow border border-black/10"></div>
        <div className="w-3 h-3 rounded-full bg-mac-green border border-black/10"></div>
      </div>
      <span className="flex-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 opacity-80">{title}</span>
    </div>
  );

  const MusicPlayer = () => (
    <div className="w-[320px] glass-panel dark:bg-[#1c1c1e]/90 dark:border-white/10 rounded-2xl shadow-deep overflow-hidden transition-colors duration-300">
       {/* Album Art Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 dark:opacity-10"></div>
      
      <div className="relative p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-lg shadow-xl mb-6 bg-black flex items-center justify-center overflow-hidden relative">
             <img 
                src="/assets/kendrick damn.webp" 
                alt="Album Art" 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" 
                width="128"
                height="128"
              />
        </div>
        <h3 className="font-sans font-bold text-lg text-black dark:text-white">DNA.</h3>
        <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-6">Kendrick Lamar</p>
        
        {/* Progress */}
        <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
            <div className="w-1/5 h-full bg-mac-blue"></div>
        </div>
        <div className="w-full flex justify-between text-[10px] font-mono text-gray-400 mb-6">
            <span>0:27</span>
            <span>-2:38</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
             <svg className="w-6 h-6 text-black dark:text-white fill-current" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
             <svg className="w-10 h-10 text-black dark:text-white fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
             <svg className="w-6 h-6 text-black dark:text-white fill-current" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
        </div>
      </div>
    </div>
  );

  const DictionaryCard = () => (
    <div className="w-[300px] bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-filter backdrop-blur-xl rounded-xl shadow-glass border border-white dark:border-white/10 p-6 font-serif transition-colors duration-300">
      <h3 className="text-3xl font-bold text-black dark:text-white mb-1">strat·e·gist</h3>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-sans italic">/ˈstratəjəst/ • noun</div>
      <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-300 font-sans border-l-2 border-mac-blue pl-4">
        <span className="font-bold text-mac-blue">1.</span> A person skilled in planning the best way to gain an advantage or achieve success, especially in automated content systems.
      </p>
      <p className="text-xs text-gray-400 mt-4 italic">"Rohit is the strategist you need."</p>
    </div>
  );

  const ResumeWindow = () => {
  // Replace this with your actual Google Drive file link
  const RESUME_LINK = "https://drive.google.com/file/d/1v6tKg8ZQylj_A2Ho3exehnZE3mj8sPUK/view?usp=sharing";

  return (
    <div className="w-[280px] glass-panel dark:bg-[#1c1c1e]/90 dark:border-white/10 rounded-xl shadow-deep overflow-hidden transition-colors duration-300">
        <MacWindowHeader title="AirDrop" />
        <div className="p-5 flex flex-col items-center">
            
            {/* Animated Rings for "Receiving" look */}
            <div className="relative mb-4">
                 <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center animate-pulse">
                     <div className="w-12 h-14 bg-white dark:bg-[#2c2c2e] shadow-md border border-gray-200 dark:border-black/30 rounded flex items-center justify-center relative">
                        <span className="text-2xl">📝</span>
                        <div className="absolute -right-1.5 -top-1.5 w-5 h-5 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold border-2 border-white dark:border-[#2c2c2e]">1</div>
                     </div>
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-[#1c1c1e] w-5 h-5 rounded-full flex items-center justify-center shadow-sm z-10">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
            </div>

            <div className="text-center mb-5">
                <h4 className="font-bold text-sm text-black dark:text-white">Rohit's Resume.pdf</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Would like to share a file...</p>

                </div>
                
            <div className="grid grid-cols-2 gap-2 w-full">
                 <button 
                  onMouseDown={(e) => e.stopPropagation()} 
                  className="px-3 py-2 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  > 
                    Decline
                 </button>
                  {/* Use strict Anchor tag with stopPropagation to ensure dragging logic doesn't capture the click */}
               <a 
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseDown={(e) => e.stopPropagation()} 
                  className="px-3 py-2 bg-mac-blue text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors text-center shadow-sm flex items-center justify-center"
               >
                    Accept
                 </a>
            </div>
        </div>
    </div>
  )};

  const FinderWindow = () => (
    <div className="w-[200px] glass-panel dark:bg-[#1c1c1e]/90 dark:border-white/10 rounded-xl shadow-deep overflow-hidden transition-colors duration-300">
        <MacWindowHeader title="Skills" />
        <div className="p-4 grid grid-cols-2 gap-4">
            
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl shadow-sm group-hover:bg-purple-200 dark:group-hover:bg-purple-500/30 transition-colors">🎨</div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Design</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl shadow-sm group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30 transition-colors">🔍</div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Research</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl shadow-sm group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30 transition-colors">🎯</div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Strategy</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center text-2xl shadow-sm group-hover:bg-orange-200 dark:group-hover:bg-orange-500/30 transition-colors">📢</div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Marketing</span>
            </div>
        </div>
    </div>
  );

const MainImage = () => {
     // Customize the padding size of the blue selection box (in pixels)
     // Increase this value to make the rectangle larger.
     const paddingSize = 24; 
    
     return (
     <div className="w-[290px] md:w-[400px] aspect-[4/5] relative group">
        
        {/* Selection Rectangle Effect - Behind Image */}
        <div 
            className="absolute border-2 border-mac-blue bg-mac-blue/5 dark:bg-mac-blue/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-0 rounded-xl flex flex-col justify-between"
            style={{ 
                top: `-${paddingSize}px`, 
                bottom: `-${paddingSize}px`, 
                left: `-${paddingSize}px`, 
                right: `-104px` 
            }}
        >
          <div className="flex justify-between p-1">
                 <div className="w-1.5 h-1.5 bg-white border border-mac-blue shadow-sm"></div>
                 <div className="w-1.5 h-1.5 bg-white border border-mac-blue shadow-sm"></div>
            </div>
            <div className="flex justify-between p-1">
                 <div className="w-1.5 h-1.5 bg-white border border-mac-blue shadow-sm"></div>
                 <div className="w-1.5 h-1.5 bg-white border border-mac-blue shadow-sm"></div>
            </div>
        </div>

        {/* Image Container */}
        <div className="w-[480px] overflow-hidden rounded-sm shadow-2xl bg-gray-200 dark:bg-gray-800 relative">
             <img 
                src="/assets/rohit_doodle_v1.webp"
                alt="Rohit Tulsyani" 
                className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale-[20%]" 
                width="400"
                height="500"
              />
             <div className="absolute bottom-4 left-4 bg-black/60 dark:bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono">
                rohit_tulsyani.png
             </div>
        </div>

        {/* Cursor Icon */}
        <div className="absolute -bottom-8 -right-8 pointer-events-none drop-shadow-lg z-50">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 3.5L11.5 19.5L14.5 13.5L20.5 12L5.5 3.5Z" fill="black" stroke="white" strokeWidth="1.5"/>
             </svg>
             <span className="bg-mac-blue text-white text-[10px] px-1.5 py-0.5 rounded ml-4">Rohit</span>
        </div>
     </div>
  )};


// --- Main Hero Component ---

const Hero: React.FC = () => {
  const [items, setItems] = useState<DesktopItem[]>(INITIAL_ITEMS);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragItem = useRef<{ id: string; startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  
  // FIX FOR CLS: Initialize state based on window width immediately to prevent jump
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
        return window.innerWidth < 768;
    }
    return false; // Default for SSR (if applicable), though this is client-only
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    // Remove the initial checkMobile() call since we initialize in useState
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bringToFront = (id: string) => {
    setItems((prev) => {
      const maxZ = Math.max(...prev.map((i) => i.zIndex));
      return prev.map((item) => (item.id === id ? { ...item, zIndex: maxZ + 1 } : item));
    });
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    
    const target = e.target as HTMLElement;
    // Check for interactive elements. 
    // NOTE: This fallback check is good, but stopPropagation on the child elements is safer.
    if (target.closest('button, a, input, [role="button"]')) {
      bringToFront(id);
      return;
    }
e.preventDefault();
    bringToFront(id);
    const item = items.find((i) => i.id === id);
    if (!item || !containerRef.current) return;

    dragItem.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: item.x,
      initialY: item.y,
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragItem.current || !containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;
    const deltaX = ((e.clientX - dragItem.current.startX) / clientWidth) * 100;
    const deltaY = ((e.clientY - dragItem.current.startY) / clientHeight) * 100;

    setItems((prev) =>
      prev.map((item) =>
        item.id === dragItem.current?.id
    ? { ...item, x: dragItem.current.initialX + deltaX, y: dragItem.current.initialY + deltaY }
          : item
      )
    );
  };

  const handleMouseUp = () => {
    dragItem.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const renderItem = (type: WindowType) => {
    switch (type) {
      case 'music': return <MusicPlayer />;
      case 'dictionary': return <DictionaryCard />;
      case 'resume': return <ResumeWindow />;
      case 'finder': return <FinderWindow />;
      case 'image': return <MainImage />;
      default: return null;
    }
  };

  return (
    <section id="about" className={`relative w-full bg-paper ${isMobile ? 'pt-12' : 'pt-20'}`}>
      
      {/* Background Name Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] fixed">
          <h1 className="text-[20vw] font-display font-black tracking-tighter text-ink leading-none">
              ROHIT<br/>TULSYANI
          </h1>
      </div>

      {/* Interactive Desktop Area */}
      <div 
        ref={containerRef}
        // Mobile: Fixed height to remove gap, NO FLEX, use Absolute.
        // Desktop: Full screen height.
        className={`relative w-full overflow-hidden ${isMobile ? 'h-[600px]' : 'h-screen'}`}
      >
        {/* Unified Layout for Mobile & Desktop */}
        <div className={`absolute inset-0 transform ${isMobile ? 'scale-[1.0] origin-top' : ''} w-full h-full`}>
            {items.map((item) => {
                // Determine position based on mode
                const pos = isMobile && MOBILE_POSITIONS[item.id] ? MOBILE_POSITIONS[item.id] : item;
                
                // Scale Logic for Mobile - APPLIED VIA STYLE PROP TO PREVENT OVERRIDES
                let scaleValue = 1;
                if (isMobile) {
                    if (item.type === 'music' || item.type === 'dictionary') {
                        scaleValue = 0.4; // Updated to 0.4x per request
                    } else if (item.type === 'resume' || item.type === 'finder') {
                        scaleValue = 0.5; // Kept at 0.5x
                    } else if (item.type === 'image') {
                        scaleValue = 0.7; // Updated to 0.9x per request
                    }
                }

                return (
            <div
                    key={item.id}
                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                    className={`
                        absolute transition-transform duration-200 ease-out active:cursor-grabbing hover:cursor-grab touch-none
                    `}
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        // IMPORTANT: Scale is applied here to avoid CSS overriding the transform property
                        transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg) scale(${scaleValue})`,
                        zIndex: pos.zIndex,
                    }}
                >
                    {renderItem(item.type)}
                </div>
                );
            })}
        </div>
      </div>


    </section>
  );
};

export default Hero;
