'use client';

import * as Form from '@radix-ui/react-form';
import { Button, Flex, Link } from '@radix-ui/themes';

import { createSubcategory } from '@app/api/subcategory';
import type { SubcategoriesType } from '@app/types/list.types';

import classes from './styles.module.css';
import type { ListFormProps } from './types';

export const CreateListForm = ({
  listTitle,
  listCategoryId: initialListCategoryId,
  categories,
}: ListFormProps) => {
  function handleListFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

  return (
    <Flex direction={'column'} align={'center'}>
      <Form.Root onSubmit={(e) => handleListFormSubmit(e)}>
        <Form.Field name="title">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            {!categories?.length && (
              <p>
                You don&apos;t have any categories yet. Please create some{' '}
                <Link href="/category">here</Link>
              </p>
            )}
          </div>
          <Form.Control asChild>
            <input
              className={classes.textfield}
              type="text"
              required
              defaultValue={listTitle}
              placeholder={listTitle || 'Title'}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="categoryId">
          <Form.Control asChild>
            <select>
              {categories?.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </Form.Control>
        </Form.Field>

        <Button className="Button" style={{ marginTop: 10 }} type="submit">
          Save
        </Button>
      </Form.Root>
    </Flex>
  );
};
