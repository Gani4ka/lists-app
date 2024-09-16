import { IconType } from 'react-icons';

import type { CategoryType } from '@app/types/list.types';

export interface CategoryCardProps {
  category?: CategoryType;
  children: React.ReactNode;
}

export interface CategoryIconProps {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
}
export interface CategoryIconItem {
  id: number;
  name: string;
  icon: IconType;
}
