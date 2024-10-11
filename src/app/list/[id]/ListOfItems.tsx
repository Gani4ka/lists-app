import { Flex } from '@radix-ui/themes';

import { ItemsForm } from '../components/itemsForm';
import { ListTitle } from '../components/ListTitle';
import type { ListProps } from '../types';
import { getData } from '../utils/getData';

const List = async ({ params }: ListProps) => {
  const listId = params.id;

  const listOfItems = await getData('subcategoryItems', listId);
  const list = await getData('subcategory', listId);

  return (
    <Flex direction={'column'} align={'center'} pl="2" pr="2" pt={'1'}>
      {list && <ListTitle list={list} />}
      {listId && <ItemsForm listOfItems={listOfItems} listId={listId} />}
    </Flex>
  );
};

export default List;
