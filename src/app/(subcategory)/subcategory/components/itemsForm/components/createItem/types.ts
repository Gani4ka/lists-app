import type { Dispatch, SetStateAction } from 'react';

import { SubCategoryItemType } from '@app/types/list.types';

export interface CreateItemProps {
  subcategoryId: string;
  setItems: Dispatch<SetStateAction<SubCategoryItemType[]>>;
  index: number;
}
