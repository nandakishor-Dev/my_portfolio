import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 max-w-5xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[40%] left-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-500/4 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Education
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          My academic foundation in computer science and software development.
        </motion.p>
      </div>

      {/* Timeline wrapper */}
      <div className="relative border-l border-border-primary/80 ml-4 sm:ml-6 md:ml-8 text-left space-y-12">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 sm:pl-10 md:pl-12 group"
          >
            {/* Timeline Circle Node */}
            <span className="absolute left-[-11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bg-primary border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 group-hover:bg-bg-primary transition-colors duration-300" />
            </span>

            {/* Education Card */}
            <Card
              variant="default"
              glow
              className="p-6 md:p-8 hover:border-indigo-500/30 hover:shadow-md"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary flex items-center gap-2.5">
                    <FaGraduationCap className="w-6 h-6 text-indigo-500 shrink-0" />
                    {item.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-text-secondary mt-2.5 font-medium text-sm sm:text-base">
                    <FaUniversity className="w-4 h-4 text-indigo-500/80 shrink-0" />
                    <span>{item.institution}</span>
                  </div>
                </div>
                
                {/* Date range tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bg-tertiary text-text-secondary text-xs sm:text-sm font-semibold border border-border-primary/50 self-start md:self-center">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
