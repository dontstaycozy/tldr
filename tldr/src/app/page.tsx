"use client";

import { useState } from 'react';
import { PressRoomTemplate } from '@/components/templates/PressRoomTemplate';
import { FrontPageTemplate, type NewspaperData } from '@/components/templates/FrontPageTemplate';

const placeholderData: NewspaperData = {
  headline: "So basically...",
  leadParagraph: "TL;DR: In a sweeping move that caught analysts off guard, the international coalition announced immediate restructuring of energy trade agreements. The implications ripple across manufacturing and technology sectors, prompting a massive recalibration of Q4 forecasts.",
  image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2000&auto=format&fit=crop",
  keyPoints: [
    { title: "Immediate Volatility", text: "Initial market reactions saw a 4% dip in major indices before stabilizing. Tech stocks with high energy dependencies felt the sharpest immediate impact." },
    { title: "Long-Term Restructuring", text: "The policy mandates a 15% reduction in cross-border tariffs for renewable components, effectively subsidizing the transition for early adopters." },
    { title: "Geopolitical Friction", text: "Holdout nations have signaled intent to challenge the coalition's authority through international tribunals, threatening to delay implementation timelines." }
  ],
  bodyColumns: [
    "The morning began not with the usual hum of trading floors, but with a stark, terse communique issued simultaneously across three continents. The coalition's decision to fundamentally alter the architecture of global energy trade was not entirely unexpected, yet the sheer scope of the immediate implementation caught even the most seasoned analysts unprepared. By 9:00 AM Eastern, the recalibration was already underway, stripping billions from traditional legacy energy firms while injecting unprecedented capital into speculative green tech ventures.",
    "At the heart of the restructuring is a complex mechanism designed to penalize carbon-intensive logistics networks while rewarding localized, sustainable production hubs. \"We are witnessing the rapid forced obsolescence of the 20th-century supply chain,\" noted Dr. Aris Thorne, lead economist at the Institute for Global Synthesis. \"It is a blunt instrument applied to a very delicate global mechanism.\"",
    "The immediate fallout was palpable in manufacturing sectors heavily reliant on traditional energy imports. Automotive manufacturers, already grappling with semiconductor shortages and shifting consumer demands, now face a mandated pivot that effectively rewrites their five-year production plans overnight. Secondary markets are attempting to price in the volatility, leading to wildly disparate valuations across typically stable index funds.",
    "Conversely, the technology sector presented a bifurcated response. Firms deeply invested in algorithmic trading and digital infrastructure saw an initial panic sell-off, based on fears of energy rationing. However, entities holding patents in grid optimization and decentralized energy storage experienced an immediate influx of speculative capital, driving valuations to historic highs before the midday bell.",
    "The broader macroeconomic implications will take weeks to fully materialize. As national governments scramble to interpret the coalition's directives, the threat of reactionary protectionist policies looms large. If the transition is not managed with extreme diplomatic care, the intended environmental benefits may be overshadowed by a localized economic recession triggered by supply chain paralysis."
  ],
  pullQuotes: [
    "We are witnessing the rapid forced obsolescence of the 20th-century supply chain. It is a blunt instrument applied to a very delicate mechanism."
  ]
};

export default function Home() {
  const [appState, setAppState] = useState<'upload' | 'processing' | 'output'>('upload');
  const [newspaperData, setNewspaperData] = useState<NewspaperData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    console.log("File selected:", file.name);
    setAppState('processing');
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate newspaper');
      }

      const data = await response.json();
      setNewspaperData(data);
      setAppState('output');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setNewspaperData(null);
    setError(null);
  };

  if (appState === 'upload' || appState === 'processing') {
    return (
      <div className="relative">
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            {error}
          </div>
        )}
        <PressRoomTemplate 
          onFileSelect={handleFileSelect} 
          isLoading={appState === 'processing'} 
        />
      </div>
    );
  }

  return (
    <FrontPageTemplate 
      data={newspaperData || placeholderData} 
      onReset={handleReset} 
    />
  );
}
