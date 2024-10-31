import { SubCategoryItemType } from '@app/types/list.types';
import type { Dispatch, SetStateAction } from 'react';

export interface CreateItemProps {
  subcategoryId: string;
  setItems: Dispatch<SetStateAction<SubCategoryItemType[]>>;
}
