
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowRight, Terminal, Brain, Sparkles, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import PrismaticFlow from './PrismaticFlow';

const Hero: React.FC = () => {
  const words = ["Digital Excellence.", "Modern UI/UX.", "AI Integration.", "Robust Architecture."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Cursor blink
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050914]">
      {/* Prismatic Flow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <PrismaticFlow />

        {/* Nebulas/Glows */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#0ED9D9]/10 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#0ED9D9]/10 border border-[#0ED9D9]/20 text-[#0ED9D9] text-sm font-semibold"
            >
              <span className="mr-2 relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ED9D9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0ED9D9]"></span>
              </span>
              Available for new projects
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight min-h-[160px] md:min-h-[220px]">
              Crafting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-purple-400">
                {words[index].substring(0, subIndex)}
                <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-[#0ED9D9] ml-1`}>|</span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
            >
              {PERSONAL_INFO.tagline} Focused on crafting high-performance user interfaces and integrating powerful AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="px-8 py-4 bg-[#0ED9D9] hover:bg-[#09B3B3] text-slate-900 rounded-xl font-bold flex items-center gap-2 transition-all group hover:shadow-[0_0_30px_rgba(14,217,217,0.4)] hover:scale-105">
                View Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5 hover:border-white/10 hover:shadow-lg hover:shadow-purple-500/10">
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-8 pt-8 text-slate-400"
            >
              <div className="flex flex-col group cursor-default">
                <span className="text-3xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors duration-300">2+</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-slate-300 transition-colors">Years Exp</span>
              </div>
              <div className="w-px h-12 bg-slate-800"></div>
              <div className="flex flex-col group cursor-default">
                <span className="text-3xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors duration-300">10+</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-slate-300 transition-colors">Projects</span>
              </div>
              <div className="w-px h-12 bg-slate-800"></div>
              <div className="flex flex-col group cursor-default">
                <span className="text-3xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors duration-300">5+</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider group-hover:text-slate-300 transition-colors">Global Clients</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - MacBook Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* terminal like UI element */}
            <div className="relative z-10 rounded-2xl overflow-hidden bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-[#0ED9D9]/30 transition-all duration-500 group">
              {/* Terminal Header */}
              <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                  <Terminal size={12} />
                  <span>zsh — 80x24</span>
                </div>
                <div className="w-12"></div>
              </div>

              <div className="p-8 text-lg space-y-3">
                <div className="flex gap-3 text-slate-500">
                  <span className="text-[#0ED9D9]">➜</span>
                  <span className="text-purple-400">~</span>
                  <span className="text-white">cat developer.ts</span>
                </div>

                <div className="space-y-2 text-[#0ED9D9] pl-4">
                  <p><span className="text-purple-400">const</span> developer = <span className="text-yellow-300">{`{`}</span></p>
                  <p className="ml-4">name: <span className="text-green-400">'Uwase Sonia'</span>,</p>
                  <p className="ml-4">role: <span className="text-green-400">'Full Stack Developer'</span>,</p>
                  <p className="ml-4">skills: [<span className="text-green-400">'React', 'Next.js', 'SpringBoot', 'NestJS'</span>],</p>
                  <p className="ml-4">passion: <span className="text-green-400">'Building Awesome Stuff'</span></p>
                  <p className="text-yellow-300">{`}`}</p>
                </div>

                <div className="flex gap-3 text-slate-500">
                  <span className="text-[#0ED9D9]">➜</span>
                  <span className="text-purple-400">~</span>
                  <span className="w-2 h-4 bg-[#0ED9D9] animate-pulse"></span>
                </div>
              </div>

              {/* Animated subtle light effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0ED9D9]/0 to-[#0ED9D9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
            </div>

            {/* Floating Orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0ED9D9]/20 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl"></div>

            {/* Feature Cards with hover and float */}
            <div className="absolute -right-4 top-1/4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3 animate-bounce shadow-[#0ED9D9]/10 transition-transform hover:scale-110">
              <Brain className="text-[#0ED9D9]" size={24} />
              <span className="text-sm font-semibold text-white">AI Specialist</span>
            </div>
            <div className="absolute -left-8 bottom-1/4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3 animate-pulse shadow-purple-500/10 transition-transform hover:scale-110">
              <Terminal className="text-purple-500" size={24} />
              <span className="text-sm font-semibold text-white">Full Stack Wizard</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
