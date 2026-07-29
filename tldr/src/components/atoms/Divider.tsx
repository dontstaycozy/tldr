import React from 'react';

interface DividerProps {
  thickness?: 'thin' | 'thick';
  className?: string;
}

export function Divider({ thickness = 'thin', className = '' }: DividerProps) {
  return (
    <hr className={`border-obsidian ${thickness === 'thick' ? 'border-b-2' : 'border-b'} ${className}`} />
  );
}
