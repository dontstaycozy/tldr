import React from 'react';

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'regular' | 'lead' | 'pullquote';
}

export function BodyText({ children, className = '', variant = 'regular' }: BodyTextProps) {
  const baseStyles = 'font-body text-obsidian';
  
  const variants = {
    regular: 'text-base leading-relaxed',
    lead: 'text-lg md:text-xl font-bold leading-snug',
    pullquote: 'font-headline italic text-2xl md:text-4xl text-center my-8 py-6 border-y border-obsidian',
  };

  return (
    <p className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </p>
  );
}
