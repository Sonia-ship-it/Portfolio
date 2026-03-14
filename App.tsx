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
import Footer from './components/Footer';
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
    <div className="min-h-screen selection:bg-[#0ED9D9]/30 md:cursor-none relative bg-[#02040a]">
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

      <Footer />

      <WhatsAppBtn />
    </div>
  );
};

export default App;
