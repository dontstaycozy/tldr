"use client";
import { useRef } from 'react';
import { TopNav } from '../organisms/TopNav';
import { LeadStory } from '../organisms/LeadStory';
import { NewspaperBody } from '../organisms/NewspaperBody';
import { FloatingControls } from '../organisms/FloatingControls';

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

  const handleDownloadPDF = () => {
    generatePDF(targetRef, {
      filename: 'tldr-front-page.pdf',
      page: { margin: 10 }
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
          <footer className="w-full border-t border-obsidian mt-24 py-8 flex justify-between items-center print:hidden">
            <Headline variant="small" className="text-5xl tracking-tighter">tldr <span className="text-sm font-sans text-obsidian/50 tracking-normal ml-2">by cozysharkmurks</span></Headline>
            <div className="flex gap-6">
              <Label className="cursor-pointer hover:underline">Terms and Conditions</Label>
              <Label className="cursor-pointer hover:underline">Privacy</Label>
              <Label className="cursor-pointer hover:underline">Contact</Label>
            </div>
          </footer>
        </div>
      </div>

      <FloatingControls onReset={onReset} onDownload={handleDownloadPDF} />
    </>
  );
}
