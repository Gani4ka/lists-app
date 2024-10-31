'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from 'react';
import * as Form from '@radix-ui/react-form';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Button, ChevronDownIcon, Flex, Link } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { createSubcategory } from '@app/api/subcategory';
import type { CategoryIconItem } from '@app/app/categories/types';
import { categoryIcons } from '@app/app/constants';
import AddButton from '@app/components/addButton';
import type { SubcategoriesType } from '@app/types/list.types';

import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../constants';
import { checkIsValidValue } from '../../utils/checkIsValidValue';
import { SelectItem } from './components/SelectItem';
import classes from './styles.module.css';
import type { ListFormProps } from './types';

const defaultIcon = categoryIcons[0];
export const CreateSubcategoryForm = ({
  listTitle,
  listCategoryId: initialListCategoryId,
  categories,
}: ListFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState({ isMin: false, isMax: false });
  const [category, setCategory] = useState(initialListCategoryId || '');
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const categoryData = categories?.find((cat) => cat.title === category);
  const [errorMessage, setErrorMessage] = useState<string>('');
  let Icon = null;

  useEffect(() => {
    if (categoryData?.icon) {
      const selectedIcon = categoryIcons.find(
        (iconItem) => iconItem.name === categoryData.icon
      );

      setCategoryIcon(selectedIcon ?? defaultIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (categoryIcon?.Icon) {
    Icon = categoryIcon.Icon;
  }

  const router = useRouter();

  async function handleListFormSubmit(
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
      const { subcategory, error, message } = await createSubcategory(
        currentCategoryId,
        data
      );
      if (error) {
        setErrorMessage(message);
      } else {
        router.push(`/subcategory/${subcategory?._id}`);
        setErrorMessage('');
      }
    }
  }

  return (
    <>
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
            <Form.Message
              className={classes['validation-message']}
              match="valueMissing"
            >
              Title is required
            </Form.Message>
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
            {errorMessage && <p className="error-text">{errorMessage}</p>}
          </Form.Field>

          <Form.Field name="categoryId">
            <Form.Control asChild>
              <>
                {!categories?.length ? (
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
                ) : (
                  <Select.Root value={category} onValueChange={setCategory}>
                    <input type="hidden" name="categoryId" value={category} />
                    <Select.Trigger className={classes['select-trigger']}>
                      <Select.Value
                        placeholder="Select a category"
                        aria-label={category}
                      >
                        <Flex className={classes['select-value']}>
                          {Icon && (
                            <Icon color={categoryData?.color} size={20} />
                          )}{' '}
                          {category || 'Select a category'}
                        </Flex>
                      </Select.Value>
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
                          <SelectItem
                            value={category.title}
                            key={category._id}
                            category={category}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </Select.Viewport>
                      <input type="hidden" name="categoryId" value={category} />
                    </Select.Content>
                  </Select.Root>
                )}
              </>
            </Form.Control>
          </Form.Field>

          <Button
            className={classes.button}
            type="submit"
            disabled={title === '' || category === ''}
          >
            Save
          </Button>
        </Form.Root>
      </Flex>
      <AddButton clickHandler={handleListFormSubmit} />
    </>
  );
};
