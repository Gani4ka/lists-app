import { IconType } from 'react-icons';

import { CategoryIconItem } from '@app/app/categories/types';

export type IconPickerType = {
  onSelectIcon: (icon: CategoryIconItem) => void;
  selectedIcon: CategoryIconItem;
};

export interface CategoryIcon {
  id: number;
  name: string;
  Icon: IconType;
}
