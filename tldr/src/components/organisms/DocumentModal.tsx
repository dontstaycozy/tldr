import { X } from 'lucide-react';
import { Headline } from '../atoms/Headline';
import { ReactNode } from 'react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function DocumentModal({ isOpen, onClose, title, children }: DocumentModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/20 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-parchment border-2 border-obsidian p-8 shadow-[8px_8px_0_rgba(20,20,20,1)] transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-obsidian/10 transition-colors rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-obsidian" />
        </button>

        <Headline variant="small" className="text-3xl mb-8 border-b border-obsidian pb-4 pr-8">
          {title}
        </Headline>

        <div className="font-sans text-obsidian space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
