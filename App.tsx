import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AIChat from './components/AIChat';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-hyper-orange selection:text-white">
      <Navbar />
      <main>
        <Analytics /> 
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <AIChat />
      </main>
      <Footer />   
    </div>
  );
}

export default App;