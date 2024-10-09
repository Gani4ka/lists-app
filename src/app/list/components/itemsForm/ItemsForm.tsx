import { MouseEvent, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Checkbox, Flex } from '@radix-ui/themes';

import { deleteItem, updateItemMany } from '@app/api/item';

import { CreateItem } from './components/createItem';
import type { ItemsFormProps } from './types';

export const ItemsForm = ({ listOfItems, listId }: ItemsFormProps) => {
  const [items, setItems] = useState(listOfItems);

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

  async function handleDelete(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    await deleteItem(id);
    setItems((items) => items?.filter((item) => item._id !== id));
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    items && (await updateItemMany(listId, items));
  }

  return (
    <Flex direction="column" align="center" gap="2">
      <h2>item List</h2>
      <Form.Root onSubmit={(e) => handleSave(e)}>
        {!!items?.length &&
          items.map((item, index) => (
            <Flex key={item._id || index} align="center" gap="2" width="100%">
              <Checkbox
                checked={item.isDone}
                onCheckedChange={() =>
                  handleToggleDone(item._id!, !item.isDone)
                }
                id={`checkbox-${index}`}
              />
              <Form.Field name={`title-${index}`}>
                <Form.Control asChild>
                  <input
                    value={item.title}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    placeholder="Enter title"
                    style={{ flex: 1, marginRight: '10px' }}
                  />
                </Form.Control>
              </Form.Field>
              <Button
                onClick={(e) => handleDelete(e, item._id)}
                variant="ghost"
                color="red"
              >
                Delete
              </Button>
            </Flex>
          ))}
        {!!items?.length && (
          <Button variant="solid" style={{ marginTop: 10 }} type="submit">
            Save
          </Button>
        )}

        <CreateItem subcategoryId={listId} />
      </Form.Root>
    </Flex>
  );
};
