import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className = '' }: LabelProps) {
  return (
    <span className={`font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-obsidian ${className}`}>
      {children}
    </span>
  );
}
