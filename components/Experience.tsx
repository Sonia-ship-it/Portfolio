
import React, { useRef } from 'react';
import { EXPERIENCES } from '../constants';
import { Calendar, Briefcase, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

const ExperienceCard = ({ exp, index }: { exp: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative flex flex-col md:flex-row gap-8 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="md:w-1/2 space-y-4">
        <div
          className="p-1 rounded-[2.5rem] bg-gradient-to-br from-[#0ED9D9]/20 via-transparent to-purple-500/20"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="p-8 rounded-[2.2rem] bg-slate-900/60 backdrop-blur-2xl border border-white/5 group shadow-2xl transition-all duration-500 hover:border-[#0ED9D9]/40 outline-none">
            <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="p-2 rounded-xl bg-[#0ED9D9]/10 text-[#0ED9D9]">
                <Calendar size={16} />
              </div>
              <span className="text-[#0ED9D9] font-bold tracking-[0.2em] text-[10px] uppercase">{exp.period}</span>
            </div>

            <h4 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#0ED9D9] transition-colors">
              {exp.position}
            </h4>

            <div className={`flex items-center gap-2 text-slate-300 font-bold text-sm mb-6 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <Briefcase size={14} className="text-[#0ED9D9]" />
              <span>{exp.company}</span>
            </div>

            <ul className="space-y-3">
              {exp.description.map((desc: string, i: number) => (
                <li key={i} className={`flex gap-3 text-sm text-slate-400 leading-relaxed font-normal ${index % 2 !== 0 && 'md:flex-row-reverse md:text-right'}`}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0ED9D9] flex-shrink-0 animate-pulse" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {/* Shine Glow */}
            <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-tr from-[#0ED9D9]/0 via-[#0ED9D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Center Anchor Point */}
      <div className="absolute left-0 md:left-1/2 top-10 w-4 h-4 rounded-full bg-[#0ED9D9] border-[3px] border-[#03050a] -translate-x-1/2 z-20 hidden md:block shadow-[0_0_15px_#0ED9D9]">
        <div className="absolute inset-0 rounded-full bg-[#0ED9D9] animate-ping opacity-40" />
      </div>

      <div className="md:w-1/2"></div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-32 relative overflow-hidden bg-[#03050a]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0ED9D9]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <Briefcase className="w-8 h-8 text-[#0ED9D9] relative z-10" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-500">Milestones</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
              A chronological journey through impactful roles, meaningful contributions, and continuous professional growth.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Sinuous Journey Path */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 -translate-x-1/2 z-0 hidden md:block">
            <svg width="40" height="100%" className="overflow-visible">
              <motion.path
                d="M 20 0 C 40 200, 0 400, 20 600 C 40 800, 0 1000, 20 1200"
                stroke="rgba(14, 217, 217, 0.15)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 20 0 C 40 200, 0 400, 20 600 C 40 800, 0 1000, 20 1200"
                stroke="#0ED9D9"
                strokeWidth="2"
                fill="none"
                style={{ pathLength }}
              />
            </svg>

            {/* Traveling Energy Pulse */}
            <motion.div
              style={{ top: pulseY }}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#0ED9D9] blur-[2px] z-30"
            >
              <div className="absolute inset-0 bg-[#0ED9D9] rounded-full animate-ping" />
            </motion.div>
          </div>

          <div className="space-y-32">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Marker */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-[#0ED9D9] to-transparent opacity-30" />
    </section>
  );
};

export default Experience;
