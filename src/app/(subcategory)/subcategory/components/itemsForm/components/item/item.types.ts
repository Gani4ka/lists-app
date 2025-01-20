import type { SubCategoryItemType } from '@app/types/list.types';

export interface ItemProps {
  item: SubCategoryItemType;
  index: number;
  handleToggleDone: (id: string, isDone: boolean) => void;
  handleTitleChange: (index: number, newTitle: string) => void;
  handleDelete: (id: string) => void;
  handleDragStart: (index: number) => void;
  handleDragOver: (index: number) => void;
  handleDragEnd: () => void;
  archived: boolean;
}
