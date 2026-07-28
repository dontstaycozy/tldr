import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { Button } from '../atoms/Button';

interface FloatingControlsProps {
  onReset: () => void;
  onDownload: () => void;
}

export function FloatingControls({ onReset, onDownload }: FloatingControlsProps) {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 print:hidden">
      <Button 
        variant="icon" 
        onClick={onReset}
        title="Upload New Document"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
      <Button 
        variant="icon" 
        onClick={onDownload}
        title="Export to PDF"
      >
        <Download className="w-5 h-5" />
      </Button>
    </div>
  );
}
