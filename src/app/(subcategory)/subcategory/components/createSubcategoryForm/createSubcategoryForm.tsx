'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Flex } from '@radix-ui/themes';
import clsx from 'clsx';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createSubcategory } from '@app/api/subcategory';
import { Select } from '@app/app/(subcategory)/components/Select';
import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';
import type { CategoryIconItem } from '@app/app/categories/types';
import { CATEGORY_ICONS } from '@app/app/constants';
import AddButton from '@app/components/addButton';
import { PATHS } from '@app/constants/pages';
import { useSubCategoryContext } from '@app/contexts/SubCategoryContext';
import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../../constants';
import classes from '../../../formStyles.module.css';
import { checkIsValidValue } from '../../utils/checkIsValidValue';
import type { ListFormProps } from './types';

const defaultIcon = CATEGORY_ICONS[0];
export const CreateSubcategoryForm = ({
  listTitle,
  listCategoryId: initialListCategoryId,
  categories,
}: ListFormProps) => {
  const [errors, setErrors] = useState({ isMin: false, isMax: false });
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const [title, setTitle] = useState<string>(listTitle || '');

  let Icon = null;

  const categoryData = categories?.find((cat) => cat.title === category?.title);

  const { categoryId, setCategoryId, setSubcategoryTitle } =
    useSubCategoryContext();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (categoryId && !category) {
      const selectedCategory = categories?.find((ct) => ct._id === categoryId);
      if (selectedCategory) {
        setCategory(selectedCategory);
      }
    }
  }, [categories, category, categoryId]);

  useEffect(() => {
    if (categoryData?.icon) {
      const selectedIcon = CATEGORY_ICONS.find(
        (iconItem) => iconItem.name === categoryData.icon
      );

      setCategoryIcon(selectedIcon ?? defaultIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (categoryIcon?.Icon) {
    Icon = categoryIcon.Icon;
  }

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
    if (isMin || isMax) {
      setErrors({ isMin, isMax });
      return;
    }

    const categoryId = categories?.find((ct) => ct._id === category?._id)?._id;
    if (!categoryId) {
      setErrorMessage('Category is not found');
      return;
    }

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
  }

  function handleAICreate() {
    setSubcategoryTitle(title || '');
    setCategoryId(category?._id || '');
    router.push('/subcategory-ai');
  }

  return (
    <>
      <Flex
        direction={'column'}
        align={'center'}
        pt="8"
        className={classes.wrapper}
      >
        <Form.Root
          onSubmit={(e) => handleListFormSubmit(e)}
          ref={formRef}
          className={classes.form}
        >
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Control>
            {errorMessage && <GoToLoginPage message={errorMessage} />}
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
                      <Link href={PATHS.category}>here</Link>
                    </p>
                  </div>
                ) : (
                  <Select
                    value={category?._id.toString() || ''}
                    text={category?.title || 'Select a category'}
                    onValueChange={(value: string) => {
                      const selectedValue = categories.find(
                        (ct) => ct._id === value
                      );

                      if (selectedValue) {
                        setCategory(selectedValue);
                      }
                    }}
                    defaultValue=""
                    required
                    placeholder="Select a category"
                    options={categories}
                  >
                    {Icon && <Icon color={category?.color} size={20} />}
                  </Select>
                )}
              </>
            </Form.Control>
          </Form.Field>

          <Button className={classes.button} type="submit" disabled={!category}>
            Save
          </Button>
          <Button
            className={clsx(classes.button, classes.ai)}
            type="button"
            onClick={handleAICreate}
          >
            Save and generate items with AI✨
          </Button>
        </Form.Root>
      </Flex>
      <AddButton clickHandler={handleListFormSubmit} disabled={!category} />
    </>
  );
};
