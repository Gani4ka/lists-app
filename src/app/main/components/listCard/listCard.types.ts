import type { SubcategoriesType } from '@app/types/list.types';

export interface ListCardProps {
  list: SubcategoriesType;
  children: React.ReactNode;
  color: string;
}
