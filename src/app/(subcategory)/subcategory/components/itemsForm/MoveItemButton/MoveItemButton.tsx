'use client';

import { useState } from 'react';
import { MdDriveFileMoveOutline } from 'react-icons/md';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@radix-ui/themes';
import clsx from 'clsx';

import { createSubCategoryItem } from '@app/api/item';
import { getAllSubcategories } from '@app/api/subcategory';
import type { SubcategoriesType } from '@app/types/list.types';

import { Select } from '../../../../components/Select';
import classes from './styles.module.css';
import type { ButtonProps } from './types';

export const MoveItemButton = ({
  item,
  setLoading,
  handleDelete,
}: ButtonProps) => {
  const [lists, setLists] = useState<SubcategoriesType[]>([]);
  const [list, setList] = useState<SubcategoriesType>();

  async function handleClick() {
    const lists = await getAllSubcategories();
    setLists(lists.subcategories);
  }

  async function handleMove() {
    if (!list) return;
    setLoading(true);

    await handleDelete(item._id);
    setLoading(false);
    await createSubCategoryItem(list._id, item);
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button className={classes.button} onClick={handleClick}>
          <MdDriveFileMoveOutline className={classes.icon} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={classes.alertDialogOverlay} />
        <AlertDialog.Content className={classes.alertDialogContent}>
          <AlertDialog.Title style={{ visibility: 'hidden', height: '1px' }}>
            Where would you like to move the item?
            <br />
            <strong>{item?.title}</strong>
          </AlertDialog.Title>
          <AlertDialog.Description className={classes.alertDialogDescription}>
            <Select
              value={list?._id.toString() || ''}
              text={list?.title || 'Select a category'}
              onValueChange={(value) => {
                setList(lists.find((list) => list._id === value));
              }}
              defaultValue={''}
              options={lists}
              placeholder="Select a list"
              loading={lists.length === 0}
            />
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
                onClick={handleMove}
                className={clsx(classes['dialog-button'], classes.approve)}
              >
                Yes, move {item.title}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
