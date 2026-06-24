import { dateFormat } from '@/lib/utils';
import { NextPage } from 'next';
import SocialMediaImage from './SocialMediaImage';
import { useState } from 'react';

interface Props {
  url?: string | null;
  name?: string | null | undefined;
  username: string;
}

const RenderSocialAuthorImage: NextPage<Props> = ({ name = '', url, username }) => {
  const [isFallback, setIsFallback] = useState(false);
  // ✅ Enhanced detection
  const isInstagramUrl =
    url?.includes('instagram.') || url?.includes('fbcdn.net');
  const isTikTokUrl =
    url &&
    (url.includes('tiktok') ||
      url.includes('tiktokcdn.com') ||
      url.includes('tplv-') ||
      url.includes('muscdn.com') ||
      url.includes('musical.ly') ||
      url.startsWith('tiktok/') || // ✅ For your specific format
      url.includes('_tplv-') ||
      url.includes('origin.image'));

  // ✅ Check if URL is empty or null
  const isEmptyUrl = !url || url === '' || url === null;

  // ✅ Use generated avatar for Instagram, TikTok, and empty URLs
  const shouldUseGeneratedAvatar = isInstagramUrl || isTikTokUrl || isEmptyUrl;

  // ✅ Generate avatar from initials
  const generateAvatar = (name: string) => {
    if (!name || name.trim() === '') {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400">
          <svg
            className="h-4 w-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }

    // ✅ Extract initials (max 2 characters)
    const initials = name
      .trim()
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();

    // ✅ Generate consistent color based on name and platform
    const colors = [
      'bg-blue-500', // Blue
      'bg-green-500', // Green
      'bg-purple-500', // Purple
      'bg-pink-500', // Pink
      'bg-indigo-500', // Indigo
      'bg-red-500', // Red
      'bg-orange-500', // Orange
      'bg-teal-500', // Teal
      'bg-cyan-500', // Cyan
      'bg-amber-500', // Amber
    ];

    // ✅ Different color calculation for different cases
    let colorIndex;
    if (isInstagramUrl) {
      colorIndex = (name.charCodeAt(0) + name.length) % colors.length;
    } else if (isTikTokUrl) {
      // ✅ Different algorithm for TikTok to avoid color collision
      colorIndex = (name.charCodeAt(0) * 2 + name.length + 3) % colors.length;
    } else if (isEmptyUrl) {
      // ✅ Different algorithm for empty URLs
      colorIndex = (name.charCodeAt(0) + name.length * 3 + 5) % colors.length;
    } else {
      colorIndex = 0; // Default
    }

    const bgColor = colors[colorIndex];

    return (
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white ${bgColor}`}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="flex gap-2">
      <div className="flex-none">
        {shouldUseGeneratedAvatar || isFallback ? (
          generateAvatar(name || '')
        ) : (
          <img
            className="h-8 w-8 flex-none rounded-full object-cover"
            src={url}
            alt={name || 'User avatar'}
            onError={e => setIsFallback(true)}
          />
        )}
      </div>
    </div>
  );
};

export default RenderSocialAuthorImage;
