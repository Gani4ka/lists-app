import { Flex } from '@radix-ui/themes';

import type { ListProps } from '../types';
import { getData } from '../utils/getData';
import { CreateSubcategoryForm } from './createSubcategoryForm/createSubcategoryForm';

const Subcategory = async ({ params }: ListProps) => {
  const listId = params.id;

  const list = await getData('subcategory', listId);
  const listOfItems = await getData('subcategoryItems', listId);
  const { categories } = await getData('categories', '');

  return (
    <>
      <Flex direction={'column'} align={'center'} pl="2" pr="2">
        <CreateSubcategoryForm
          listOfItems={listOfItems}
          listTitle={list?.title}
          listId={listId}
          listCategoryId={list?.categoryId}
          categories={categories}
        />
      </Flex>
    </>
  );
};

export default Subcategory;
