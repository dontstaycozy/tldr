
import { Dropzone } from '../molecules/Dropzone';
import { TopNav } from '../organisms/TopNav';
import { Headline } from '../atoms/Headline';
import { Label } from '../atoms/Label';

interface PressRoomTemplateProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function PressRoomTemplate({ onFileSelect, isLoading }: PressRoomTemplateProps) {
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
        <Headline variant="small" className="text-2xl">tldr</Headline>
        <div className="flex gap-6">
          <Label className="cursor-pointer hover:underline">Terms and Conditions</Label>
          <Label className="cursor-pointer hover:underline">Privacy</Label>
          <Label className="cursor-pointer hover:underline">Contact</Label>
        </div>
      </footer>
    </div>
  );
}
