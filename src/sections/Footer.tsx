import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { profile } = portfolioData;
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-border-primary/80 bg-bg-secondary w-full py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Name and Title */}
        <div className="text-center md:text-left space-y-1">
          <h3 className="font-heading font-bold text-base text-text-primary">
            {profile.name}
          </h3>
          <p className="text-text-secondary text-xs font-sans">
            {profile.title} • {profile.tagline.static}
          </p>
        </div>

        {/* Center: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all text-xs font-semibold cursor-pointer"
        >
          <FaArrowUp className="w-2.5 h-2.5" />
          Back to Top
        </button>

        {/* Right Side: Social Icons & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Send Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
          <span className="text-[11px] text-text-secondary/70 font-sans">
            © {currentYear} {profile.name}. All rights reserved.
          </span>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 focus:outline-none transition-all cursor-pointer"
            aria-label="Scroll to top of page"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
