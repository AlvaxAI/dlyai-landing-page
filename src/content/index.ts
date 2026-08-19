import { en } from "./en";
import type { SiteContent } from "./types";

/**
 * i18n scaffold. English ships first; Chinese copy already exists in
 * DLY-AI-Deck/Brand/brand-story.md and brand-messaging.md when we're ready.
 *
 * To add Chinese: create ./zh.ts satisfying SiteContent, register it in
 * `dictionaries` below, add "zh" to `locales`, and mount app/zh/page.tsx.
 * The English root URL ("/") stays untouched.
 */

export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, SiteContent> = { en };

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type * from "./types";
