'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
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
import { useSubCategoryContext } from '@app/components/SubCategoryContext/SubCategoryContext';
import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

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
  const [errors, setErrors] = useState({ isMin: false, isMax: false });
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const categoryData = categories?.find((cat) => cat.title === category?.title);
  const [errorMessage, setErrorMessage] = useState<string>('');
  let Icon = null;
  const { categoryId } = useSubCategoryContext();

  useEffect(() => {
    if (categoryId && !category) {
      const selectedCategory = categories?.find((ct) => ct._id === categoryId);
      if (selectedCategory) {
        setCategory(selectedCategory);
      }
    }
  }, [categories, category, categoryId]);

  const formRef = useRef<HTMLFormElement>(null);

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
    setErrorMessage('');

    const form = formRef.current as HTMLFormElement;
    const formData = new FormData(form);
    const formTitle = formData.get('title');

    const { isMin, isMax } = checkIsValidValue(
      formTitle ? formTitle.toString() : ''
    );
    if (isMin || isMax) return;
    setErrors({ isMin, isMax });
    const categoryId = categories?.find((ct) => ct._id === category?._id)?._id;

    if (categoryId) {
      const data: SubcategoriesType = {
        _id: '',
        title: typeof formTitle === 'string' ? formTitle : '',
        categoryId: categoryId,
      };

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
    } else {
      setErrorMessage('Category is not found');
    }
  }

  return (
    <>
      <Flex direction={'column'} align={'center'} pt="8">
        <Form.Root onSubmit={(e) => handleListFormSubmit(e)} ref={formRef}>
          <Form.Field name="title" style={{ position: 'relative' }}>
            <Form.Message
              match="tooShort"
              forceMatch={errors.isMin}
              className={classes['validation-message']}
            >{`At list ${MIN_FIELD_LENGTH} characters`}</Form.Message>
            <Form.Message
              match="tooLong"
              forceMatch={errors.isMax}
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
                  <Select.Root
                    value={category?._id.toString() || ''}
                    onValueChange={(value) => {
                      const selectedValue = categories.find(
                        (ct) => ct._id === value
                      );
                      if (selectedValue) {
                        setCategory(selectedValue);
                      }
                    }}
                    defaultValue=""
                  >
                    <Select.Trigger className={classes['select-trigger']}>
                      <Select.Value
                        placeholder="Select a category"
                        aria-label={category?.title}
                      >
                        <Flex className={classes['select-value']}>
                          {Icon && (
                            <Icon color={categoryData?.color} size={20} />
                          )}{' '}
                          {category?.title}
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
                            value={category._id}
                            key={category._id}
                            category={category}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Root>
                )}
              </>
            </Form.Control>
          </Form.Field>

          <Button className={classes.button} type="submit" disabled={!category}>
            Save
          </Button>
        </Form.Root>
      </Flex>
      <AddButton clickHandler={handleListFormSubmit} disabled={!category} />
    </>
  );
};
