'use client';

import {
  forwardRef,
  KeyboardEvent as ReactKeyboardEvent,
  useState,
} from 'react';
import * as Form from '@radix-ui/react-form';
import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Box, Button, ChevronDownIcon, Flex, Link } from '@radix-ui/themes';

import { createSubcategory } from '@app/api/subcategory';
import type { SubcategoriesType } from '@app/types/list.types';

import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../constants';
import { checkIsValidValue } from '../../utils/checkIsValidValue';
import classes from './styles.module.css';
import type { ListFormProps } from './types';
export const CreateListForm = ({
  listTitle,
  listCategoryId: initialListCategoryId,
  categories,
}: ListFormProps) => {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({ isMin: false, isMax: false });

  function handleListFormSubmit(
    e: MouseEvent | ReactKeyboardEvent | React.FormEvent
  ) {
    e.preventDefault();

    const { isMin, isMax } = checkIsValidValue(title);
    setErrors({ isMin, isMax });
    if (isMin || isMax) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formTitle = formData.get('title');
    const formCategoryId = formData.get('categoryId');

    const data: SubcategoriesType = {
      _id: '',
      title: typeof formTitle === 'string' ? formTitle : '',
      categoryId: typeof formCategoryId === 'string' ? formCategoryId : '',
    };

    const categoryId = categories?.find(
      (cat) => cat.title === data.categoryId
    )?._id;
    const currentCategoryId = categoryId || initialListCategoryId;

    if (currentCategoryId) {
      createSubcategory(currentCategoryId, data);
    }
  }

  interface SelectItemProps {
    children: React.ReactNode;
    value: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    function SelectItem(props, forwardedRef) {
      return (
        <Select.Item
          className={classes['select-item']}
          {...props}
          ref={forwardedRef}
          value={props.value}
        >
          <Select.ItemText>{props.children}</Select.ItemText>
          <Select.ItemIndicator className="SelectItemIndicator">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );

  return (
    <Flex direction={'column'} align={'center'} pt="8">
      <Form.Root onSubmit={(e) => handleListFormSubmit(e)}>
        <Form.Field name="title" style={{ position: 'relative' }}>
          <Form.Message
            match="tooShort"
            forceMatch={!!title.length && errors.isMin}
            className={classes['validation-message']}
          >{`At list ${MIN_FIELD_LENGTH} characters`}</Form.Message>
          <Form.Message
            match="tooLong"
            forceMatch={!!title.length && errors.isMax}
            className={classes['validation-message']}
          >{`Max length is ${MAX_FIELD_LENGTH} characters`}</Form.Message>
          <Form.Control asChild>
            <input
              className={classes.textfield}
              type="text"
              required
              defaultValue={listTitle}
              placeholder={listTitle || 'Title'}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleListFormSubmit(e)}
              minLength={MIN_FIELD_LENGTH}
              maxLength={MAX_FIELD_LENGTH}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="categoryId">
          <Form.Control asChild>
            <>
              {!categories?.length && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>
                    You don&apos;t have any categories yet. Please create some{' '}
                    <Link href="/category">here</Link>
                  </p>
                </div>
              )}
              <Select.Root>
                <Box className={classes['select-wrapper']}>
                  <Select.Trigger
                    className={classes['select-trigger']}
                    aria-label="Food"
                  >
                    <Select.Value placeholder="Select a category" />
                    <Select.Icon className={classes['select-icon']}>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Content className={classes['select-content']}>
                    <Select.ScrollUpButton
                      className={classes['select-scroll-button']}
                    >
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className={classes['select-viewport']}>
                      {categories?.map((category) => (
                        <SelectItem value={category.title} key={category._id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Box>
              </Select.Root>
            </>
          </Form.Control>
        </Form.Field>

        <Button className={classes.button} type="submit">
          Save
        </Button>
      </Form.Root>
    </Flex>
  );
};
