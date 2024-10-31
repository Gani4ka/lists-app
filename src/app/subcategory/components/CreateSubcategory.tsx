import { Flex } from '@radix-ui/themes';

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
  const { categories } = await getData('categories', '');

  return (
    <>
      <Flex direction={'column'} align={'center'} pl="2" pr="2">
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
