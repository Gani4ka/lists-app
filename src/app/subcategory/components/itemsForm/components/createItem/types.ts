import type { Dispatch, SetStateAction } from 'react';

import type { ItemType } from '@app/types/list.types';

export interface CreateItemProps {
  subcategoryId: string;
  setItems: Dispatch<SetStateAction<ItemType[]>>;
}
