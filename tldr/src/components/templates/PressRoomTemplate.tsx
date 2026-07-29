import { useState } from 'react';
import { Dropzone } from '../molecules/Dropzone';
import { TopNav } from '../organisms/TopNav';
import { Headline } from '../atoms/Headline';
import { Label } from '../atoms/Label';
import { ContactModal } from '../organisms/ContactModal';
import { DocumentModal } from '../organisms/DocumentModal';

interface PressRoomTemplateProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function PressRoomTemplate({ onFileSelect, isLoading }: PressRoomTemplateProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full px-8 mb-16">
        <TopNav />
      </div>

      <div className="flex-grow w-full max-w-6xl px-8 flex flex-col justify-center items-center">
        <Headline variant="massive" className="mb-12">tldr</Headline>

        {isLoading ? (
          <div className="border border-obsidian p-24 bg-white/50 text-center flex flex-col items-center justify-center min-w-[500px]">
            <div className="w-8 h-8 border-4 border-obsidian border-t-transparent rounded-full animate-spin mb-6"></div>
            <Headline variant="medium" className="animate-pulse">The presses are running...</Headline>
            <p className="font-sans text-obsidian/60 mt-4">Generating your front page</p>
          </div>
        ) : (
          <>
            <Dropzone onFileSelect={onFileSelect} />
            <div className="mt-8">
              <Label className="text-obsidian/60">
                Accepting PDF, DOCX, and TXT formats. Maximum file size 25MB.
              </Label>
            </div>
          </>
        )}
      </div>

      <footer className="w-full border-t border-obsidian mt-16 px-8 py-6 flex justify-between items-center">
        <Headline variant="small" className="text-5xl tracking-tighter">tldr <span className="text-sm font-sans text-obsidian/50 tracking-normal ml-2">by cozysharkmurks</span></Headline>
        <div className="flex gap-6">
          <Label className="cursor-pointer hover:underline" onClick={() => setIsTermsOpen(true)}>Terms and Conditions</Label>
          <Label className="cursor-pointer hover:underline" onClick={() => setIsPrivacyOpen(true)}>Privacy</Label>
          <Label className="cursor-pointer hover:underline" onClick={() => setIsContactOpen(true)}>Contact</Label>
        </div>
      </footer>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <DocumentModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <p>This is a placeholder for the Privacy Policy.</p>
        <p>Your data is handled with care. More details to come.</p>
      </DocumentModal>
      <DocumentModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms and Conditions">
        <p>This is a placeholder for the Terms and Conditions.</p>
        <p>By using this service, you agree to our standard terms. More details to come.</p>
      </DocumentModal>
    </div>
  );
}
