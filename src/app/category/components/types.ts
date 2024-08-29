import type { CategoryType } from '@app/types/list.types';

export interface CategoryCardProps {
  category?: CategoryType;
  children: React.ReactNode;
}

export interface CategoryIconProps {
  children: React.ReactNode;
}
