import React from 'react';

interface HeadlineProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'massive' | 'large' | 'medium' | 'small';
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Headline({
  children,
  as: Component = 'h2',
  variant = 'medium',
  className = '',
  align = 'left',
}: HeadlineProps) {
  const baseStyles = 'font-headline font-black text-obsidian tracking-tight';
  
  const variants = {
    massive: 'text-6xl md:text-8xl lg:text-9xl', // For the main masthead
    large: 'text-4xl md:text-5xl lg:text-6xl', // Left column hook
    medium: 'text-2xl md:text-3xl', // At a glance header
    small: 'text-xl font-bold', // Key points
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <Component className={`${baseStyles} ${variants[variant]} ${alignments[align]} ${className}`}>
      {children}
    </Component>
  );
}
