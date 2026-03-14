import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, MonitorPlay, Layers, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div
      layout
      className="group relative flex flex-col w-full h-[600px] rounded-[2rem] bg-[#0A0B10] border border-white/[0.06] hover:border-[#0ED9D9]/30 transition-all duration-[0.6s] ease-out shadow-lg hover:shadow-[0_0_50px_rgba(14,217,217,0.08)] overflow-hidden"
    >
      {/* Image Showcase Section (Top 45%) */}
      <div className="w-full h-[45%] relative p-6 pb-0 flex flex-col justify-end shrink-0">
        {/* Soft background glow inside the image area */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-blue-900/10 to-transparent pointer-events-none z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Browser/App Window Mockup perfectly visible by default */}
        <div className="relative w-full h-[95%] bg-[#030304] rounded-t-2xl border border-white/10 border-b-0 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10 flex flex-col group-hover:-translate-y-3 transition-transform duration-[0.7s] ease-[0.19,1,0.22,1]">
          {/* Browser Header */}
          <div className="h-8 w-full bg-[#11131a] border-b border-white/[0.05] flex items-center px-4 gap-2.5 shrink-0">
            {/* macOS styled window buttons */}
            <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-[#FF5F56] transition-colors duration-300" />
            <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-[#FFBD2E] transition-colors duration-300 delay-75" />
            <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-[#27C93F] transition-colors duration-300 delay-150" />

            {/* Fake URL Bar */}
            <div className="ml-4 flex-1 h-3.5 rounded-full bg-white/[0.03] border border-white/[0.02]" />
          </div>

          {/* Project Image */}
          <div className="relative flex-1 overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[110%] object-cover origin-top transition-transform duration-[1.5s] ease-[0.19,1,0.22,1] group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
            />
            {/* Optional internal glare sweep */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-[150%] skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out" />
          </div>
        </div>
      </div>

      {/* Content Section (Bottom 55% - High Padding) */}
      <div className="relative flex-1 p-8 md:p-10 pb-16 flex flex-col bg-[#0A0B10] z-20">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-[#0ED9D9]" />
              <span className="text-[#0ED9D9] text-[11px] font-bold tracking-[0.2em] uppercase">
                {project.category || 'Featured'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#0ED9D9] transition-all duration-300">
              {project.title}
            </h3>
          </div>

          {/* Always-visible action icons, styled beautifully */}
          <div className="flex gap-3 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all shadow-md group-hover:scale-105"
              >
                <Github size={20} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[rgba(14,217,217,0.05)] border border-[rgba(14,217,217,0.2)] flex items-center justify-center text-[#0ED9D9] hover:bg-[#0ED9D9] hover:text-[#0A0A0E] hover:border-[#0ED9D9] hover:scale-110 transition-all shadow-md"
              >
                <ExternalLink size={20} strokeWidth={2.5} />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-[15px] leading-relaxed font-normal line-clamp-3 mb-8 flex-1 group-hover:text-slate-300 transition-colors duration-500">
          {project.description}
        </p>

        {/* Premium Tech Tags */}
        <div className="flex flex-wrap gap-2.5 mt-auto mb-2">
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-300 font-bold tracking-widest uppercase shadow-inner"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic base glow indicator */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#0ED9D9]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-[0.8s] ease-[0.19,1,0.22,1]" />
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category || 'Other')))];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => (p.category || 'Other') === activeCategory);

  return (
    <section id="projects" className="relative py-32 bg-[#020202] overflow-hidden selection:bg-[#0ED9D9]/30 selection:text-white">

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
              <LayoutGrid className="w-8 h-8 text-[#0ED9D9] relative z-10" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ED9D9] to-blue-500">Archive</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
              A curated gallery of platforms and applications I've engineered — demonstrating technical depth, pixel-perfect execution, and scalable architecture.
            </p>
          </motion.div>
        </div>

        {/* Floating Dock Filter (Apple style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center p-2 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 md:px-8 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-500 z-10 ${activeCategory === category
                  ? 'text-[#020202]'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilterDock"
                    className="absolute inset-0 bg-gradient-to-r from-[#0ED9D9] to-cyan-400 rounded-full -z-10 shadow-[0_0_20px_rgba(14,217,217,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Structural Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <a
            href="#"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 rounded-full text-white font-bold tracking-[0.1em] uppercase text-xs overflow-hidden transition-all duration-300 hover:border-[#0ED9D9]/50 shadow-2xl hover:shadow-[0_0_40px_rgba(14,217,217,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0ED9D9]/10 to-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0ED9D9]">Explore Full Archive</span>
            <ExternalLink size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-slate-400 group-hover:text-[#0ED9D9]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
