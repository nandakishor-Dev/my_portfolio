import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaAngleRight } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useToast } from './Toast';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'header';
}

const COMMANDS_HELP = {
  help: 'Display all available terminal commands.',
  about: 'Print a brief professional biography of Nanda.',
  skills: 'List core software frameworks and technologies.',
  contact: 'Show phone, email, and social profile links.',
  resume: 'Trigger browser download of the PDF resume.',
  clear: 'Clear the terminal output screen.',
  secret: 'Reveal a hidden developer easter egg!'
};

export const TerminalWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'NANDA KISHOR PORTFOLIO TERMINAL [v1.0.2]', type: 'header' },
    { text: 'Type "help" to view a list of available command utilities.', type: 'output' },
    { text: '---------------------------------------------------', type: 'output' },
  ]);

  const { showToast } = useToast();
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on logs update
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Focus input when clicking console body
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    // Add user's command input to history
    const nextLines: TerminalLine[] = [...history, { text: `guest@npg-portfolio:~$ ${inputVal}`, type: 'input' }];

    switch (cleanCmd) {
      case 'help':
        nextLines.push({ text: 'Available Commands:', type: 'success' });
        Object.entries(COMMANDS_HELP).forEach(([cmd, desc]) => {
          nextLines.push({ text: `  ${cmd.padEnd(10)} - ${desc}`, type: 'output' });
        });
        break;

      case 'about':
        nextLines.push({ text: portfolioData.profile.aboutSummary, type: 'output' });
        nextLines.push({ text: portfolioData.profile.aboutHonestMobile, type: 'output' });
        break;

      case 'skills':
        nextLines.push({ text: 'Core Tech Stack:', type: 'success' });
        portfolioData.skills.forEach((cat) => {
          nextLines.push({ text: `  [${cat.title}]: ${cat.skills.join(', ')}`, type: 'output' });
        });
        break;

      case 'contact':
        nextLines.push({ text: 'Contact Information:', type: 'success' });
        nextLines.push({ text: `  Email:  ${portfolioData.profile.socials.email}`, type: 'output' });
        nextLines.push({ text: `  Phone:  ${portfolioData.profile.socials.phone || 'Not Listed'}`, type: 'output' });
        nextLines.push({ text: `  GitHub: ${portfolioData.profile.socials.github}`, type: 'output' });
        nextLines.push({ text: `  LinkedIn: ${portfolioData.profile.socials.linkedin}`, type: 'output' });
        break;

      case 'resume': {
        nextLines.push({ text: 'Initiating PDF resume download pipeline...', type: 'success' });
        const resumeUrl = `${import.meta.env.BASE_URL}${portfolioData.profile.socials.resume.replace(/^\//, '')}`;
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Nandakishor_P_G_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Resume downloaded successfully!', 'success');
        break;
      }

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'secret':
        nextLines.push({ text: '🔓 [EASTER EGG]: "Antigravity is the key to floating layouts!" Code is poetry. Let\'s build the future together.', type: 'success' });
        break;

      default:
        nextLines.push({ text: `command not found: "${cleanCmd}". Type "help" for a list of valid commands.`, type: 'error' });
    }

    setHistory(nextLines);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent hover:bg-accent-hover text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-white/10 hover:scale-105 transition-all outline-none"
        title="Open Developer Console"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaTimes className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaTerminal className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Terminal Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={focusInput}
            className="fixed bottom-24 right-6 w-96 h-80 z-40 rounded-2xl border border-border-primary/80 bg-[#030712]/95 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col font-mono text-xs text-emerald-400 text-left outline-none"
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-bg-tertiary/20 border-b border-border-primary/60 text-[10px] text-text-secondary select-none">
              <span className="flex items-center gap-2 font-semibold">
                <FaTerminal className="text-accent" />
                developer_console.sh
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Scrollable logs screen */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2.5 scrollbar-thin select-text">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input'
                      ? 'text-slate-300'
                      : line.type === 'error'
                      ? 'text-rose-400'
                      : line.type === 'success'
                      ? 'text-amber-400'
                      : line.type === 'header'
                      ? 'text-indigo-400 font-bold'
                      : 'text-emerald-400/90 font-light'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={consoleBottomRef} />
            </div>

            {/* CLI Command Input bar */}
            <form
              onSubmit={handleCommandSubmit}
              className="flex items-center border-t border-border-primary/60 bg-bg-primary/10 px-4 py-3 shrink-0"
            >
              <FaAngleRight className="text-accent w-4 h-4 mr-1.5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-slate-100 text-xs font-mono font-medium caret-accent"
                placeholder="Type command..."
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalWidget;
