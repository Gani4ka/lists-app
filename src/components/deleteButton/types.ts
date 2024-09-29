import type {
  CategoryType,
  ItemType,
  SubcategoriesType,
} from '@app/types/list.types';

export interface DeleteButtonProps {
  item: CategoryType | ItemType | SubcategoriesType;
  cb: (id: string) => void;
}
