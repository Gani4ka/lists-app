import { useRef } from 'react';
import * as Form from '@radix-ui/react-form';
import { Checkbox, Flex } from '@radix-ui/themes';

import { updateItem } from '@app/api/item';
import { DeleteButton } from '@app/components/deleteButton';
import { EditAndSaveButton } from '@app/components/editAndSaveButton';

import type { ItemProps } from './item.types';
import classes from './styles.module.css';

export const Item = ({
  item,
  index,
  handleToggleDone,
  handleTitleChange,
  handleDelete,
}: ItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  async function saveItem() {
    await updateItem(item.subcategoryId, item);
  }

  return (
    <Flex key={item._id} className={classes['item-wrapper']} ref={wrapperRef}>
      <Checkbox
        checked={item.isDone}
        onCheckedChange={() => handleToggleDone(item._id!, !item.isDone)}
        id={`checkbox-${index}`}
        className={classes.checkbox}
      />
      <Form.Field
        name={`title-${index}`}
        className={classes['item-input-wrapper']}
      >
        <Form.Control asChild>
          <input
            value={item.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            placeholder="Enter title"
            className={classes['item-input']}
            ref={inputRef}
          />
        </Form.Control>
      </Form.Field>
      <EditAndSaveButton
        cbSave={saveItem}
        formRef={wrapperRef}
        inputRef={inputRef}
      />
      <DeleteButton item={item} cb={handleDelete} />
    </Flex>
  );
};
