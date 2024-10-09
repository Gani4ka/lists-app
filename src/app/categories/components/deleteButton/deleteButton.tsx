'use client';

import { RiDeleteBinLine } from 'react-icons/ri';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@radix-ui/themes';
import clsx from 'clsx';

import { deleteCategory } from '@app/api/category';

import classes from './styles.module.css';
import type { DeleteButtonProps } from './types';

export const DeleteButton = ({ category }: DeleteButtonProps) => {
  const handleDelete = async () => {
    await deleteCategory(category._id);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button>
          <RiDeleteBinLine />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={classes.alertDialogOverlay} />
        <AlertDialog.Content className={classes.alertDialogContent}>
          <AlertDialog.Description className={classes.alertDialogDescription}>
            Delete category <strong>{category.title}</strong>?
          </AlertDialog.Description>
          <div
            style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'flex-end',
            }}
          >
            <AlertDialog.Cancel asChild>
              <button className={clsx(classes.button, classes.cancel)}>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={handleDelete}
                className={clsx(classes.button, classes.approve)}
              >
                Yes, delete {category.title}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
