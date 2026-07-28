import React from 'react';
import { Headline } from '../atoms/Headline';
import { BodyText } from '../atoms/BodyText';
import { Divider } from '../atoms/Divider';

interface KeyPointProps {
  title: string;
  text: string;
  isLast?: boolean;
}

export function KeyPoint({ title, text, isLast = false }: KeyPointProps) {
  return (
    <div className="py-6">
      <Headline variant="small" className="mb-2">{title}</Headline>
      <BodyText className="text-sm">{text}</BodyText>
      {!isLast && <Divider className="mt-6" />}
    </div>
  );
}
