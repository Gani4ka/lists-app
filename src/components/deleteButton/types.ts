import type {
  CategoryType,
  SubcategoriesType,
  SubCategoryItemType,
} from '@app/types/list.types';

export interface DeleteButtonProps {
  item: CategoryType | SubCategoryItemType | SubcategoriesType;
  cb: (id: string) => void;
  archived: boolean;
}
