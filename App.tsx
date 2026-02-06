import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import WhatsAppBtn from './components/WhatsAppBtn';
import Testimonials from './components/Testimonials';
import GlobalEffects from './components/GlobalEffects';
import { PERSONAL_INFO } from './constants';

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#0ED9D9]/30 md:cursor-none relative">
      <GlobalEffects />
      <CustomCursor />
      <Header />

      <main>
        <Hero />

        <div className="reveal"><About /></div>
        <div className="reveal"><Skills /></div>
        <div className="reveal"><Projects /></div>
        <div className="reveal"><Achievements /></div>
        <div className="reveal"><Experience /></div>
        <div className="reveal"><Testimonials /></div>
        <div className="reveal"><Contact /></div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-[#0a0f1d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0ED9D9] rounded-lg flex items-center justify-center font-bold text-slate-900">US</div>
              <span className="text-white font-bold tracking-tight">Uwase Sonia</span>
            </div>

            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Uwase Sonia. Built with React.
            </p>

            <div className="flex items-center gap-6">
              <a href={PERSONAL_INFO.github} className="text-slate-500 hover:text-white transition-colors">Github</a>
              <a href={PERSONAL_INFO.linkedin} className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>
              <a href={PERSONAL_INFO.twitter} className="text-slate-500 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppBtn />
    </div>
  );
};

export default App;
