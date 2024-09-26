'use client';

import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Flex } from '@radix-ui/themes';

import { deleteItem, updateItemMany } from '@app/api/item';

import { CreateItem } from './components/createItem';
import { Item } from './components/item';
import classes from './styles.module.css';
import type { ItemsFormProps } from './types';

export const ItemsForm = ({ listOfItems, listId }: ItemsFormProps) => {
  const [items, setItems] = useState(listOfItems || []);

  function handleTitleChange(index: number, newTitle: string) {
    const updatedItems = [...(items || [])];
    updatedItems[index].title = newTitle;
    setItems(updatedItems);
  }

  function handleToggleDone(id: string, isDone: boolean) {
    const updatedItems = [...(items || [])];
    const index = updatedItems.findIndex((item) => item._id === id);
    updatedItems[index].isDone = isDone;
    setItems(updatedItems);
  }

  async function handleDelete(id: string) {
    const response = await deleteItem(id);

    response &&
      setItems((items) => {
        const itemsRest = items?.filter((item) => item._id !== id);
        return itemsRest;
      });
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    items && (await updateItemMany(listId, items));
  }

  return (
    <Flex width={'100%'}>
      <Form.Root
        onSubmit={(e) => handleSave(e)}
        className={classes['items-form-wrapper']}
      >
        {!!items?.length &&
          items.map((item, index) => (
            <Item
              key={item._id}
              item={item}
              index={index}
              handleToggleDone={handleToggleDone}
              handleTitleChange={handleTitleChange}
              handleDelete={handleDelete}
            />
          ))}
        {!!items?.length && (
          <Button
            variant="solid"
            style={{ marginTop: 10, width: '150px' }}
            type="submit"
          >
            Save
          </Button>
        )}
      </Form.Root>
      <CreateItem subcategoryId={listId} setItems={setItems} />
    </Flex>
  );
};
