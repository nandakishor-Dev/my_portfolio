import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './components/ui/Toast';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Sync routing on popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Preloading animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 1.8 seconds loading screen
    return () => clearTimeout(timer);
  }, []);

  const navigateToHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setPath('/');
    }
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white"
              >
                <div className="relative flex flex-col items-center gap-4">
                  {/* Glowing spinner */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-11 h-11 rounded-full border-[3px] border-indigo-500/25 border-t-indigo-400"
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="font-heading font-extrabold text-xl tracking-wider uppercase text-indigo-400"
                  >
                    Nanda Kishor P G
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.6 }}
                    className="text-[10px] font-mono tracking-widest uppercase text-slate-400"
                  >
                    Frontend Developer
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
              >
                {path === '/' || path === '' || path === '/index.html' ? (
                  <Home />
                ) : (
                  <NotFound onGoHome={navigateToHome} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
