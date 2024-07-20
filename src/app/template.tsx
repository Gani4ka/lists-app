import { Footer } from '@app/components/footer';
import { Header } from '@app/components/header';

function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Template;
