'use client';

import { Flex } from '@radix-ui/themes';

import Link from 'next/link';

import styles from './auth.module.css';

export default function AuthForm() {
  const content = (
    <Flex direction={'column'} gap={'30px'} align={'center'}>
      <h2 className={styles.appTitle}>Lists app</h2>
      <Link href="/auth/login">Login with email and password</Link>
      <Link href="/auth/signup">Sign up here</Link>
    </Flex>
  );

  return content;
}
