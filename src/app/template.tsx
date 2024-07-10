// import { Allura, Roboto_Mono } from 'next/font/google';

import { Footer } from '@app/components/footer';
import { Header } from '@app/components/header';

// const allura = Allura({
//   weight: '400',
//   subsets: ['latin'],
//   variable: '--font-allura',
//   fallback: ['cursive'],
// });

// const roboto_mono = Roboto_Mono({
//   subsets: ['latin'],
//   variable: '--font-roboto-mono',
//   fallback: ['monospace'],
// });

function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
    // className={(allura.variable, roboto_mono.variable)}
    // style={{ ...roboto_mono.style }}
    >
      <Header>Header</Header>
      {children}
      <Footer />
    </div>
  );
}

export default Template;
