'use client';
import { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Button, Flex } from '@radix-ui/themes';

import styles from './resetPassword.module.css';
import { ResetPasswordTypes } from './types';

const ResetPasswordForm = ({ resetPassword }: ResetPasswordTypes) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onResetEmailHandler = async () => {
    setError('');
    if (email.includes('@')) {
      const result = await resetPassword(email);
      if (result.error) {
        setError(result.message);
      } else {
        setMessage(result.message);
      }
    } else {
      setError('Please enter a valid email');
    }
  };
  return (
    <Flex direction={'column'} className={styles.container} align={'center'}>
      <Label.Root className={styles.text} htmlFor="email">
        Please enter your email and we will send you a link to reset your
        password
      </Label.Root>
      <input
        className={styles.email}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className={styles.button}
        disabled={email === ''}
        onClick={onResetEmailHandler}
      >
        Send
      </Button>
      <p className={styles.error}>{error}</p>
      <p>{message}</p>
    </Flex>
  );
};
export default ResetPasswordForm;
