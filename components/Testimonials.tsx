
import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { Quote, Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
    // Duplicate testimonials for seamless looping
    const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

    const [isPlaying, setIsPlaying] = React.useState(true);

    return (
        <section id="testimonials" className="py-32 relative overflow-hidden bg-[#000000]">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ED9D9]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0ED9D9] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                        <Quote size={14} className="rotate-180" />
                        <span>Social Proof</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-purple-500">Visionaries.</span>
                    </h2>
                    <p className="text-slate-500 max-w-xl text-lg">
                        Collaborating with forward-thinking industry leaders to build the future of digital experiences.
                    </p>
                </motion.div>
            </div>

            {/* Cinematic Slider Container */}
            <div
                className="relative flex overflow-hidden grayscale-[50%] hover:grayscale-0 transition-all duration-700"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
            >
                {/* Gradient Masks (Cosmic Emergence) */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                <motion.div
                    className="flex gap-6 py-10"
                    animate={{ x: isPlaying ? ["0%", "-50%"] : undefined }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                >
                    {doubledTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[350px] md:w-[450px] p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm relative group hover:bg-zinc-900/80 hover:border-[#0ED9D9]/30 transition-all duration-500"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-6 right-8 text-[#0ED9D9]/10 group-hover:text-[#0ED9D9]/20 transition-colors">
                                <Quote size={40} fill="currentColor" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                {/* Verified Badge */}
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="text-[#0ED9D9] fill-[#0ED9D9]" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0ED9D9]/10 border border-[#0ED9D9]/20">
                                        <ShieldCheck size={12} className="text-[#0ED9D9]" />
                                        <span className="text-[10px] font-black text-[#0ED9D9] uppercase tracking-wider">Authenticated</span>
                                    </div>
                                </div>

                                {/* Feedback */}
                                <p className="text-slate-300 text-lg leading-relaxed font-medium italic">
                                    "{testimonial.feedback}"
                                </p>

                                {/* Profile */}
                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0ED9D9] to-purple-600 p-[1.5px] group-hover:rotate-6 transition-transform duration-500">
                                        <div className="w-full h-full bg-zinc-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-sm tracking-tight group-hover:text-[#0ED9D9] transition-colors">{testimonial.name}</h4>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Inner Glow */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#0ED9D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
