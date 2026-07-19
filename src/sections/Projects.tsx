import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaListUl, FaReact, FaMobileAlt, FaLock } from 'react-icons/fa';
import { SiVite } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

type CategoryFilter = 'all' | 'react' | 'mobile';

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All Projects',
  react: 'Web Apps (React)',
  mobile: 'Mobile Apps (React Native)',
};

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  EQUAL: <FaReact className="w-10 h-10 text-blue-400" />,
  ERP: <FaReact className="w-10 h-10 text-sky-400" />,
  FMS: <FaMobileAlt className="w-10 h-10 text-emerald-400" />,
  PORTFOLIO: <SiVite className="w-10 h-10 text-purple-400" />,
};

const GRADIENTS: Record<string, string> = {
  EQUAL: 'from-blue-500/25 to-sky-600/25 text-blue-500',
  ERP: 'from-sky-500/20 to-blue-600/20 text-sky-500',
  FMS: 'from-emerald-500/20 to-teal-600/20 text-emerald-500',
  PORTFOLIO: 'from-purple-500/20 to-indigo-600/20 text-purple-500',
};

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] h-[45%] rounded-full bg-accent/3 dark:bg-accent/1.5 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          A curated collection of web systems and cross-platform mobile products I have designed and engineered.
        </motion.p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-12 w-full">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold border transition-all cursor-pointer select-none ${
                selectedCategory === category
                  ? 'bg-accent border-transparent text-white shadow-md shadow-accent/15'
                  : 'bg-bg-secondary border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:max-w-xs self-start md:self-center">
          <input
            type="text"
            placeholder="Search by title or tech..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-secondary/45 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          <FaSearch className="absolute left-3.5 top-[13.5px] w-3.5 h-3.5 text-text-secondary/60 pointer-events-none" />
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 text-left"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card
                variant="default"
                glow
                className="flex flex-col h-full hover:border-accent-border/30 hover:shadow-lg group"
              >
                {/* Custom Stylized Graphic Header in place of screenshots */}
                <div className={`relative h-48 w-full bg-gradient-to-br ${GRADIENTS[project.imagePlaceholder] || 'from-accent/20 to-indigo-600/20'} flex items-center justify-center border-b border-border-primary overflow-hidden`}>
                  {/* Floating geometric detail */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                  
                  {/* Project Graphic Symbol */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="p-5 rounded-2xl bg-bg-primary/90 dark:bg-bg-secondary/90 shadow-xl border border-border-primary/50 z-10 flex items-center justify-center cursor-default max-w-[80%] max-h-[75%]"
                  >
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={`${project.title} logo`} 
                        className="h-10 w-auto object-contain select-none pointer-events-none" 
                      />
                    ) : (
                      PROJECT_ICONS[project.imagePlaceholder] || <FaReact className="w-10 h-10 text-accent" />
                    )}
                  </motion.div>
                  
                  {/* Category Badge label */}
                  {project.badge && (
                    <span className="absolute top-4 left-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {project.badge}
                    </span>
                  )}
                  
                  <span className="absolute bottom-4 right-4 bg-bg-primary/80 dark:bg-bg-secondary/80 border border-border-primary/40 text-[11px] font-mono px-2 py-0.5 rounded text-text-secondary select-none">
                    src/{project.imagePlaceholder.toLowerCase()}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="font-heading font-extrabold text-xl text-text-primary tracking-tight">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed font-sans font-light">
                      {project.description}
                    </p>

                    {/* Features checklist dropdown-style list */}
                    <div className="space-y-2 pt-2 border-t border-border-primary/50">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        <FaListUl className="w-3 h-3 text-accent" />
                        <span>Key Deliverables</span>
                      </div>
                      <ul className="space-y-1.5 pl-0 font-sans text-xs text-text-secondary leading-relaxed list-none">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech stack tags & Actions footer */}
                  <div className="space-y-5 pt-4">
                    {/* Tech stack Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[10px] font-semibold text-accent bg-accent-muted border border-accent-border/30 rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 w-full border-t border-border-primary/50 pt-4">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 border border-border-primary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary rounded-xl font-semibold text-xs transition-all ${
                            project.liveUrl ? 'w-1/2' : 'w-full'
                          } cursor-pointer`}
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                          Source Code
                        </a>
                      ) : project.isPrivate ? (
                        <div
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 border border-border-primary/20 bg-bg-tertiary/40 text-text-secondary/50 rounded-xl font-semibold text-[11px] font-sans transition-all cursor-not-allowed select-none ${
                            project.liveUrl ? 'w-1/2' : 'w-full'
                          }`}
                          title="Proprietary client codebase. Source code is confidential."
                        >
                          <FaLock className="w-3 h-3 text-amber-500/60" />
                          Private Source
                        </div>
                      ) : null}

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:opacity-95 text-white rounded-xl font-semibold text-xs transition-all ${
                            (project.githubUrl || project.isPrivate) ? 'w-1/2' : 'w-full'
                          } cursor-pointer shadow-sm shadow-accent/15`}
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          Live Demo
                        </a>
                      ) : project.isPrivate ? (
                        <div
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 border border-border-primary/20 bg-bg-tertiary/40 text-text-secondary/50 rounded-xl font-semibold text-[11px] font-sans transition-all cursor-not-allowed select-none ${
                            (project.githubUrl || project.isPrivate) ? 'w-1/2' : 'w-full'
                          }`}
                          title="Internal business application. No public demo available."
                        >
                          <FaLock className="w-3 h-3 text-amber-500/60" />
                          Private Demo
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-3"
        >
          <p className="text-text-secondary text-base font-medium">
            No projects match your search query: "{searchTerm}"
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="text-sm font-semibold text-accent hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
