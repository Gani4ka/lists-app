'use client';

import { useRef, useState } from 'react';
import { FaFileArchive } from 'react-icons/fa';
import * as Form from '@radix-ui/react-form';
import { Button, Flex } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import {
  archiveSubcategories,
  deleteSubcategory,
  updateSubcategory,
} from '@app/api/subcategory';
import { DeleteButton } from '@app/components/deleteButton';
import { EditAndSaveButton } from '@app/components/editAndSaveButton';
import type { SubcategoriesType } from '@app/types/list.types';

import styles from '../../../../../components/editAndSaveButton/styles.module.css';
import classes from './styles.module.css';
import type { ListTitleProps } from './types';
export const ListTitle = ({ list, archived }: ListTitleProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [archiveMessage, setArchiveMessage] = useState<string>('');

  async function handleDeleteList() {
    await deleteSubcategory(list._id);
    router.push('/');
  }

  async function updateListTitle() {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    const formTitle = formData?.get('title');

    const data: SubcategoriesType = {
      title: typeof formTitle === 'string' ? formTitle : '',
      _id: list._id,
      categoryId: list.categoryId,
    };

    await updateSubcategory(list._id, data);
  }

  async function handleArchiveList(subcategoryId: string) {
    const ids = [];
    ids.push(subcategoryId);
    const action = archived ? 'unarchive' : 'archive';

    const result = await archiveSubcategories(ids, action);
    if (result && result.error) {
      setArchiveMessage(result.message);
    } else {
      router.back();
    }
  }
  return (
    <Form.Root onSubmit={updateListTitle} ref={formRef}>
      <Flex
        align={'center'}
        justify={'center'}
        wrap={'nowrap'}
        mb={'5'}
        gap={'2'}
      >
        <EditAndSaveButton
          archived={archived}
          cbSave={updateListTitle}
          formRef={formRef}
          inputRef={inputRef}
        />
        <Form.Field name="title">
          <Form.Control asChild>
            <input
              type="text"
              required
              defaultValue={list.title}
              placeholder={list.title}
              className={classes['list-title-input']}
              ref={inputRef}
              disabled={archived}
            />
          </Form.Control>
        </Form.Field>
        <DeleteButton item={list} cb={handleDeleteList} archived={false} />

        <Button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            handleArchiveList(list._id);
          }}
        >
          <FaFileArchive className={styles.icon} />
        </Button>

        {archiveMessage ?? ''}
      </Flex>
    </Form.Root>
  );
};
