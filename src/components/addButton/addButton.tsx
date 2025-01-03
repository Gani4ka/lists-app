'use client';

import { Button } from '@radix-ui/themes';
import clsx from 'clsx';

import Link from 'next/link';

import styles from './styles.module.css';
import type { AddButtonProps } from './types';

const AddButton = ({ clickHandler, linkTo, disabled }: AddButtonProps) => {
  const ButtonComponent = () => {
    return (
      <Button
        className={clsx(styles.button, disabled && styles.disabled)}
        onClick={clickHandler}
        disabled={disabled ?? false}
      />
    );
  };

  if (linkTo) {
    return (
      <Link href={linkTo}>
        <ButtonComponent />
      </Link>
    );
  } else {
    return <ButtonComponent />;
  }
};

export default AddButton;
