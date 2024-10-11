import { Box, Theme, ThemeProps } from '@radix-ui/themes';

import type { Metadata } from 'next';
import { Allura, Roboto_Mono } from 'next/font/google';
import Head from 'next/head';

import { Favicon } from '@app/components/favicon';
import { Footer } from '@app/components/footer';
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
      <Head>
        <Favicon />
      </Head>

      <body>
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
      </body>
    </html>
  );
}

export default RootLayout;
