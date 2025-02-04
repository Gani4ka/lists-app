import { useRef, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Checkbox, Flex } from '@radix-ui/themes';

import { updateItem } from '@app/api/item';
import { DeleteButton } from '@app/components/deleteButton';
import { EditAndSaveButton } from '@app/components/editAndSaveButton';
import { debounce } from '@app/utils/debounce';

import type { ItemProps } from './item.types';
import classes from './styles.module.css';

export const Item = ({
  item,
  index,
  handleToggleDone,
  handleTitleChange,
  handleDelete,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  archived,
}: ItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>('');

  async function saveItem() {
    const response = await updateItem(item._id, item);

    if (response.error) {
      setError(response.message);
    } else {
      setError('');
    }
  }
  const onDoneChecked = debounce(() => {
    handleToggleDone(item._id!, !item.isDone);
    saveItem();
  }, 300);

  return (
    <Flex
      direction={'column'}
      style={{ cursor: 'grab' }}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault();
        handleDragOver(index);
      }}
      onDragEnd={handleDragEnd}
    >
      <Flex key={item._id} className={classes['item-wrapper']} ref={wrapperRef}>
        <Checkbox
          checked={item.isDone}
          onCheckedChange={onDoneChecked}
          id={`checkbox-${index}`}
          className={classes.checkbox}
          disabled={archived}
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
          archived={archived}
        />
        <DeleteButton item={item} cb={handleDelete} archived={archived} />
      </Flex>
      {error && <p>{error}</p>}
    </Flex>
  );
};
