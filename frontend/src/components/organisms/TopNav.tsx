import { useState, useEffect } from 'react';
import { Label } from '../atoms/Label';
import { Divider } from '../atoms/Divider';

export function TopNav() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second to be safe
    return () => clearInterval(timer);
  }, []);

  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  const timeString = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toUpperCase();

  return (
    <header className="w-full pt-8 pb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Label>{dateString}</Label>
          <Label>|</Label>
          <Label>{timeString}</Label>
        </div>
      </div>
      <Divider thickness="thick" />
    </header>
  );
}
