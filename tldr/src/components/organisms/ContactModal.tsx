import { Mail, Phone, Link as LinkIcon, X } from 'lucide-react';
import { Headline } from '../atoms/Headline';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/20 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md bg-parchment border-2 border-obsidian p-8 shadow-[8px_8px_0_rgba(20,20,20,1)] transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
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

        <Headline variant="small" className="text-3xl mb-8 border-b border-obsidian pb-4">
          Contact Me
        </Headline>

        <div className="flex flex-col gap-6 font-sans text-obsidian">
          <div className="flex items-center gap-4 group">
            <div className="p-3 border border-obsidian rounded-full bg-white group-hover:bg-obsidian group-hover:text-parchment transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-obsidian/60 font-semibold tracking-wide uppercase">Phone</p>
              <p className="text-lg">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 border border-obsidian rounded-full bg-white group-hover:bg-obsidian group-hover:text-parchment transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-obsidian/60 font-semibold tracking-wide uppercase">Email</p>
              <a href="mailto:hello@placeholder.com" className="text-lg hover:underline decoration-2 underline-offset-4">hello@placeholder.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 border border-obsidian rounded-full bg-white group-hover:bg-obsidian group-hover:text-parchment transition-colors">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-obsidian/60 font-semibold tracking-wide uppercase">LinkedIn</p>
              <a href="https://linkedin.com/in/placeholder" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline decoration-2 underline-offset-4">linkedin.com/in/placeholder</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
