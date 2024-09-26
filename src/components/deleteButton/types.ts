import type { CategoryType, ItemType } from '@app/types/list.types';

export interface DeleteButtonProps {
  item: CategoryType | ItemType;
  cb: (id: string) => void;
}
