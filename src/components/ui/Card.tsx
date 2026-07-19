import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'flat';
  hoverEffect?: boolean;
  glow?: boolean;
  spotlight?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = true, glow = false, spotlight = true, children, onMouseMove, ...props }, ref) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      if (onMouseMove) onMouseMove(e);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-300 border group',
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
        {/* Spotlight radial glow */}
        {spotlight && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--card-spotlight, rgba(79, 70, 229, 0.05)), transparent 80%)`
            }}
          />
        )}

        {glow && (
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl pointer-events-none z-0" />
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
