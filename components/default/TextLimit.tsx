import { cn } from '@/lib/utils';
import { NextPage } from 'next';
import { useState } from 'react';

interface Props {
  text: string;
  maxLength?: number; // optional prop to control cutoff length
  className?: string
}

const TextLimit: NextPage<Props> = ({ text, maxLength = 250, className }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  // Limit text length if not expanded
  const displayedText = isReadMore ? text : text.slice(0, maxLength);

  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <div className={cn("inline leading-tight", className)}>
      <span>{displayedText}</span>
      {text.length > maxLength && (
        <button
          onClick={toggleReadMore}
          className="ml-1 cursor-pointer font-semibold text-blue-50 hover:underline focus:outline-none"
        >
          {isReadMore ? 'Read less' : '...Read more'}
        </button>
      )}
    </div>
  );
};

export default TextLimit;
