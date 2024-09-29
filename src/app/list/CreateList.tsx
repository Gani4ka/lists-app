// import type { IconType } from 'react-icons';
import { Flex } from '@radix-ui/themes';

import { CreateListForm } from './components/createListForm/createListForm';
import type { ListProps } from './types';
import { getData } from './utils/getData';

const List = async ({ params }: ListProps) => {
  const listId = params.id;

  const list = await getData('subcategory', listId);
  const listOfItems = await getData('subcategoryItems', listId);
  const categories = await getData('categories', '');

  // const currentCategory = getCategoryByTitle(categoryName, categories);

  //   const icons = (await import('react-icons/fc')) as unknown as {
  //     [key: string]: IconType;
  //   };
  //   const Icon =
  //     (currentCategory && icons[currentCategory.icon]) ||
  //     icons[DEFAULT_CATEGORY_ICON];

  return (
    <Flex direction={'column'} align={'center'} pl="2" pr="2">
      <CreateListForm
        listOfItems={listOfItems}
        listTitle={list?.title}
        listId={listId}
        listCategoryId={list?.categoryId}
        categories={categories}
      />
    </Flex>
  );
};

export default List;
