'use client';

import { MouseEvent, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Checkbox, Flex } from '@radix-ui/themes';

import { createItem } from '@app/api/item';
import type { ItemType } from '@app/types/list.types';

import type { CreateItemProps } from './types';

export const CreateItem = ({ subcategoryId, setItems }: CreateItemProps) => {
  const [title, setTitle] = useState('');

  async function handleAdd(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const item: ItemType = {
      title,
      subcategoryId,
      _id: '',
    };

    const response = await createItem(subcategoryId, item);

    response?.subcategoryItem &&
      setItems((items: ItemType[]) => {
        return [...items, response.subcategoryItem];
      });
    setTitle('');
  }

  return (
    <Flex align="center" gap="2" width="100%">
      <Checkbox checked={false} />
      <Form.Field name="create-item">
        <Form.Control asChild>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={{ flex: 1, marginRight: '10px' }}
          />
        </Form.Control>
      </Form.Field>
      <Button onClick={(e) => handleAdd(e)} variant="ghost" color="red">
        Save
      </Button>
    </Flex>
  );
};
