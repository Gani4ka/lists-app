import { CategoryType, SubcategoriesType } from '@app/types/list.types';

export interface AllSubCategoriesItemsType {
  categories: CategoryType[];
  subcategories: SubcategoriesType[];
}

export interface UserCategoryType {
  id: string;
  category: string;
}
