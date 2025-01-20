'use client';

import { type MouseEvent, useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import { Button } from '@radix-ui/themes';

import { useClickOutside } from '@app/hooks/useClickOutside';

import classes from './styles.module.css';
import type { ButtonProps } from './types';

export const EditAndSaveButton = ({
  cbEdit,
  cbSave,
  formRef,
  inputRef,
  archived,
}: ButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const input = inputRef.current;
    e.preventDefault();
    setIsEditing(true);

    input?.focus();
    input?.setSelectionRange(input?.value.length, input?.value.length);
    cbEdit?.();
  };
  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(false);
    cbSave();
  };

  useClickOutside(formRef, () => setIsEditing(false));

  useEffect(() => {
    const input = inputRef.current;
    input?.addEventListener('focus', () => setIsEditing(true));

    return () => {
      input?.removeEventListener('focus', () => setIsEditing(false));
    };
  }, [isEditing, inputRef]);

  return (
    <>
      {isEditing ? (
        <Button
          className={classes.button}
          onClick={handleSave}
          disabled={archived}
        >
          <RiCheckLine className={classes.icon} />
        </Button>
      ) : (
        <Button
          className={classes.button}
          onClick={handleEdit}
          disabled={archived}
        >
          <RiEdit2Line className={classes.icon} />
        </Button>
      )}
    </>
  );
};
