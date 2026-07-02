import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 max-w-5xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[40%] right-[-10%] w-[35%] h-[35%] rounded-full bg-accent/4 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Professional Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          An overview of my commercial frontend development career.
        </motion.p>
      </div>

      {/* Timeline wrapper */}
      <div className="relative border-l border-border-primary/80 ml-4 sm:ml-6 md:ml-8 text-left space-y-12">
        {experience.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 sm:pl-10 md:pl-12 group"
          >
            {/* Timeline Circle Node */}
            <span className="absolute left-[-11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bg-primary border-2 border-accent group-hover:bg-accent transition-colors duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent group-hover:bg-bg-primary transition-colors duration-300" />
            </span>

            {/* Experience Card */}
            <Card
              variant="default"
              glow
              className="p-6 md:p-8 hover:border-accent-border/40 hover:shadow-md"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-primary pb-4 mb-6">
                <div>
                  <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 text-text-secondary mt-1.5 font-medium text-sm sm:text-base">
                    <FaBriefcase className="w-3.5 h-3.5 text-accent" />
                    <span>{item.company}</span>
                  </div>
                </div>
                
                {/* Date range tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bg-tertiary text-text-secondary text-xs sm:text-sm font-semibold border border-border-primary/50 self-start md:self-center">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-accent" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Responsibilities list */}
              <ul className="space-y-3 font-sans text-text-secondary text-sm sm:text-base leading-relaxed list-none pl-0">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
