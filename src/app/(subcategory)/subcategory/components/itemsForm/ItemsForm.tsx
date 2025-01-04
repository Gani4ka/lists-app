'use client';

import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Box, Flex } from '@radix-ui/themes';

import { deleteItem, updateItemMany } from '@app/api/item';

import { CreateItem } from './components/createItem';
import { Item } from './components/item';
import classes from './styles.module.css';
import type { ItemsFormProps } from './types';

export const ItemsForm = ({ listOfItems, subcategoryId }: ItemsFormProps) => {
  const [items, setItems] = useState(listOfItems || []);
  const [draggingIndex, setDraggingIndex] = useState<number>();
  const [error, setError] = useState<string>('');

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
    const { error, message } = await deleteItem(id);

    if (error) {
      setError(message);
    } else {
      setError('');
    }

    setItems((items) => {
      const itemsRest = items?.filter((item) => item._id !== id);
      return itemsRest;
    });
  }

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (!draggingIndex || draggingIndex === index) return;
    const newItems = [...items];
    const [movedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);
    setDraggingIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    updateItemMany(subcategoryId, items);
  };

  return (
    <Flex width={'100%'}>
      <Form.Root className={classes['items-form-wrapper']}>
        <Box className={classes['width-box']}>
          {error && <p>{error}</p>}
          {!!items?.length &&
            items.map((item, index) => (
              <Item
                key={item._id}
                item={item}
                index={index}
                handleToggleDone={handleToggleDone}
                handleTitleChange={handleTitleChange}
                handleDelete={handleDelete}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
              />
            ))}
        </Box>
      </Form.Root>
      <CreateItem subcategoryId={subcategoryId} setItems={setItems} />
    </Flex>
  );
};
