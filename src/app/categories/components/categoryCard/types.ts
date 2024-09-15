import type { CategoryType } from '@app/types/list.types';

export interface CategoryCardProps {
  category: CategoryType;
}
export interface AddEditProps {
  category: CategoryType | null;
}
export interface CategoryParamProp {
  categoryId: string;
}
