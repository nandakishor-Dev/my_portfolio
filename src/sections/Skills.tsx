import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaDatabase, FaTools, FaLightbulb } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Frontend": <FaLaptopCode className="w-5 h-5" />,
  "Mobile": <FaMobileAlt className="w-5 h-5" />,
  "Backend Familiarity": <FaDatabase className="w-5 h-5" />,
  "Tools & Workflow": <FaTools className="w-5 h-5" />,
  "Soft Skills": <FaLightbulb className="w-5 h-5" />,
};

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="skills" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-500/3 dark:bg-indigo-500/2 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Skills & Technical Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          My programming languages, frameworks, developer tools, and professional soft skills.
        </motion.p>
      </div>

      {/* Grid container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((category) => (
          <motion.div key={category.title} variants={cardVariants} className="h-full">
            <Card
              variant="default"
              glow
              className="p-6 md:p-8 flex flex-col h-full hover:border-accent-border/40 hover:shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-6 border-b border-border-primary/60 pb-4">
                <span className="p-2.5 rounded-xl bg-accent-muted text-accent">
                  {CATEGORY_ICONS[category.title] || <FaLaptopCode className="w-5 h-5" />}
                </span>
                <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary text-left">
                  {category.title}
                </h3>
              </div>

              {/* Chips Grid */}
              <div className="flex flex-wrap gap-2.5 justify-start">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block px-3.5 py-2 text-xs font-semibold text-text-secondary bg-bg-tertiary border border-border-primary/60 hover:border-accent-border hover:bg-accent-muted hover:text-accent rounded-xl cursor-default transition-colors duration-200 select-none font-sans text-left"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
