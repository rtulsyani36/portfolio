import React, { useState, useRef, useEffect } from 'react';

type WindowType = 'music' | 'dictionary' | 'alert' | 'finder' | 'image' | 'selection';

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
  { id: '4', type: 'alert', x: 33, y: 10, zIndex: 40, rotation: 0 },
  { id: '5', type: 'finder', x: 68, y: 65, zIndex: 15, rotation: 0 },
];

const Hero: React.FC = () => {
  const [items, setItems] = useState<DesktopItem[]>(INITIAL_ITEMS);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragItem = useRef<{ id: string; startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const bringToFront = (id: string) => {
    setItems((prev) => {
      const maxZ = Math.max(...prev.map((i) => i.zIndex));
      return prev.map((item) => (item.id === id ? { ...item, zIndex: maxZ + 1 } : item));
    });
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
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

  // --- Sub-components for Mac Widgets ---

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
        <div className="w-32 h-32 rounded-lg shadow-xl mb-6 bg-black flex items-center justify-center overflow-hidden">
             <span className="font-display font-black text-4xl text-white">RT</span>
        </div>
        <h3 className="font-sans font-bold text-lg text-black dark:text-white">Creative Flow.mp3</h3>
        <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-6">Rohit Tulsyani</p>
        
        {/* Progress */}
        <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
            <div className="w-2/3 h-full bg-mac-blue"></div>
        </div>
        <div className="w-full flex justify-between text-[10px] font-mono text-gray-400 mb-6">
            <span>2:42</span>
            <span>-1:21</span>
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

  const SystemAlert = () => (
    <div className="w-[280px] bg-[#ececec] dark:bg-[#2c2c2e] rounded-xl shadow-2xl border border-gray-300 dark:border-black/50 overflow-hidden transition-colors duration-300">
        <MacWindowHeader dark />
        <div className="p-4 flex gap-4 items-start">
            <div className="w-12 h-12 bg-mac-yellow rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-black">!</span>
            </div>
            <div>
                <h4 className="font-bold text-sm mb-1 text-black dark:text-white">System Optimization</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight mb-3">
                    Creativity levels are exceeding maximum capacity. Automation protocols engaged.
                </p>
                <div className="flex gap-2 justify-end">
                     <button className="px-3 py-1 bg-white dark:bg-[#3a3a3c] text-black dark:text-white border border-gray-300 dark:border-black/50 rounded text-xs font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-[#48484a]">Ignore</button>
                     <button className="px-3 py-1 bg-mac-blue text-white rounded text-xs font-medium shadow-sm hover:brightness-110">Deploy</button>
                </div>
            </div>
        </div>
    </div>
  );

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
     <div className="w-[300px] md:w-[400px] aspect-[4/5] relative group">
        
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
                src="/assets/rohit_doodle_v1.png"
                alt="Rohit Tulsyani" 
                className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale-[20%]" 
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

  const renderItem = (type: WindowType) => {
    switch (type) {
      case 'music': return <MusicPlayer />;
      case 'dictionary': return <DictionaryCard />;
      case 'alert': return <SystemAlert />;
      case 'finder': return <FinderWindow />;
      case 'image': return <MainImage />;
      default: return null;
    }
  };

  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-paper pt-20">
      
      {/* Background Name Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <h1 className="text-[20vw] font-display font-black tracking-tighter text-ink leading-none">
              ROHIT<br/>TULSYANI
          </h1>
      </div>

      {/* Interactive Desktop Area */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen cursor-default overflow-hidden"
      >
        {/* Unified Layout for Mobile & Desktop - Scaled down for mobile to create overlay effect */}
        <div className="absolute inset-0 md:transform-none transform scale-[0.65] origin-center h-full w-full">
            {items.map((item) => (
            <div
                key={item.id}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
                className="absolute transition-transform duration-200 ease-out active:scale-105 active:cursor-grabbing hover:cursor-grab"
                style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                zIndex: item.zIndex,
                }}
            >
                {renderItem(item.type)}
            </div>
            ))}
        </div>
      </div>


    </section>
  );
};

export default Hero;