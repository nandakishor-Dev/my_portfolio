import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

// Animated Counter component
const StatCounter: React.FC<{ value: string }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Extract numerical value (e.g., "15+" -> 15)
    const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(target)) return;

    const duration = 1800; // 1.8s duration
    const startTimestamp = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, isInView]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const { profile, stats } = portfolioData;

  const bulletPoints = [
    "3 years 2 months professional experience",
    "Enterprise frontend web development",
    "React.js Core Expertise",
    "TypeScript & Typings Architecture",
    "JavaScript ES6+ Syntax",
    "REST APIs Integration & Caching",
    "Responsive Layout Design",
    "Clean Code & SOLID Design Patterns",
    "UI Performance Auditing & Code Splitting",
    "Reusable Design System components"
  ];

  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Subtle Background Blob */}
      <div className="absolute top-[30%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent/4 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg leading-relaxed"
        >
          My background, experience metrics, and key focus areas as a software engineer.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Summary and Core Pillars */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold font-heading text-text-primary">
              Professional Summary
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-sans">
              {profile.aboutSummary}
            </p>
          </motion.div>

          {/* Honest Mobile Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card variant="glass" className="border-accent-border/40 bg-accent-muted/40 p-5 rounded-2xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-2 font-heading">
                Mobile Development Capability
              </h4>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                {profile.aboutHonestMobile}
              </p>
            </Card>
          </motion.div>

          {/* Pillars Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold font-heading text-text-primary">
              Core Architectural Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5 text-text-secondary">
                  <FaCheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />
                  <span className="text-sm md:text-base font-sans">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Statistics Grid */}
        <div className="lg:col-span-5 w-full">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  variant="default"
                  glow
                  className="p-4 sm:p-6 flex flex-col justify-center items-center text-center group min-h-[130px] sm:min-h-[160px]"
                >
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl text-accent group-hover:scale-105 transition-transform duration-300">
                    <StatCounter value={stat.value} />
                  </span>
                  <span className="text-text-secondary font-semibold text-xs sm:text-sm mt-3 tracking-wide uppercase font-heading">
                    {stat.label}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
