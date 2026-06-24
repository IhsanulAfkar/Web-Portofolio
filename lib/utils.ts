import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const printLang = (data: Record<string, string>, lang: string) => {
  return data[lang] ?? '-'
}
export const getParam = (param: string | string[] | undefined) => {
  if (!param) return ''
  return Array.isArray(param) ? param[0] : param
}
export const formatNumber = (num?: number): string => {
  if (!num) return '0'
  const numStr = num.toString();
  if (num >= 1_000_000) {
    // Millions
    return Math.floor(num / 1_000_000) + 'M';
  } else if (num >= 100_000) {
    // Thousands
    return Math.floor(num / 1_000) + 'K';
  } else if (numStr.length > 4) {
    // ≤ 5 digits → insert dot after first 2 digits
    return numStr.slice(0, 2) + '.' + numStr.slice(2);
  } else if (numStr.length == 4) {
    return numStr.slice(0, 1) + '.' + numStr.slice(1)
  } else {
    // 1–2 digits → just return as-is
    return numStr;
  }
}
export const capitalize = (str: string) => {
  return str
    .toLowerCase() // normalize everything first
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const dateFormat = (
  dateInput: string | Date = "",
  format: string = "MMM D, YYYY HH:mm"
): string => {
  const date = moment.utc(dateInput);
  return date.isValid() ? date.format(format) : "";
};