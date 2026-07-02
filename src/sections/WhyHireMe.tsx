import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaCode, FaBolt, FaPalette, FaBug, FaMobileAlt, FaMobile } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

const ICON_MAP: Record<string, React.ReactNode> = {
  FaReact: <FaReact className="w-6 h-6" />,
  FaCode: <FaCode className="w-6 h-6" />,
  FaLightningBolt: <FaBolt className="w-6 h-6" />,
  FaPalette: <FaPalette className="w-6 h-6" />,
  FaBug: <FaBug className="w-6 h-6" />,
  FaMobileAlt: <FaMobileAlt className="w-6 h-6" />,
  SiTypescript: <SiTypescript className="w-5.5 h-5.5" />,
  FaMobile: <FaMobile className="w-6 h-6" />,
};

export const WhyHireMe: React.FC = () => {
  const { hireMeReasons } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
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
    <section id="why-hire-me" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] rounded-full bg-accent/3 dark:bg-accent/1.5 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          Why Hire Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          My core values and engineering strengths that bring high commercial value to teams.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left"
      >
        {hireMeReasons.map((reason) => (
          <motion.div key={reason.title} variants={cardVariants} className="h-full">
            <Card
              variant="default"
              glow
              className="p-6 flex flex-col h-full hover:border-accent-border/40 hover:shadow-md"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-accent-muted text-accent w-fit mb-5">
                {ICON_MAP[reason.iconName] || <FaCode className="w-6 h-6" />}
              </div>

              {/* Text Info */}
              <div className="space-y-2 flex-1">
                <h3 className="font-heading font-bold text-base md:text-lg text-text-primary">
                  {reason.title}
                </h3>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed font-sans font-light">
                  {reason.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyHireMe;
