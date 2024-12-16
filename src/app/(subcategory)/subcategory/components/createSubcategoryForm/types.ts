import type { CategoryType, SubCategoryItemType } from '@app/types/list.types';

export interface ListFormProps {
  listOfItems: SubCategoryItemType[] | undefined;
  listTitle: string | undefined;
  listId: string | undefined;
  listCategoryId: string | undefined;
  categories: CategoryType[] | undefined;
}
