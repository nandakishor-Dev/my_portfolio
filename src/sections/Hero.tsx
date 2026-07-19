import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaDownload, FaArrowRight, FaCode } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';
import { portfolioData } from '../data/portfolioData';
import { Button } from '../components/ui/Button';
const heroImg = `${import.meta.env.BASE_URL}npg.png`;

export const Hero: React.FC = () => {
  const { profile } = portfolioData;
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  // Typing logic
  useEffect(() => {
    const currentWord = profile.tagline.dynamic[wordIndex];
    
    if (subIndex === currentWord.length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2500); // hold for 2.5s
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % profile.tagline.dynamic.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 35 : 70);

    return () => clearTimeout(timer);
  }, [subIndex, isDeleting, wordIndex, profile.tagline.dynamic]);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden max-w-7xl mx-auto px-6 md:px-12"
    >
      {/* Premium Animated Mesh Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-accent/8 dark:bg-accent/4 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/8 dark:bg-indigo-500/4 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          {/* Tag / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-muted border border-accent-border text-accent text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Available for Interviews
          </motion.div>

          {/* Heading */}
          <div className="space-y-2.5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] font-heading"
            >
              Hi, I'm <span className="text-gradient font-extrabold">{profile.name}</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-text-secondary h-[40px] flex items-center"
            >
              <span>
                I'm a{' '}
                <span className="text-accent">
                  {profile.tagline.dynamic[wordIndex].substring(0, subIndex)}
                </span>
                <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-accent ml-0.5 font-light`}>|</span>
              </span>
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed font-sans"
          >
            {profile.shortDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleScroll('#projects')}
              className="group gap-2.5 shadow-md cursor-pointer"
            >
              View Projects
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleScroll('#contact')}
              className="cursor-pointer"
            >
              Contact Me
            </Button>

            <a
              href={`${import.meta.env.BASE_URL}${profile.socials.resume.replace(/^\//, '')}`}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-primary hover:bg-bg-tertiary rounded-xl font-medium text-text-secondary hover:text-text-primary transition-all text-sm md:text-base cursor-pointer"
            >
              <FaDownload className="w-3.5 h-3.5" />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Hero Right Graphic */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px]"
          >
            {/* Ambient Background Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-slow -z-10" />

            {/* Premium Glassmorphic Photo Frame */}
            <div className="absolute inset-4 rounded-3xl overflow-hidden glassmorphism shadow-2xl flex items-center justify-center border border-border-primary/50 group">
              {heroImg ? (
                <img
                  src={heroImg}
                  alt={profile.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 pointer-events-none"
                  width="360"
                  height="360"
                />
              ) : (
                <div className="text-6xl font-heading font-extrabold text-accent/20 select-none">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>

            {/* Floating Technical Icons */}
            {/* React Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-1 right-[12%] p-3.5 rounded-2xl glassmorphism shadow-md text-sky-400 border border-sky-400/20 flex items-center justify-center cursor-pointer"
              title="React.js"
            >
              <FaReact className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
            </motion.div>

            {/* TypeScript Badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-6 -left-3 p-3.5 rounded-2xl glassmorphism shadow-md text-blue-500 border border-blue-500/20 flex items-center justify-center cursor-pointer"
              title="TypeScript"
            >
              <SiTypescript className="w-5 h-5" />
            </motion.div>

            {/* Tailwind Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-12 -right-2 p-3.5 rounded-2xl glassmorphism shadow-md text-teal-400 border border-teal-400/20 flex items-center justify-center cursor-pointer"
              title="Tailwind CSS"
            >
              <SiTailwindcss className="w-5.5 h-5.5" />
            </motion.div>

            {/* Engineering Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.5 }}
              className="absolute top-[28%] -left-6 p-3.5 rounded-2xl glassmorphism shadow-md text-purple-400 border border-purple-400/20 flex items-center justify-center cursor-pointer"
              title="Frontend Engineering"
            >
              <FaCode className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
