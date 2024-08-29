import type { CategoryType, ItemType } from '@app/types/list.types';

export interface ListFormProps {
  listOfItems: ItemType[] | undefined;
  listTitle: string | undefined;
  listId: string | undefined;
  listCategoryId: string | undefined;
  categories: CategoryType[] | undefined;
}
