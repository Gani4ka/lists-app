import { SubcategoriesType } from '@app/types/list.types';

export interface ListProps {
  params: {
    subcategoryId: string;
  };
}
export interface SubCategoryResponse {
  message: string;
  subcategory: SubcategoriesType | null;
  error: boolean;
}
