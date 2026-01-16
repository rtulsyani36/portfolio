import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Rohit's AI twin. I can tell you about his workflow, his design philosophy, or how he builds N8N systems." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref for the scrollable container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    // Scroll immediately after user sends to show their message
    setTimeout(scrollToBottom, 0);

    const responseText = await generateChatResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  // Helper function to render bold text from markdown-style asterisks
  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section id="chat" className="py-24 relative flex justify-center px-4 md:px-6 bg-paper border-t border-ink/10">
      
      {/* Decor */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-ink rounded-full animate-spin-slow flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-16 h-16 border border-ink rounded-full"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        
        <div className="text-center mb-10">
             <div className="inline-block bg-hyper-orange text-white px-3 py-1 font-mono text-xs font-bold uppercase mb-2 rotate-2">
                Beta v1.0
             </div>
             <h2 className="font-display font-black text-4xl uppercase">Ask The AI</h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 border-2 border-ink dark:border-white/20 shadow-[8px_8px_0px_0px_#111] dark:shadow-[8px_8px_0px_0px_#333] rounded-lg overflow-hidden flex flex-col h-[600px]">
            
            {/* Header */}
            <div className="bg-ink dark:bg-white text-white dark:text-black p-4 flex justify-between items-center border-b border-transparent dark:border-black/10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 dark:bg-green-600 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs uppercase tracking-widest">Connected to Neural Net</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-white/20 dark:border-black/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white/20 dark:border-black/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-white/20 dark:border-black/20"></div>
                </div>
            </div>

            {/* Chat Area - Scroll Container */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-paper relative scroll-smooth">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 bg-ink dark:bg-white rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-white dark:text-black font-serif italic text-xs">
                                Ai
                            </div>
                        )}
                        <div className={`max-w-[80%] p-4 rounded-lg font-sans text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-hyper-orange text-white rounded-tr-none shadow-md' 
                            : 'bg-white dark:bg-zinc-800 border border-ink/10 dark:border-white/10 text-ink dark:text-gray-200 rounded-tl-none shadow-sm'
                        }`}>
                            <p className="whitespace-pre-wrap">{renderMessageText(msg.text)}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start items-center gap-2 pl-11">
                         <span className="font-mono text-xs text-gray-500 dark:text-gray-400 animate-pulse">Thinking...</span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-zinc-900 border-t-2 border-ink dark:border-white/20 flex gap-2 md:gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your command..."
                    className="flex-1 bg-paper dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded px-4 py-3 font-mono text-sm focus:outline-none focus:border-hyper-orange dark:focus:border-hyper-orange focus:bg-white dark:focus:bg-black/60 transition-colors text-ink dark:text-white"
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="px-4 md:px-8 py-3 bg-ink dark:bg-white text-white dark:text-black font-display font-bold uppercase tracking-wider hover:bg-hyper-orange dark:hover:bg-hyper-orange hover:text-white dark:hover:text-white transition-colors disabled:opacity-50"
                >
                    Enter
                </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default AIChat;