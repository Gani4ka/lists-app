import type { ItemType } from '@app/types/list.types';

export interface ItemProps {
  item: ItemType;
  index: number;
  handleToggleDone: (id: string, isDone: boolean) => void;
  handleTitleChange: (index: number, newTitle: string) => void;
  handleDelete: (id: string) => void;
}
