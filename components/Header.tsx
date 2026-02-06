
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, User, Cpu, Briefcase, Trophy, MessageSquareQuote, History } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4 md:p-6">
      <header
        className={`
          pointer-events-auto
          flex items-center justify-between
          px-4 md:px-6 py-2 md:py-3
          bg-slate-900/60 backdrop-blur-2xl
          border border-white/10
          rounded-full shadow-2xl
          transition-all duration-500 ease-in-out
          ${scrolled ? 'w-full max-w-4xl opacity-100 translate-y-0' : 'w-full max-w-5xl opacity-100 translate-y-2'}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0ED9D9] rounded-full flex items-center justify-center font-bold text-slate-900 shadow-lg shadow-[#0ED9D9]/30 transition-transform hover:rotate-12">
            US
          </div>
          <span className="text-white font-bold tracking-tight text-sm md:text-base hidden sm:block">
            Uwase<span className="text-[#0ED9D9]">Sonia</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 bg-slate-800/50 p-1 rounded-full  border border-white/5">
          {[
            { name: 'About', icon: <User size={18} /> },
            { name: 'Skills', icon: <Cpu size={18} /> },
            { name: 'Projects', icon: <Briefcase size={18} /> },
            { name: 'Achievements', icon: <Trophy size={18} /> },
            { name: 'Testimonials', icon: <MessageSquareQuote size={18} /> },
            { name: 'Experience', icon: <History size={18} /> }
          ].map((item) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className="relative p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
              aria-label={item.name}
            >
              {item.icon}

              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 border border-white/10 rounded-md text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {item.name}
              </span>

              {/* Active Dot indicator (optional, could be added later if tracking scroll position) */}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center space-x-3 text-slate-400 border-r border-white/10 pr-4 mr-2">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#0ED9D9] transition-colors p-1">
              <Github size={18} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0ED9D9] transition-colors p-1">
              <Linkedin size={18} />
            </a>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 md:px-5 py-3 bg-[#0ED9D9] text-slate-900 text-xs font-bold rounded-full hover:bg-[#09B3B3] hover:scale-105 transition-all active:scale-95 shadow-lg shadow-[#0ED9D9]/30"
          >
            <Mail size={14} className="hidden xs:block" />
            Get Work Done
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
