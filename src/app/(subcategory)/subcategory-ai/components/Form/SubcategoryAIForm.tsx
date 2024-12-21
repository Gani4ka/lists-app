'use client';

import { createRef, type MouseEventHandler, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, Flex, Link, TextArea } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { sendAIRequest } from '@app/api/AI';
import { createSubcategory } from '@app/api/subcategory';
import { checkIsValidValue } from '@app/app/(subcategory)/subcategory/utils/checkIsValidValue';
import type { CategoryIconItem } from '@app/app/categories/types';
import AddButton from '@app/components/addButton';
import CustomDialog from '@app/components/custom-dialog/CustomDialog';
import Loader from '@app/components/loader';
import { PATHS } from '@app/constants/pages';
import { useSubCategoryContext } from '@app/contexts/SubCategoryContext';
import type { CategoryType } from '@app/types/list.types';

import { Select } from '../../../components/Select';
import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../../constants';
import classes from '../../../formStyles.module.css';
import { ITEMS_AMOUNT, LANGUAGES } from '../../constants';
import { useSetCategoryIcon } from '../../hooks/useSetCategoryIcon';
import { useSetInitialCategory } from '../../hooks/useSetInitialCategory';
import { createSubCategoryItems } from '../../utils/createSubCategoryItems';
import { parseContentAsArray } from '../../utils/parseContentAsArray';
import { ConfirmList } from './ConfirmList';
import type { SubcategoryAIFormProps } from './types';

export const SubcategoryAIForm = ({ categories }: SubcategoryAIFormProps) => {
  const { subcategoryTitle } = useSubCategoryContext();

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState({ isMin: false, isMax: false });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [categoryIcon, setCategoryIcon] = useState<CategoryIconItem>();
  const [itemsAmount, setItemsAmount] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES.English);
  const [list, setList] = useState<string[]>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  let Icon = null;

  const formRef = createRef<HTMLFormElement>();
  const router = useRouter();

  useSetInitialCategory(category, setCategory, categories);
  useSetCategoryIcon(category, setCategoryIcon, categories);

  Icon = categoryIcon?.Icon;

  async function handleListFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current!);
    const titleValue = String(formData.get('title'));

    const dataObject = {
      title: titleValue,
      categoryId: category?._id || '',
      topic: String(formData.get('topic')),
      description: String(formData.get('description')),
      itemsAmount: itemsAmount,
      language: language,
    };
    setTitle(titleValue);

    const { isMin, isMax } = checkIsValidValue(titleValue);
    if (isMin || isMax) {
      setLoading(false);
      setErrors({ isMin, isMax });
      return;
    }

    const response = await sendAIRequest(dataObject);
    setLoading(false);
    if ('error' in response) {
      setErrorMessage(response.message);
      return;
    }

    const list = parseContentAsArray(response, setErrorMessage);
    setList(list);
    setDialogOpen(true);
  }

  async function confirmListCallback() {
    setDialogOpen(false);
    setLoading(true);

    if (!category?._id || !title || !list) {
      setLoading(false);
      setErrorMessage('Try again');
      return;
    }

    const { subcategory } = await createSubcategory(category?._id, {
      title,
      categoryId: category?._id,
      _id: '',
    });

    if (!subcategory) {
      setLoading(false);
      setErrorMessage('Try again');
      return;
    }

    await createSubCategoryItems(list, subcategory, setErrorMessage);
    router.push(`${PATHS.subcategory}/${subcategory._id}`);
  }

  return (
    <>
      {loading && <Loader />}
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
                name="title"
                className={classes.textfield}
                type="text"
                required
                defaultValue={subcategoryTitle}
                placeholder={'Title'}
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
                    defaultValue={''}
                    required
                    options={categories}
                    placeholder="Select a category"
                  >
                    {Icon && <Icon color={category?.color} size={20} />}
                  </Select>
                )}
              </>
            </Form.Control>
          </Form.Field>
          <Form.Field name="topic">
            <Form.Control asChild>
              <input
                className={classes.textfield}
                type="text"
                required
                placeholder={'Topic'}
                maxLength={MAX_FIELD_LENGTH}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="description">
            <Form.Control asChild>
              <TextArea
                className={classes.textfield}
                required
                resize="both"
                placeholder={'Short instruction what items you need'}
                minLength={10}
                maxLength={200}
              ></TextArea>
            </Form.Control>
          </Form.Field>
          <Form.Field name="amount">
            <Form.Control asChild>
              <Select
                value={itemsAmount || ''}
                text={itemsAmount || ''}
                onValueChange={(value: string) => {
                  setItemsAmount(value);
                }}
                defaultValue={ITEMS_AMOUNT[0]}
                options={ITEMS_AMOUNT}
                placeholder="Select items amount"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="language">
            <Form.Control asChild>
              <Select
                value={language || ''}
                text={language || ''}
                onValueChange={(value: string) => {
                  setLanguage(value);
                }}
                defaultValue={'English'}
                options={Object.values(LANGUAGES)}
              />
            </Form.Control>
          </Form.Field>
          <Button className={classes.button} type="submit" disabled={!category}>
            Generate
          </Button>
        </Form.Root>
      </Flex>
      <AddButton
        clickHandler={
          handleListFormSubmit as unknown as MouseEventHandler<HTMLButtonElement>
        }
        disabled={!category}
      />
      {list && (
        <CustomDialog
          title="Generated list"
          description="Do you want to save this list? Or you'll try other request data?"
          customContent={<ConfirmList items={list} />}
          open={isDialogOpen}
          setOpen={setDialogOpen}
          confirmButtonCallback={confirmListCallback}
        />
      )}
    </>
  );
};
