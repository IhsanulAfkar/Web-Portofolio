import { cn } from '@/lib/utils';
import { NextPage } from 'next';

const sentimentIndo: Record<string, string> = {
  positive: 'Positif',
  negative: 'Negatif',
  neutral: 'Netral',
};
const emotionIndo: Record<string, string> = {
  Anger: 'Marah',
  Anticipation: 'Antisipasi',
  Disgust: 'Jijik',
  Fear: 'Takut',
  Joy: 'Senang',
  Sadness: 'Sedih',
  Surprise: 'Terkejut',
  Trust: 'Percaya',
  Neutral: 'Netral',
};
export const emotionToIndo = (val: string) => {
  const emotionIndos = Object.entries(emotionIndo).map(([key, value]) => ({
    key: key.toLowerCase(),
    value
  }))
  return emotionIndos.find(e => e.key === val.toLowerCase())?.value ?? val
}
export const RenderSentiment: NextPage<{
  sentiment?: string;
  className?: string
}> = ({ sentiment, className: addClassName }) => {
  if (!sentiment) return <></>;
  const lwrSentiment = sentiment.toLowerCase()
  const className = cn(
    'px-2 py-0.5 rounded-full font-medium text-xs',
    lwrSentiment === 'negative' && 'bg-red-10 text-red-50',
    lwrSentiment === 'neutral' && 'bg-yellow-10 text-yellow-50',
    lwrSentiment === 'positive' && 'bg-green-10 text-green-50',
    addClassName
  );

  return (
    <div className="flex">
      <div className={className}>{sentimentIndo[lwrSentiment]}</div>
    </div>
  );
};
export const RenderEmotion: NextPage<{
  emotion?: string;
}> = ({ emotion }) => {
  if (!emotion) return <></>;
  const className = cn(
    'px-2 py-1 rounded-full font-medium text-xs',
    emotion === 'Anger' && 'bg-red-10 text-red-50',
    emotion === 'Anticipation' && 'bg-orange-200 text-orange-600',
    emotion === 'Disgust' && 'bg-green-10 text-green-50',
    emotion === 'Joy' && 'bg-yellow-10 text-yellow-50',
    emotion === 'Sadness' && 'bg-blue-30 text-blue-70',
    emotion === 'Fear' && 'bg-purple-30 text-purple-70',
    emotion === 'Trust' && 'bg-cyan-200 text-cyan-600',
    emotion === 'Surprise' && 'bg-pink-200 text-pink-600',
    emotion === 'Neutral' && 'bg-gray-200 text-gray-600',
  );

  return (
    <div className="flex">
      <div className={className}>{emotionIndo[emotion]}</div>
    </div>
  );
};
