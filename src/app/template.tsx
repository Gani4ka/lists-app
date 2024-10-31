import Header from '@app/components/header';
import type { LayoutProps } from '@app/types/layout.types';

function Template({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Template;
