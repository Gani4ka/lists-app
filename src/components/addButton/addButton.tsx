'use client';

import type { MouseEventHandler } from 'react';
import { Button } from '@radix-ui/themes';

import styles from './styles.module.css';

interface AddButtonProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const AddButton = ({ clickHandler }: AddButtonProps) => {
  return (
    <Button className={styles.button} onClick={clickHandler}>
      <p className={styles.icon} />
    </Button>
  );
};

export default AddButton;
