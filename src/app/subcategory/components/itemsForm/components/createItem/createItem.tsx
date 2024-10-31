'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useState,
} from 'react';
import * as Form from '@radix-ui/react-form';

import { createSubCategoryItem } from '@app/api/item';
import AddButton from '@app/components/addButton';
import type { SubCategoryItemType } from '@app/types/list.types';

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

    const item: SubCategoryItemType = {
      title,
      subcategoryId,
      _id: '',
      isDone: false,
    };

    const { subcategoryItem, error, message } = await createSubCategoryItem(
      subcategoryId,
      item
    );

    if (error || subcategoryItem === null)
      alert(message || 'Error creating item');
    else {
      setItems((items: SubCategoryItemType[]) => {
        return [...items, subcategoryItem];
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

      <AddButton clickHandler={handleAdd} disabled={title === ''} />
    </Form.Root>
  );
};
