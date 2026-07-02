import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

interface NotFoundProps {
  onGoHome?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary px-6 overflow-hidden">
      {/* Vercel-style Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-primary)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      {/* Ambient glow blobs */}
      <div className="absolute top-[25%] left-[25%] w-[30%] h-[30%] rounded-full bg-accent/8 dark:bg-accent/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[25%] w-[30%] h-[30%] rounded-full bg-indigo-500/8 dark:bg-indigo-500/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-8xl md:text-9xl font-extrabold font-heading text-gradient tracking-tighter">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold font-heading text-text-primary">
            Page Not Found
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-sm md:text-base leading-relaxed font-sans font-light"
        >
          The page you are looking for doesn't exist or has been moved to another URL.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Button
            variant="primary"
            size="md"
            onClick={handleHomeClick}
            className="cursor-pointer font-semibold shadow-md"
          >
            Go Back Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
