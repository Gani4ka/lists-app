'use client';
import { useFormStatus } from 'react-dom';
import { Button, Flex } from '@radix-ui/themes';

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
