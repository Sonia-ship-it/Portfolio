
import React, { useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Code, Globe, Sparkles, ArrowUpRight, Cpu, User, Zap, Mail, Download, Shield, Palette, Terminal } from 'lucide-react';

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Mouse follow for 3D Portrait
    const xMouse = useMotionValue(0);
    const yMouse = useMotionValue(0);
    const mouseXSpring = useSpring(xMouse, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(yMouse, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        xMouse.set(x * 15);
        yMouse.set(y * 15);
    };

    const pillars = [
        { icon: Terminal, label: 'Full-Stack Development', desc: 'Building end-to-end applications with modern frameworks and scalable architecture.', color: '#0ED9D9' },
        { icon: Palette, label: 'UI/UX Design', desc: 'Crafting pixel-perfect, intuitive interfaces that delight users at every interaction.', color: '#818CF8' },
        { icon: Shield, label: 'Cybersecurity', desc: 'Integrating security-first principles to build resilient, trustworthy digital systems.', color: '#34D399' },
    ];

    return (
        <section id="about" ref={containerRef} className="py-32 relative overflow-hidden bg-[#000000]">
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-[#0ED9D9]/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* HEADER — UNTOUCHED */}
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
                            <User className="w-8 h-8 text-[#0ED9D9] relative z-10" />
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
                            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-500">Unseen</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
                            A forward-thinking software architect crafting intuitive interfaces backed by robust, high-performance systems.
                        </p>
                    </motion.div>
                </div>

                {/* ═══════ PREMIUM CONTENT BELOW ═══════ */}

                {/* Top Row: Portrait + Bio Story */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

                    {/* 3D Interactive Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { xMouse.set(0); yMouse.set(0); }}
                        style={{ rotateX: mouseYSpring, rotateY: mouseXSpring, perspective: 1200 }}
                        className="lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 h-[480px] shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                        <img
                            src="/second.jpg"
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="hidden absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <span className="text-8xl">👩‍💻</span>
                        </div>

                        {/* Mouse-tracking lens flare */}
                        <motion.div
                            className="absolute -inset-20 bg-gradient-to-br from-[#0ED9D9]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
                            style={{ x: mouseXSpring, y: mouseYSpring }}
                        />

                        {/* Bottom Name Plate */}
                        <div className="absolute bottom-0 inset-x-0 p-8 z-20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight mb-1">{PERSONAL_INFO.name}</h3>
                                    <p className="text-[#0ED9D9] text-xs font-bold tracking-[0.2em] uppercase">{PERSONAL_INFO.role}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ED9D9] opacity-75" />
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0ED9D9]" />
                                    </span>
                                    <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Available</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio Story + Stats */}
                    <div className="lg:col-span-3 flex flex-col gap-8">

                        {/* Story Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="flex-1 p-10 lg:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.06] relative group overflow-hidden hover:border-white/10 transition-colors duration-500"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                                <Sparkles size={120} className="text-[#0ED9D9]" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-[2px] bg-[#0ED9D9]" />
                                    <span className="text-[#0ED9D9] text-[10px] font-black tracking-[0.3em] uppercase">My Story</span>
                                </div>
                                <p className="text-slate-300 text-lg lg:text-xl leading-[1.8] font-normal">
                                    {PERSONAL_INFO.about}
                                </p>
                            </div>
                        </motion.div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: '02', label: 'Years of Mastery', accent: 'bg-[#0ED9D9]' },
                                { value: '10+', label: 'Projects Shipped', accent: 'bg-purple-500' },
                                { value: '∞', label: 'Curiosity Level', accent: 'bg-emerald-500' },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                                    className="p-6 lg:p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors duration-500 group text-center"
                                >
                                    <div className={`w-2 h-2 rounded-full ${stat.accent} mx-auto mb-4 group-hover:scale-150 transition-transform duration-300`} />
                                    <span className="text-3xl lg:text-4xl font-black text-white block mb-2">{stat.value}</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Three Pillars Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                                className="group relative p-8 lg:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden"
                            >
                                {/* Hover accent glow */}
                                <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${pillar.color}40, transparent)` }} />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/[0.08] bg-white/[0.03] group-hover:scale-110 transition-transform duration-500" style={{ boxShadow: `0 0 30px ${pillar.color}15` }}>
                                        <Icon size={28} style={{ color: pillar.color }} />
                                    </div>
                                    <h4 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#0ED9D9] transition-all duration-300">
                                        {pillar.label}
                                    </h4>
                                    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors duration-300 font-normal">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Download CV Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-[#0ED9D9]/30 transition-all duration-500 group"
                >
                    <a
                        href="/CV.pdf"
                        download="Uwase_Sonia_CV.pdf"
                        className="flex items-center justify-between p-8 lg:p-10"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#0ED9D9]/10 border border-[#0ED9D9]/20 flex items-center justify-center group-hover:bg-[#0ED9D9] group-hover:border-[#0ED9D9] transition-all duration-300">
                                <Download size={24} className="text-[#0ED9D9] group-hover:text-[#030305] transition-colors duration-300" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg tracking-tight mb-1">Download Résumé</h4>
                                <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">PDF Document • Ready to Print</p>
                            </div>
                        </div>
                        <ArrowUpRight size={24} className="text-slate-500 group-hover:text-[#0ED9D9] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                    {/* Hover sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                </motion.div>

            </div>
        </section>
    );
};

export default About;
