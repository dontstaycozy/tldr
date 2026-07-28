import React from 'react';
import { Headline } from '../atoms/Headline';
import { BodyText } from '../atoms/BodyText';
import { Label } from '../atoms/Label';
import { KeyPoint } from '../molecules/KeyPoint';

interface LeadStoryProps {
  headline: string;
  leadParagraph: string;
  image?: string;
  keyPoints: { title: string; text: string }[];
}

export function LeadStory({ headline, leadParagraph, image, keyPoints }: LeadStoryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-8 border-b border-obsidian">
      {/* Left Column - 65% */}
      <div className="md:w-[65%] pr-8 md:border-r border-obsidian">
        <Headline variant="large" className="mb-6">{headline}</Headline>
        <BodyText variant="lead" className="mb-8">{leadParagraph}</BodyText>
        
        {image && (
          <div className="mt-8">
            <img src={image} alt="Story visual" className="w-full h-auto aspect-video object-cover grayscale" />
            <p className="font-headline italic text-xs mt-2 text-obsidian/70">
              Generated visual representation of the subject matter.
            </p>
          </div>
        )}
      </div>
      
      {/* Right Column - 35% */}
      <div className="md:w-[35%] pl-4">
        <Label className="block mb-6 border-b border-obsidian pb-2">AT A GLANCE</Label>
        <div>
          {keyPoints.map((kp, idx) => (
            <KeyPoint 
              key={idx} 
              title={kp.title} 
              text={kp.text} 
              isLast={idx === keyPoints.length - 1} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
