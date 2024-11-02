import { CategoryType, SubcategoriesType } from '@app/types/list.types';

export interface AllSubCategoriesItemsType {
  categories: CategoryType[];
  subcategories: SubcategoriesType[];
}

export interface UserCategoryType {
  id: string;
  category: string;
}
export interface UserCategorySortingType {
  id: number;
  sorting: string;
}
export const categoriesSortingTypes: UserCategorySortingType[] = [
  {
    id: 1,
    sorting: 'title-asc',
  },
  {
    id: 2,
    sorting: 'title-desc',
  },
  {
    id: 3,
    sorting: 'date-asc',
  },
  {
    id: 4,
    sorting: 'date-desc',
  },
];
