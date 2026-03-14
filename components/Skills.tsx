import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SKILLS } from '../constants';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Layout, Server, Sparkles, Cpu, Wrench, Code2, Database } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationOffset, setRotationOffset] = useState(0);

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), { stiffness: 100, damping: 30 });

  // Auto-rotation effect
  useEffect(() => {
    if (activeCategory) return;
    const interval = setInterval(() => {
      setRotationOffset(prev => prev + 0.002);
    }, 16);
    return () => clearInterval(interval);
  }, [activeCategory]);

  const categories = useMemo(() => {
    const grouped = SKILLS.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof SKILLS>);
    return Object.entries(grouped);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Layout size={32} />;
      case 'Backend': return <Server size={32} />;
      case 'Design': return <Sparkles size={32} />;
      case 'Embedded': return <Cpu size={32} />;
      case 'DevOps': return <Wrench size={32} />;
      case 'AI': return <Code2 size={32} />;
      default: return <Database size={32} />;
    }
  };

  const getPosition = (index: number, total: number, isActive: boolean) => {
    const angle = (index / total) * Math.PI * 2 + rotationOffset;
    const rx = 350;
    const rz = 250;
    const repulsion = activeCategory && !isActive ? 1.4 : 1;

    return {
      x: Math.cos(angle) * rx * repulsion,
      z: Math.sin(angle) * rz * repulsion,
      angle
    };
  };

  // Focus Lock Handlers
  const triggerFocus = (category: string) => {
    if (isLocked && activeCategory !== category) return;
    setActiveCategory(category);
    setIsLocked(true);
  };

  const releaseFocus = () => {
    setActiveCategory(null);
    setIsLocked(false);
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#03050a]"
      style={{ perspective: '1500px' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#0ED9D9]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-30 mb-8">
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
              <Code2 className="w-8 h-8 text-[#0ED9D9] relative z-10" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
              Mastered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-500">Technologies</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
              A comprehensive toolkit of modern frameworks, languages, and platforms mastered through years of hands-on engineering.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-7xl h-[700px] flex items-center justify-center"
      >
        {/* Central "NEXUS" Interface (Geometric Prism) */}
        <div className="absolute z-20 flex items-center justify-center scale-110" style={{ transformStyle: 'preserve-3d' }}>

          {/* Central Singularity (Core Light) */}
          <motion.div
            className="absolute w-12 h-12 bg-white rounded-full blur-xl z-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              boxShadow: ["0 0 20px #fff", "0 0 50px #0ED9D9", "0 0 20px #fff"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Core Geometric Base */}
          <div className="relative w-32 h-32 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

            {/* Shard 1 (Cyan) */}
            <motion.div
              className="absolute w-24 h-24 border border-[#0ED9D9]/40 bg-[#0ED9D9]/5 backdrop-blur-sm"
              animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />

            {/* Shard 2 (Magenta) */}
            <motion.div
              className="absolute w-28 h-28 border border-purple-500/40 bg-purple-500/5 backdrop-blur-sm"
              animate={{ rotateX: -360, rotateY: 180, rotateZ: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
            />

            {/* Shard 3 (White/Glass) */}
            <motion.div
              className="absolute w-20 h-20 border border-white/20 bg-white/5 backdrop-blur-md"
              animate={{ rotateX: 180, rotateY: -360, rotateZ: 180 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)' }}
            />

            {/* Label Container */}
            <motion.div
              className="z-30 flex flex-col items-center"
              animate={{ translateZ: 40 }}
            >
              <div className="bg-[#03050a]/80 py-1 px-4 border border-white/10 backdrop-blur-2xl rounded-sm">
                <span className="text-white font-black text-xl tracking-[0.4em]">SKILLS</span>
              </div>
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#0ED9D9] to-transparent w-full mt-1"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Orbital Field (Particles Simulated by Dashed Rings) */}
          {[180, 220, 260].map((size, i) => (
            <motion.div
              key={i}
              className="absolute border border-dashed border-white/5 rounded-full"
              style={{ width: size, height: size }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: activeCategory ? 0.9 : 1
              }}
              transition={{
                rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                scale: { type: 'spring', stiffness: 100 }
              }}
            />
          ))}

          {/* Pulse Ripple */}
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-40 h-40 border-2 border-[#0ED9D9]/20 rounded-full z-10"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Tech Planets */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {categories.map(([category, items], idx) => {
            const isActive = activeCategory === category;
            const isAnyActive = activeCategory !== null;
            const pos = getPosition(idx, categories.length, isActive);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isAnyActive && !isActive ? 0.15 : 1,
                  scale: isActive ? 1.15 : 1,
                  x: isActive ? 0 : pos.x,
                  z: isActive ? 450 : pos.z, // Maximum priority for active element
                  y: isActive ? -100 : (idx % 2 === 0 ? 60 : -60)
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 25 }}
                onMouseEnter={() => triggerFocus(category)}
                onMouseLeave={releaseFocus}
                className={`absolute cursor-pointer flex flex-col items-center group ${isActive ? 'z-[100]' : 'z-10'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: isLocked && !isActive ? 'none' : 'auto' // LOCK INTERACTION
                }}
              >
                {/* Holographic Planet Card */}
                <div className={`relative p-4 rounded-xl bg-slate-900/70 backdrop-blur-3xl border transition-all duration-700 flex flex-col items-center text-center ${isActive ? 'w-64 border-[#0ED9D9] shadow-[0_0_60px_rgba(14,217,217,0.3)]' : 'w-44 border-white/10 hover:border-[#0ED9D9]/40'}`}>
                  {/* Glowing Aura for Active Item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0ED9D9]/5 to-purple-600/5 rounded-[2rem] -z-10 animate-pulse" />
                  )}

                  <div className={`mb-4 transition-all duration-500 ${isActive ? 'text-[#0ED9D9] scale-125' : 'text-slate-400 group-hover:text-white'}`}>
                    {getIcon(category)}
                  </div>
                  <h4 className={`font-black text-white mb-3 transition-all duration-500 tracking-tight ${isActive ? 'text-3xl' : 'text-xl'}`}>{category}</h4>

                  {/* Pulse Line */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0ED9D9] to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                    />
                  </div>

                  {/* Skills Grid (High Visibility) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="grid grid-cols-2 gap-2 w-full mt-2"
                      >
                        {items.map((skill, sIdx) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sIdx * 0.05 }}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1 items-start hover:bg-white/10 transition-colors"
                          >
                            <span className="text-[10px] font-black text-slate-100 uppercase tracking-wider">{skill.name}</span>
                            <div className="flex items-center gap-3 w-full">
                              <span className="text-xs text-[#0ED9D9] font-black">{skill.level}%</span>
                              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  className="h-full bg-gradient-to-r from-[#0ED9D9] to-purple-400"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Vertical Connector */}
                {!isActive && (
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-[380px] bg-gradient-to-t from-[#0ED9D9]/30 to-transparent -z-10 transition-opacity duration-700 ${isAnyActive ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transform: `rotate(${pos.angle + Math.PI / 2}rad)` }} />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};

export default Skills;
