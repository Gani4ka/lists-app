'use client';
import { useFormStatus } from 'react-dom';
import { Button, Flex } from '@radix-ui/themes';

import Link from 'next/link';

import { signupUser } from '@app/api/user';
import { AuthError } from '@app/types/list.types';

import styles from '../auth.module.css';

type Props = {
  btnText: string;
};
export default function SubmitButton({ btnText }: Props) {
  const { pending } = useFormStatus();

  return (
    <Flex>
      <Button disabled={pending} type="submit" className={styles.button}>
        {btnText}
      </Button>
    </Flex>
  );
}
