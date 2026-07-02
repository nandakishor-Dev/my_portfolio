import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-gradient-to-r from-accent to-indigo-600 dark:from-accent dark:to-indigo-500 hover:opacity-95 text-white shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/25 border border-transparent',
      secondary: 'glassmorphism border border-border-primary text-text-primary hover:bg-bg-tertiary shadow-sm',
      minimal: 'text-text-secondary hover:text-text-primary bg-transparent hover:bg-bg-tertiary border border-transparent',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs md:text-sm rounded-lg',
      md: 'px-6 py-3 text-sm md:text-base rounded-xl',
      lg: 'px-8 py-4 text-base md:text-lg rounded-2xl',
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? undefined : { y: -2 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
