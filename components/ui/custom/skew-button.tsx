import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface SkewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export default function SkewButton({
  children,
  className,
  ...props
}: SkewButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'group relative inline-block overflow-hidden shadow-lg rounded',
        'bg-white px-5 py-2.5',
        'text-[15px] font-semibold uppercase',
        'cursor-pointer',

        'before:absolute before:inset-0',
        'before:bg-[#141414]',
        'before:scale-x-0',
        'before:origin-left',
        'before:transition-transform before:duration-500',
        'hover:before:scale-x-100',

        className
      )}
    >
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </button>
  );
}