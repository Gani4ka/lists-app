import type { CategoryType } from '@app/types/list.types';

export interface SelectProps {
  value: string;
  text: string;
  onValueChange: (value: string) => void;
  defaultValue: string;
  options: string[] | CategoryType[];
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode;
}
