import React from 'react';

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <span {...props} className={`font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-obsidian ${className}`}>
      {children}
    </span>
  );
}
