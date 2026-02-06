
import React, { useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Code, Globe, Sparkles, ArrowUpRight, Cpu, User, Zap, Mail, Download } from 'lucide-react';

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    // Mouse follow for 3D Portrait
    const xMouse = useMotionValue(0);
    const yMouse = useMotionValue(0);
    const mouseXSpring = useSpring(xMouse);
    const mouseYSpring = useSpring(yMouse);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        xMouse.set(x * 20);
        yMouse.set(y * 20);
    };

    return (
        <section id="about" ref={containerRef} className="py-32 relative overflow-hidden bg-[#000000]">
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-[#0ED9D9]/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0ED9D9] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                        <User size={14} />
                        <span>Identity Portal</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-purple-500">Unseen.</span>
                    </h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">

                    {/* 1. Large Portrait Card (Span 4x2) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onMouseMove={handleMouseMove}
                        style={{ rotateX: mouseYSpring, rotateY: mouseXSpring, perspective: 1000 }}
                        className="md:col-span-4 md:row-span-2 relative group items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                        <img
                            src="/second.jpg"
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        {/* Fallback */}
                        <div className="hidden absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <span className="text-8xl">👩‍�</span>
                        </div>

                        {/* Interactive Lens Flare */}
                        <motion.div
                            className="absolute -inset-20 bg-gradient-to-br from-[#0ED9D9]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
                            style={{ x: mouseXSpring, y: mouseYSpring }}
                        />

                        <div className="absolute bottom-8 left-8 z-20">
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 rounded-2xl">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ED9D9] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0ED9D9]"></span>
                                </span>
                                <span className="text-white text-xs font-black tracking-widest uppercase">Live Pulse</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Main Story Bio (Span 8x1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-8 md:row-span-1 p-10 rounded-[2.5rem] bg-white/5 border border-white/5 relative group overflow-hidden flex flex-col justify-center"
                    >

                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                            {PERSONAL_INFO.about} I specialize in transforming complex problems into <span className="text-[#0ED9D9] font-semibold hover:text-white transition-colors cursor-help">elegant digital experiences</span>. Every line of code I write is a step toward perfecting the bridge between <span className="text-purple-400 font-semibold underline underline-offset-4 decoration-[#0ED9D9]/30">human intuition</span> and machine precision.
                        </p>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={80} className="text-[#0ED9D9]" />
                        </div>
                    </motion.div>

                    {/* 3. Experience Widget (Span 3x1) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-3 p-8 rounded-[2.5rem] bg-[#0ED9D9]/5 border border-[#0ED9D9]/10 flex flex-col justify-between group hover:bg-[#0ED9D9]/10 transition-colors"
                    >
                        <div className="p-3 rounded-2xl bg-[#0ED9D9]/10 w-fit">
                            <Code className="text-[#0ED9D9]" />
                        </div>
                        <div>
                            <span className="text-5xl font-black text-white block mb-1">02</span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Years of Mastery</span>
                        </div>
                    </motion.div>

                    {/* 4. Projects Widget (Span 3x1) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-2 p-8 rounded-[2.5rem] bg-purple-500/5 border border-purple-500/10 flex flex-col justify-between group hover:bg-purple-500/10 transition-colors"
                    >
                        <div className="p-3 rounded-2xl bg-purple-500/10 w-fit">
                            <Cpu className="text-purple-500" />
                        </div>
                        <div>
                            <span className="text-5xl font-black text-white block mb-1">10+</span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Deployments</span>
                        </div>
                    </motion.div>

                    {/* 5. Download CV / CTA (Span 3x1) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-3 rounded-[2.5rem] overflow-hidden group relative bg-white/5 border border-white/10 hover:border-[#0ED9D9]/50 transition-all duration-500"
                    >
                        <a
                            href="/CV.pdf"
                            download="Uwase_Sonia_CV.pdf"
                            className="absolute inset-0 z-20 cursor-pointer"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-500 text-white">
                            <Download className="mb-2 text-[#0ED9D9]" />
                            <span className="text-xl font-black uppercase tracking-tighter">Get Dossier</span>
                            <span className="text-[10px] opacity-50 font-bold">PDF • 2.4 MB</span>
                        </div>
                    </motion.div>

                </div>

                {/* Values / Principles Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: 'Global Thinking', desc: 'Crafting solutions that transcend borders and scale infinitely.', icon: <Globe size={24} /> },
                        { title: 'AI Orchestration', desc: 'Seamlessly weaving neural networks into modern web architecture.', icon: <Zap size={24} /> },
                        { title: 'Cinematic UX', desc: 'Designing interfaces that breathe, react, and tell a story.', icon: <Sparkles size={24} /> },
                    ].map((principle, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + (idx * 0.1) }}
                            className="flex items-start gap-4"
                        >
                            <div className="text-[#0ED9D9] pt-1">{principle.icon}</div>
                            <div>
                                <h4 className="text-white font-bold mb-2">{principle.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{principle.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
