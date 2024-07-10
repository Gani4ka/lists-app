'use client';

import { useEffect } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

import { makeCategoriesReqWithErrCatch } from '@app/api/fetchData';

import styles from './header.module.css';
import type { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({ children }) => {
  useEffect(() => {
    const res = async function () {
      const r = await makeCategoriesReqWithErrCatch();
      console.log('res', r);
    };
    res();
  }, []);
  return (
    <header>
      <Flex>
        <Text className={`${styles['child-text']} 'allura-font'`}>
          {children}
        </Text>
        <Button className="menu-button">
          <HamburgerMenuIcon />
        </Button>
      </Flex>
    </header>
  );
};
