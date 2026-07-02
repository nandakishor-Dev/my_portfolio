import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'flat';
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-300 border',
          // Variants
          variant === 'default' && 'bg-bg-secondary border-border-primary shadow-sm',
          variant === 'glass' && 'glassmorphism shadow-sm',
          variant === 'flat' && 'bg-bg-tertiary border-transparent',
          // Hover effect
          hoverEffect && 'hover:-translate-y-1.5 hover:shadow-md hover:border-accent-border',
          className
        )}
        {...props}
      >
        {glow && (
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl pointer-events-none" />
        )}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
