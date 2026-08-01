import { cn } from '@/lib/utils';
import { NextPage } from 'next';
import { useState } from 'react';

interface Props {
  text: string;
  maxLength?: number; // optional prop to control cutoff length
  className?: string,
  onClick?: () => void,
  showReadMore?: boolean
}

const LimitText: NextPage<Props> = ({ text, maxLength = 250, className, onClick, showReadMore = true }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  // Limit text length if not expanded
  const displayedText = isReadMore ? text : text.slice(0, maxLength);

  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <span className={cn("leading-tight", className)}>
      {displayedText}
      {text.length > maxLength && showReadMore && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent parent click
            toggleReadMore();
          }}
          className="ml-1 inline font-semibold text-blue-10 hover:underline"
        >
          {isReadMore ? "Read less" : "...Read more"}
        </button>
      )}
    </span>
  );
};

export default LimitText;
