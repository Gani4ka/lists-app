'use client';

import type { MouseEventHandler } from 'react';
import { Button } from '@radix-ui/themes';

import Link from 'next/link';

import type { PATHS } from '@app/constants/pages';

import styles from './styles.module.css';

interface AddButtonProps {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  linkTo?: PATHS;
}

const AddButton = ({ clickHandler, linkTo }: AddButtonProps) => {
  return (
    <Button className={styles.button} onClick={clickHandler}>
      {linkTo ? (
        <Link href={linkTo}>
          <p className={styles.icon} />
        </Link>
      ) : (
        <p className={styles.icon} />
      )}
    </Button>
  );
};

export default AddButton;
