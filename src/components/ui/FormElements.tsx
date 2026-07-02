import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, id, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-border/50 transition-all duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {error && <span className="block text-xs text-red-500 mt-1.5 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-border-primary bg-bg-secondary text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-border/50 transition-all duration-200 resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {error && <span className="block text-xs text-red-500 mt-1.5 ml-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
