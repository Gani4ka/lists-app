import { Allura, Roboto_Mono } from 'next/font/google';

export const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  fallback: ['cursive'],
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  fallback: ['monospace'],
});
