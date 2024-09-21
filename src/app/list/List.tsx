// import type { IconType } from 'react-icons';
import { Flex } from '@radix-ui/themes';

import { ItemsForm } from './components/itemsForm';
import { ListForm } from './components/listForm/listForm';
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
    <Flex direction={'column'} align={'center'}>
      <ListForm
        listOfItems={listOfItems}
        listTitle={list?.title}
        listId={listId}
        listCategoryId={list?.categoryId}
        categories={categories}
      />
      {listId && <ItemsForm listOfItems={listOfItems} listId={listId} />}
    </Flex>
  );
};

export default List;
