"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Headline } from '../atoms/Headline';
import { Button } from '../atoms/Button';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

export function Dropzone({ onFileSelect }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`border border-obsidian p-12 flex flex-col items-center justify-center bg-white min-h-[400px] w-full max-w-4xl mx-auto transition-colors ${
        isDragging ? 'bg-parchment/50 border-2' : ''
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="w-8 h-8 text-obsidian mb-8" />
      <Headline variant="medium" className="mb-6">Submit your document or article.</Headline>
      
      <div className="relative">
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept=".pdf,.docx,.txt"
        />
        <Button variant="primary" className="pointer-events-none">Browse Files</Button>
      </div>
      
      <p className="mt-8 font-sans text-sm text-obsidian/60">
        Drag and drop documents here
      </p>
    </div>
  );
}
