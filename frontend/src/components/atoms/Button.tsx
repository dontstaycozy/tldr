import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-sans font-bold uppercase tracking-wider text-sm px-6 py-3 transition-colors';
  
  const variants = {
    primary: 'bg-obsidian text-parchment hover:bg-black',
    secondary: 'bg-transparent border border-obsidian text-obsidian hover:bg-obsidian hover:text-parchment',
    icon: 'bg-obsidian text-parchment p-3 rounded-full hover:bg-black flex items-center justify-center shadow-lg',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
