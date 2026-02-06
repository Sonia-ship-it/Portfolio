
import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { Trophy, Award, Star, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const Achievements: React.FC = () => {
  const icons = [Trophy, Award, Star, Lightbulb];

  return (
    <section id="achievements" className="py-24 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#0ED9D9] font-bold tracking-widest uppercase text-sm mb-4">HALL OF FAME</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">Achievements & Wins</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((ach, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-[#0ED9D9]/40 transition-all duration-300 flex items-start gap-6 hover:shadow-lg hover:shadow-[#0ED9D9]/5"
              >
                <div className="w-16 h-16 bg-[#0ED9D9]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0ED9D9] group-hover:text-slate-900 transition-all duration-500">
                  <Icon size={32} className="text-[#0ED9D9] group-hover:text-slate-900" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#0ED9D9] text-xs font-bold uppercase tracking-widest">{ach.year}</span>
                    <span className="text-slate-500 text-xs font-medium uppercase tracking-tighter">{ach.organization}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors">{ach.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
