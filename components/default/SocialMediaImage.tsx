import { cn } from '@/lib/utils';
import { IconBan } from '@tabler/icons-react';
import { Newspaper } from 'lucide-react';
import { NextPage } from 'next';

interface Props {
  type: string;
  className?: string;
}

const SocialMediaImage: NextPage<Props> = ({ type, className = 'rounded' }) => {
  type = type.toLowerCase()
  if (type === '-') return <IconBan className={cn('h-4 w-4', className)} />;
  let url = '';
  if (type === 'twitter') url = '/assets/icons/social/twitter.png';
  if (type === 'instagram') url = '/assets/icons/social/instagram.png';
  if (type === 'tiktok' || type === 'tiktok_comment') url = '/assets/icons/social/tiktok.png';
  if (type === 'facebook') url = '/assets/icons/social/facebook.png';
  if (type === 'threads') url = '/assets/icons/social/threads.png';
  if (['search-engine', 'search_engine'].includes(type)) return <Newspaper className={cn('h-4 w-4', className)} />;
  if (!url) return <></>;
  return <img src={url} className={cn('h-4 w-4', className)} />;
};

export default SocialMediaImage;
