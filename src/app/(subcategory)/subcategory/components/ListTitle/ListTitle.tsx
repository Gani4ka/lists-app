'use client';

import { useRef } from 'react';
import * as Form from '@radix-ui/react-form';
import { Flex } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { deleteSubcategory, updateSubcategory } from '@app/api/subcategory';
import { DeleteButton } from '@app/components/deleteButton';
import { EditAndSaveButton } from '@app/components/editAndSaveButton';
import type { SubcategoriesType } from '@app/types/list.types';

import classes from './styles.module.css';
import type { ListTitleProps } from './types';

export const ListTitle = ({ list }: ListTitleProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleDeleteList() {
    deleteSubcategory(list._id);
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
            />
          </Form.Control>
        </Form.Field>

        <DeleteButton item={list} cb={handleDeleteList} />
      </Flex>
    </Form.Root>
  );
};
