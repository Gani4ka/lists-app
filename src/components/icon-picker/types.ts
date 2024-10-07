import { IconType } from 'react-icons';

export type IconPickerType = {
  onSelectIcon: (icon: string) => void;
  selectedIcon: string;
};

export interface CategoryIcon {
  id: number;
  name: string;
  Icon: IconType;
}
