import React from 'react';
import { BodyText } from '../atoms/BodyText';
import { Label } from '../atoms/Label';

interface NewspaperBodyProps {
  columns: string[];
  pullQuotes: string[];
}

export function NewspaperBody({ columns, pullQuotes }: NewspaperBodyProps) {
  return (
    <div className="py-8">
      <Label className="block mb-8 border-b border-obsidian pb-2">FULL ANALYSIS</Label>
      
      <div className="newspaper-columns">
        {columns.map((col, idx) => (
          <React.Fragment key={idx}>
            <BodyText className="mb-6 break-inside-avoid text-justify">
              {idx === 0 && (
                <span className="float-left text-5xl font-headline font-black pr-2 mt-1 leading-none">
                  {col.charAt(0)}
                </span>
              )}
              {idx === 0 ? col.substring(1) : col}
            </BodyText>
            
            {/* Insert a pull quote after every 2 paragraphs, if available */}
            {idx % 2 === 1 && pullQuotes[Math.floor(idx / 2)] && (
              <div className="break-inside-avoid my-8">
                <BodyText variant="pullquote">
                  "{pullQuotes[Math.floor(idx / 2)]}"
                </BodyText>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
