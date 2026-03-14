import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { Trophy, Crown, Flame, Star, Sparkles, Medal } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const AwardPlaque = ({ ach, index }: { ach: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const icons = [Trophy, Crown, Flame, Star];
  const Icon = icons[index % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-900/40 px-8 py-10 border border-white/5 hover:border-[#0ED9D9]/40 transition-all duration-500 backdrop-blur-md shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 217, 217, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Huge Background Emblem */}
      <div className="absolute -right-6 -top-6 z-0 opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
        <Icon className="text-white w-64 h-64" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-10 flex items-start justify-between">
          <div className="flex flex-col gap-5">
            {/* 3D-like Icon Plate */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-gradient-to-b group-hover:from-[#0ED9D9]/30 group-hover:to-[#0ED9D9]/10 group-hover:border-[#0ED9D9]/50 group-hover:text-[#0ED9D9] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
              <Icon size={32} />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-300 border border-white/5 backdrop-blur-md w-fit shadow-inner">
              <Sparkles size={12} className="text-[#0ED9D9]" />
              {ach.organization}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block text-5xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-500 tracking-tighter">
              '{ach.year.slice(-2)}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors duration-300 mb-4 tracking-tight drop-shadow-md">
            {ach.title}
          </h3>
          <p className="text-slate-400 leading-relaxed font-normal text-base group-hover:text-slate-300 transition-colors duration-300">
            {ach.description}
          </p>
        </div>
      </div>

      {/* Holographic Shimmer Sweep */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out" />
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-32 bg-[#020202] overflow-hidden selection:bg-[#0ED9D9]/30 selection:text-white">

      {/* Spotlight Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020202] to-[#020202] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center p-3 w-16 h-16 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl mb-8 border border-white/10 shadow-[0_0_30px_rgba(14,217,217,0.15)] relative group">
              <div className="absolute inset-0 bg-[#0ED9D9] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
              <Medal className="w-8 h-8 text-[#0ED9D9] relative z-10" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
              Trophy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-500">Showcase</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
              A curated display of hackathon victories, prestigious awards, and distinct honors that define a trajectory of technical excellence.
            </p>
          </motion.div>
        </div>

        {/* The Grid of Plaques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 perspective-1000">
          {ACHIEVEMENTS.map((ach, index) => (
            <AwardPlaque key={index} ach={ach} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
