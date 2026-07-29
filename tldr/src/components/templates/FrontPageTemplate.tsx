"use client";
import { useRef, useState } from 'react';
import { TopNav } from '../organisms/TopNav';
import { LeadStory } from '../organisms/LeadStory';
import { NewspaperBody } from '../organisms/NewspaperBody';
import { FloatingControls } from '../organisms/FloatingControls';
import { ContactModal } from '../organisms/ContactModal';
import { DocumentModal } from '../organisms/DocumentModal';

import { Headline } from '../atoms/Headline';
import { Label } from '../atoms/Label';
import generatePDF from 'react-to-pdf';

export interface NewspaperData {
  headline: string;

  leadParagraph: string;
  image?: string;
  keyPoints: { title: string; text: string }[];
  bodyColumns: string[];
  pullQuotes: string[];
}

interface FrontPageTemplateProps {
  data: NewspaperData;
  onReset: () => void;
}

export function FrontPageTemplate({ data, onReset }: FrontPageTemplateProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleDownloadPDF = () => {
    generatePDF(targetRef, {
      filename: 'tldr-front-page.pdf',
      page: { margin: 0, format: 'letter' },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-parchment py-8 px-4 sm:px-8 md:px-16 print:bg-white" ref={targetRef}>
        <div className="max-w-screen-xl mx-auto">
          {/* Section A: The Masthead */}
          <TopNav />
          <div className="pt-12 pb-8 border-b border-obsidian mb-8">
            <Headline variant="massive" align="center">
              {data.headline}
            </Headline>
          </div>

          {/* Section B: The Lead Story */}
          <LeadStory
            headline={data.headline}
            leadParagraph={data.leadParagraph}
            image={data.image}
            keyPoints={data.keyPoints}
          />

          {/* Section C: The Body */}
          <NewspaperBody
            columns={data.bodyColumns}
            pullQuotes={data.pullQuotes}
          />

          {/* Footer */}
          <footer data-html2canvas-ignore="true" className="w-full border-t border-obsidian mt-24 py-8 flex justify-between items-center print:hidden">
            <Headline variant="small" className="text-5xl tracking-tighter">tldr <span className="text-sm font-sans text-obsidian opacity-50 tracking-normal ml-2">by cozysharkmurks</span></Headline>
            <div className="flex gap-6">
              <Label className="cursor-pointer hover:underline" onClick={() => setIsTermsOpen(true)}>Terms and Conditions</Label>
              <Label className="cursor-pointer hover:underline" onClick={() => setIsPrivacyOpen(true)}>Privacy</Label>
              <Label className="cursor-pointer hover:underline" onClick={() => setIsContactOpen(true)}>Contact</Label>
            </div>
          </footer>
        </div>
      </div>

      <FloatingControls onReset={onReset} onDownload={handleDownloadPDF} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <DocumentModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <p>This is a placeholder for the Privacy Policy.</p>
        <p>Your data is handled with care. More details to come.</p>
      </DocumentModal>
      <DocumentModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms and Conditions">
        <p>This is a placeholder for the Terms and Conditions.</p>
        <p>By using this service, you agree to our standard terms. More details to come.</p>
      </DocumentModal>
    </>
  );
}
