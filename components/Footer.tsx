import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp, Heart, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-32 pb-12 overflow-hidden bg-[#02040a]">
            {/* Dynamic Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0ED9D9]/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full animate-pulse delay-700" />
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-white/[0.03] to-transparent" />
            <div className="absolute top-0 right-[10%] w-[1px] h-full bg-gradient-to-b from-white/[0.03] to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20 pb-24">

                    {/* Brand & Narrative */}
                    <div className="md:col-span-6 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-5"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-[#0ED9D9] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative w-16 h-16 rounded-2xl bg-[#08090D] border border-white/10 flex items-center justify-center shadow-2xl transition-all group-hover:border-[#0ED9D9]/30">
                                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0ED9D9] to-blue-500 leading-none">S</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Uwase Sonia</h3>
                                <p className="text-[11px] text-[#0ED9D9] font-black uppercase tracking-[0.4em] leading-none opacity-80">Full Stack Engineer</p>
                            </div>
                        </motion.div>

                        <p className="text-slate-400 text-xl leading-relaxed max-w-lg font-light">
                            Crafting <span className="text-white font-medium italic underline decoration-[#0ED9D9]/30">impactful technology</span> through design-driven engineering and smart architectural solutions.
                        </p>

                        <div className="flex items-center gap-5">
                            {[
                                { icon: Github, href: PERSONAL_INFO.github },
                                { icon: Linkedin, href: PERSONAL_INFO.linkedin },
                                { icon: Twitter, href: PERSONAL_INFO.twitter }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -8, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0ED9D9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <social.icon size={22} className="relative z-10 transition-transform group-hover:drop-shadow-[0_0_12px_rgba(14,217,217,0.5)]" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Grid */}
                    <div className="md:col-span-6 grid grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] opacity-50">Sitemap</h4>
                            <ul className="space-y-5">
                                {['About', 'Projects', 'Skills', 'Experience'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            className="text-slate-500 hover:text-[#0ED9D9] transition-all flex items-center gap-3 group text-xs font-black uppercase tracking-[0.2em]"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-[#0ED9D9] group-hover:scale-150 transition-all" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] opacity-50">Contact</h4>
                            <div className="space-y-6">
                                <a href="mailto:uwasesonia43@gmail.com" className="group block">
                                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-1.5 group-hover:text-[#0ED9D9] transition-colors">Direct Email</p>
                                    <p className="text-white font-medium text-sm border-b border-transparent group-hover:border-[#0ED9D9]/30 inline-block transition-all italic tracking-wide">uwasesonia43@gmail.com</p>
                                </a>

                                <div className="group block cursor-default">
                                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-1.5">Availability</p>
                                    <div className="text-white font-medium text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                        Worldwide / Remote
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cinematic Bottom Bar */}
                <div className="relative pt-12">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                            <span>© {currentYear}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-white/5" />
                            <div className="flex items-center gap-2">
                            Building meaningful digital experiences.
                            </div>
                        </div>

                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -8, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-4 px-8 py-3.5 rounded-2xl bg-[#08090D] border border-white/10 hover:border-[#0ED9D9]/40 transition-all group relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0ED9D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors relative z-10">Terminal: Top</span>
                            <ArrowUp size={18} className="text-[#0ED9D9] relative z-10 group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
