'use client';
import { Box, Flex, Heading } from '@radix-ui/themes';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DesktopMenu from './components/desktopMenu';
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
      <Box className={styles['header-background']}>
        <Flex className={styles.header}>
          <Heading as="h1" className={`${styles['text']} 'allura-font'`}>
            <Link href="/">{getPageNameByPath(path)}</Link>
          </Heading>
          <Flex className={styles.menu}>
            <DesktopMenu hasUser={hasUser} />
            <MenuButton hasUser={hasUser} />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};
export default AuthHeader;
