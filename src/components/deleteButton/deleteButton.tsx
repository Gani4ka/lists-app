'use client';

import type { MouseEvent } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@radix-ui/themes';
import clsx from 'clsx';

import classes from './styles.module.css';
import type { DeleteButtonProps } from './types';

export const DeleteButton = ({ item, cb }: DeleteButtonProps) => {
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await cb(item?._id);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button className={classes.button}>
          <RiDeleteBinLine className={classes.icon} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={classes.alertDialogOverlay} />
        <AlertDialog.Content className={classes.alertDialogContent}>
          <AlertDialog.Title style={{ visibility: 'hidden', height: '1px' }}>
            Are you sure about deleting it?
          </AlertDialog.Title>
          <AlertDialog.Description className={classes.alertDialogDescription}>
            Delete <strong>{item?.title}</strong>?
          </AlertDialog.Description>
          <div
            style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'flex-end',
            }}
          >
            <AlertDialog.Cancel asChild>
              <button
                className={clsx(classes['dialog-button'], classes.cancel)}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={(e) => handleDelete(e)}
                className={clsx(classes['dialog-button'], classes.approve)}
              >
                Yes, delete {item.title}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
