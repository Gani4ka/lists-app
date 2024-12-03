import { Box, Theme, ThemeProps } from '@radix-ui/themes';

import type { Metadata } from 'next';
import { Allura, Roboto_Mono } from 'next/font/google';

import { Favicon } from '@app/components/favicon';
import { Footer } from '@app/components/footer';
import { SubCategoryContextProvider } from '@app/components/SubCategoryContext/SubCategoryContext';
import type { LayoutProps } from '@app/types/layout.types';

import '@radix-ui/themes/styles.css';
import './globals.css';

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  fallback: ['cursive'],
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'My Lists App',
  description:
    'My Lists App - is a tool for keeping in order your thoughts, wishes and plans.',
};

const themeConfig: ThemeProps = {
  accentColor: 'jade',
  radius: 'none',
};

function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <Favicon />
      <link rel="manifest" href="/manifest.json"></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/icon-96x96.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/icon-192x192.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/icon-512x512.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      ></link>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      ></meta>
      <body>
        <SubCategoryContextProvider>
          <Theme {...themeConfig}>
            <Box
              className={`${roboto_mono.variable} ${allura.variable}`}
              style={roboto_mono.style}
              minHeight="100vh"
              position="relative"
            >
              {children}
              <Footer />
            </Box>
          </Theme>
        </SubCategoryContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
