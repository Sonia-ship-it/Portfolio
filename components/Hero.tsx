
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowRight, Terminal, Brain, Sparkles, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';
import PrismaticFlow from './PrismaticFlow';

// Counter Component for Stats
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      delay: 1,
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return controls.stop;
  }, [value]);

  return <>{displayValue}{suffix}</>;
};

const Hero: React.FC = () => {
  const words = ['Aesthetic Apps', 'Fast Systems', 'AI Solutions'];
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
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#02040a] font-jost" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PrismaticFlow />

        {/* Deep Ambient Glows */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] bg-[#0ED9D9]/5 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] w-[70%] h-[70%] bg-purple-600/5 blur-[120px] rounded-full mix-blend-screen"
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-12"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 text-[#0ED9D9] text-xs font-bold tracking-wider"
            >
              <span className="mr-3 relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ED9D9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ED9D9]"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-300">Available for new projects</span>
            </motion.div>

            {/* Headline Section */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.05] flex flex-col">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-slate-500">Crafting</span>
                <div className="min-h-[1.1em] overflow-hidden">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] via-blue-400 to-purple-500 whitespace-nowrap">
                    {words[index].substring(0, subIndex)}
                    <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-[#0ED9D9] ml-1`}>|</span>
                  </span>
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-slate-300/80 max-w-2xl leading-relaxed font-normal"
              >
                Curious by nature, I build digital experiences that blend <span className="text-[#0ED9D9] font-bold border-b border-[#0ED9D9]/20">design, development, and smart solutions</span>. From sleek interfaces to full-stack apps, I turn ideas into impactful technology.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#projects" className="group px-10 py-5 bg-[#0ED9D9] text-[#02040a] rounded-2xl font-black text-xs tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(14,217,217,0.2)]">
                View Work <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <a href="#contact" className="px-10 py-5 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-2xl font-bold text-xs tracking-widest uppercase border border-white/10 backdrop-blur-md transition-all hover:border-[#0ED9D9]/30">
                Contact Me
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-12 pt-12 border-t border-white/5"
            >
              {[
                { label: 'Years Exp', val: 2 },
                { label: 'Projects', val: 10 },
                { label: 'Global Clients', val: 5 }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 group">
                  <span className="text-3xl font-black text-white group-hover:text-[#0ED9D9] transition-colors">
                    <Counter value={stat.val} suffix="+" />
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Terminal Visual */}
          {/* RIGHT: Terminal Visual - The Ultimate MacBook Pro UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{
              rotateY: -5,
              rotateX: 3,
              scale: 1.02,
              filter: "brightness(1.1)"
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 hidden lg:block perspective-2000"
          >
            <div className="relative group">
              {/* Cinematic Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0ED9D9]/10 via-purple-500/10 to-transparent rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              {/* Terminal Frame */}
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden bg-[#08090D] border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] transition-all duration-700">

                {/* Glossy Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none z-20" />

                {/* macOS Header - Ultimate Polish */}
                <div className="bg-[#12141C] px-8 py-5 flex items-center justify-between border-b border-white/[0.04] relative z-30">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-inner hover:brightness-110 transition-all cursor-pointer" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner hover:brightness-110 transition-all cursor-pointer" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-inner hover:brightness-110 transition-all cursor-pointer" />
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-6 py-1.5 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
                    <Terminal size={12} className="text-[#0ED9D9] opacity-70" />
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap">sonia &mdash; developer.ts</span>
                  </div>

                  <div className="flex items-center gap-4 opacity-30">
                    <Sparkles size={14} className="text-white" />
                  </div>
                </div>

                {/* Breadcrumbs / Body */}
                <div className="bg-[#0A0C12] px-8 py-2.5 flex items-center border-b border-white/[0.02] relative z-20">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <span className="hover:text-white transition-colors cursor-pointer opacity-60">Sonia</span>
                    <span className="opacity-20">/</span>
                    <span className="hover:text-white transition-colors cursor-pointer opacity-60">Portfolio</span>
                    <span className="opacity-20">/</span>
                    <span className="text-[#0ED9D9]/90 font-black">developer.ts</span>
                  </div>
                </div>

                <div className="flex bg-[#08090D] min-h-[360px] relative z-10">
                  {/* Line Numbers Sidebar */}
                  <div className="w-14 pt-10 border-r border-white/5 flex flex-col items-center text-[10px] font-mono text-slate-700 bg-black/20 select-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(line => (
                      <div key={line} className="h-6 flex items-center">{line}</div>
                    ))}
                  </div>

                  {/* Code Area */}
                  <div className="p-10 lg:p-12 text-sm lg:text-[14px] font-mono leading-relaxed flex-1 w-full translate-z-10">
                    <div className="flex gap-4 mb-8">
                      <span className="text-[#0ED9D9] font-black">➜</span>
                      <span className="text-purple-500 font-bold">~</span>
                      <span className="text-white/80">cat developer.ts</span>
                    </div>

                    <div className="space-y-1 relative group/code">
                      {/* Active line highlight effect */}
                      <div className="absolute top-1 -left-[3.5rem] right-0 h-7 bg-[#0ED9D9]/[0.04] border-y border-white/[0.02] pointer-events-none" />

                      <div className="flex gap-4 h-6 items-center">
                        <span className="text-[#c678dd] italic">const</span>
                        <span className="text-[#61afef] font-black">developer</span>
                        <span className="text-white/40">=</span>
                        <span className="text-white/30">{`{`}</span>
                      </div>

                      <div className="space-y-1 pl-10 border-l border-white/5 ml-1 pt-2">
                        <div className="flex gap-4 h-6">
                          <span className="text-[#0ED9D9] font-bold">name:</span>
                          <span className="text-[#c678dd] font-semibold italic">'Sonia'</span><span className="text-white/10">,</span>
                        </div>
                        <div className="flex gap-4 h-6">
                          <span className="text-[#0ED9D9] font-bold">role:</span>
                          <span className="text-[#c678dd] font-semibold italic">'Senior Engineer'</span><span className="text-white/10">,</span>
                        </div>
                        <div className="flex gap-4 h-6">
                          <span className="text-[#0ED9D9] font-bold">passion:</span>
                          <span className="text-[#c678dd] font-semibold italic">'Crafting Excellence'</span>
                        </div>
                      </div>
                      <div className="text-white/30 h-6 flex items-center">{`}`}</div>
                    </div>

                    <div className="flex gap-4 mt-12 items-center">
                      <span className="text-[#0ED9D9] font-black animate-pulse">➜</span>
                      <span className="text-purple-500 font-bold">~</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2.5 h-6 bg-[#0ED9D9] shadow-[0_0_20px_rgba(14,217,217,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Ultimate Status Bar */}
                <div className="bg-[#12141C] px-8 py-3.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-black tracking-[0.15em] text-slate-600 relative z-30 uppercase">
                  <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-2 text-[#0ED9D9]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0ED9D9] animate-pulse shadow-[0_0_10px_#0ED9D9]" />
                      <span className="text-white/70">MAIN*</span>
                    </div>
                    <span>UTF-8</span>
                  </div>
                  <div className="flex gap-6 items-center text-emerald-500/80">
                    <span className="flex items-center gap-2">CONNECTED</span>
                    <span className="text-slate-600 tracking-widest ml-4">13:42</span>
                  </div>
                </div>
              </div>

              {/* Floating Brain Tag */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-20 p-5 rounded-[2.2rem] bg-[#0A0C12]/80 backdrop-blur-3xl border border-white/10 shadow-2xl z-40 flex items-center gap-4 hover:border-[#0ED9D9]/20 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0ED9D9]/10 flex items-center justify-center text-[#0ED9D9]">
                  <Brain size={24} />
                </div>
                <div>
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">AI Systems</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Active</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-[#0ED9D9] rounded-full" />
          <div className="w-px h-16 bg-gradient-to-b from-[#0ED9D9] to-transparent opacity-20" />
        </div>
        <span className="text-[10px] text-slate-500 font-normal uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;