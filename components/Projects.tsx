
import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="text-[#0ED9D9] font-bold tracking-widest uppercase text-sm mb-4">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Featured Projects</h3>
            <p className="text-slate-400 leading-relaxed">
              A collection of selected works that demonstrate my technical expertise and eye for design. Each project is built to solve specific challenges with modern stacks.
            </p>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="text-[#0ED9D9] font-semibold hover:text-[#09B3B3] transition-colors flex items-center gap-2"
          >
            View All Projects <ExternalLink size={18} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-[#0ED9D9]/50 transition-all duration-300 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60"></div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h4 className="text-xl font-bold text-white group-hover:text-[#0ED9D9] transition-colors">{project.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    {project.github && (
                      <a href={project.github} className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform">
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <button className="text-xs font-bold text-[#0ED9D9] hover:text-[#09B3B3] uppercase tracking-widest group-hover:underline">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
