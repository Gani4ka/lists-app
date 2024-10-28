'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useState,
} from 'react';
import * as Form from '@radix-ui/react-form';

import { createItem } from '@app/api/item';
import AddButton from '@app/components/addButton';
import type { ItemType } from '@app/types/list.types';

import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../../../constants';
import { checkIsValidValue } from '../../../../utils/checkIsValidValue';
import classes from './styles.module.css';
import type { CreateItemProps } from './types';

export const CreateItem = ({ subcategoryId, setItems }: CreateItemProps) => {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({ isMin: false, isMax: false });

  async function handleAdd(e: MouseEvent | ReactKeyboardEvent) {
    if (!title) return;

    e.preventDefault();

    const { isMin, isMax } = checkIsValidValue(title);
    setErrors({ isMin, isMax });
    if (isMin || isMax) return;

    const item: ItemType = {
      title,
      subcategoryId,
      _id: '',
      isDone: false,
    };

    const response = await createItem(subcategoryId, item);

    const isError =
      !response ||
      ('error' in response && !!response.error) ||
      !('subcategoryItem' in response);

    if (isError) alert(response?.error || 'Error creating item');
    else {
      setItems((items: ItemType[]) => {
        return [...items, response.subcategoryItem];
      });
      setTitle('');
    }
  }

  return (
    <Form.Root>
      <Form.Field
        name="create-item"
        className={classes['create-input-wrapper']}
      >
        <Form.Message
          match="tooShort"
          forceMatch={!!title.length && errors.isMin}
        >{`At list ${MIN_FIELD_LENGTH} characters`}</Form.Message>
        <Form.Message
          match="tooLong"
          forceMatch={!!title.length && errors.isMax}
        >{`Max length is ${MAX_FIELD_LENGTH} characters`}</Form.Message>
        <Form.Control asChild>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter item"
            className={classes['create-input']}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
            type="text"
            minLength={MIN_FIELD_LENGTH}
            maxLength={MAX_FIELD_LENGTH}
          />
        </Form.Control>
      </Form.Field>

      <AddButton clickHandler={handleAdd} />
    </Form.Root>
  );
};
