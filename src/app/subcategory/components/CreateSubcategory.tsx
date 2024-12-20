import { Flex } from '@radix-ui/themes';

import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';

import type { ListProps } from '../types';
import { getData } from '../utils/getData';
import { CreateSubcategoryForm } from './createSubcategoryForm/createSubcategoryForm';

const Subcategory = async ({ params }: ListProps) => {
  const subcategoryId = params.subcategoryId;

  const subcategoryResponse = await getData('subcategory', subcategoryId);
  const subcategoriesResponse = await getData(
    'subcategoryItems',
    subcategoryId
  );
  const { categories, error, message } = await getData('categories', '');

  return (
    <>
      <Flex direction={'column'} align={'center'} pl="2" pr="2">
        {error && <GoToLoginPage message={message} />}

        <CreateSubcategoryForm
          listOfItems={subcategoriesResponse?.subcategoryItems}
          listTitle={subcategoryResponse?.subcategory?.title}
          listId={subcategoryId}
          listCategoryId={subcategoryResponse?.subcategory?.categoryId}
          categories={categories}
        />
      </Flex>
    </>
  );
};

export default Subcategory;
