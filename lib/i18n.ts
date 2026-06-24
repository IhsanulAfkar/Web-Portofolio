// lib/i18n.ts

import { en } from "@/i18n/en";
import { id } from "@/i18n/id";

const dictionaries = {
  en,
  id,
};

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}