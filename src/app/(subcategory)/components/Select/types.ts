import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

export interface SelectProps {
  value: string;
  text: string;
  onValueChange: (value: string) => void;
  defaultValue: string;
  options: string[] | CategoryType[] | SubcategoriesType[];
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
}
