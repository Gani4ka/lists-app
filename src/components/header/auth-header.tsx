'use client';
import { Flex, Heading } from '@radix-ui/themes';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import MenuButton from './components/menuButton';
import styles from './header.module.css';
import { getPageNameByPath } from './utils/getPageNameByPath';
type Props = {
  hasUser: boolean;
};
const AuthHeader = ({ hasUser }: Props) => {
  const path = usePathname();

  return (
    <header>
      <Flex className={styles.header}>
        <Heading as="h1" className={`${styles['text']} 'allura-font'`}>
          <Link href="/">{getPageNameByPath(path)}</Link>
        </Heading>
        <MenuButton hasUser={hasUser} />
      </Flex>
    </header>
  );
};
export default AuthHeader;
