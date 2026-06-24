import { cn, formatNumber } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { NextPage } from 'next';

interface Props {
  comment?: number | null;
  retweet?: number | null;
  like?: number | null;
  view?: number | null;
  engagement?: number | null;
  source?: string;
  className?: string
}

const RenderStatistic: NextPage<Props> = ({ comment, like, retweet, view, engagement, source, className }) => {
  return (
    <div className={cn("mt-2 text-white flex items-center gap-3", className)}>
      {comment != null && (
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.875977 4.99976C0.875977 2.78976 2.66798 0.999756 4.87848 0.999756H7.06148C9.30648 0.999756 11.126 2.81976 11.126 5.06476C11.126 6.54476 10.3225 7.90476 9.02798 8.61976L5.00098 10.8498V9.00476H4.96748C2.72248 9.05476 0.875977 7.24976 0.875977 4.99976ZM4.87848 1.99976C3.21998 1.99976 1.87598 3.34476 1.87598 4.99976C1.87598 6.68476 3.26098 8.03976 4.94498 8.00476L5.12048 7.99976H6.00098V9.14976L8.54448 7.74476C9.51998 7.20476 10.126 6.17976 10.126 5.06476C10.126 3.36976 8.75398 1.99976 7.06148 1.99976H4.87848Z" fill="currentColor" />
          </svg>

          <p className="text-xs">{formatNumber(comment)}</p>
        </div>
      )}
      {like != null && (
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.34841 2.75032C7.73741 2.72032 7.00891 3.00532 6.40341 3.83032L6.00091 4.37532L5.59791 3.83032C4.99191 3.00532 4.26291 2.72032 3.65191 2.75032C3.03041 2.78532 2.47741 3.14032 2.19691 3.70532C1.92091 4.26532 1.88041 5.09532 2.43641 6.11532C2.97341 7.10032 4.06491 8.25032 6.00091 9.42032C7.93591 8.25032 9.02691 7.10032 9.56391 6.11532C10.1194 5.09532 10.0789 4.26532 9.80241 3.70532C9.52191 3.14032 8.96941 2.78532 8.34841 2.75032ZM10.4419 6.59532C9.76641 7.83532 8.44141 9.15532 6.25241 10.4303L6.00091 10.5803L5.74891 10.4303C3.55941 9.15532 2.23441 7.83532 1.55791 6.59532C0.87791 5.34532 0.85291 4.16532 1.30091 3.26032C1.74441 2.36532 2.62441 1.80532 3.60141 1.75532C4.42691 1.71032 5.28541 2.03532 6.00041 2.76032C6.71491 2.03532 7.57341 1.71032 8.39841 1.75532C9.37541 1.80532 10.2554 2.36532 10.6989 3.26032C11.1469 4.16532 11.1219 5.34532 10.4419 6.59532Z" fill="currentColor" />
          </svg>

          <p className="text-xs">{formatNumber(like)}</p>
        </div>
      )}
      {retweet != null && (
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6539_8597)">
              <path d="M2.24969 1.94019L4.46569 4.01019L3.78369 4.74019L2.74969 3.77519V8.00019C2.74969 8.55019 3.19769 9.00019 3.74969 9.00019H6.49969V10.0002H3.74969C2.64519 10.0002 1.74969 9.10519 1.74969 8.00019V3.77519L0.715692 4.74019L0.0336914 4.01019L2.24969 1.94019ZM8.24969 3.00019H5.49969V2.00019H8.24969C9.35419 2.00019 10.2497 2.89519 10.2497 4.00019V8.22519L11.2837 7.26019L11.9657 7.99019L9.74969 10.0602L7.53369 7.99019L8.21569 7.26019L9.24969 8.22519V4.00019C9.24969 3.45019 8.80169 3.00019 8.24969 3.00019Z" fill="#F2F5F7" />
            </g>
            <defs>
              <clipPath id="clip0_6539_8597">
                <rect width="16" height="16" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>

          <p className="text-xs">{formatNumber(retweet)}</p>
        </div>
      )}
      {view != null && (
        <div className="flex items-center gap-1">
          <Eye width={16} />
          {/* <img
            src={withBasePath('/assets/icons/statistic/view.png')}
            alt=""
            width={16}
          /> */}
          <p className="text-xs">{formatNumber(view)}</p>
        </div>
      )}
      {engagement != null && (
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.37524 10.5V1.5H5.37524V10.5H4.37524ZM9.00025 10.5V4.25H10.0002V10.5H9.00025ZM2.00024 10.5L2.00224 5.5H3.00224L3.00024 10.5H2.00024ZM6.62424 10.5V7H7.62424V10.5H6.62424Z" fill="currentColor" />
          </svg>

          <p className="text-xs">{formatNumber(engagement)}</p>
        </div>
      )}
    </div>
  );
};

export default RenderStatistic;
