import type { SubCategoryItemType } from '@app/types/list.types';

export interface ButtonProps {
  item: SubCategoryItemType;
  setLoading: (loading: boolean) => void;
  handleDelete: (id: string) => void;
}
