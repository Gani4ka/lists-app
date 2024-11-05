export type CategoryFilterOption = {
  id: string;
  name: string;
};

export type CategorySortingOption = {
  id: string;
  name: string;
};
export type CategorySelectProps = {
  options: CategoryFilterOption[] | CategorySortingOption[];
  value: CategoryFilterOption | CategorySortingOption | null;
  onChange: (value: CategoryFilterOption | CategorySortingOption) => void;
  label: string;
};

export const NO_CATEGORIES_FILLTER = { id: '0', name: 'No filter' };

export const TITLE_ASC_FILTER = 'title A-Z';
export const TITLE_DESC_FILTER = 'title Z-A';

export const DATE_ASC_FILTER = 'date from new';
export const DATE_DESC_FILTER = 'date from old';
export interface UserCategorySortingType {
  id: number;
  sorting: string;
}
export const categoriesSortingOptions: CategorySortingOption[] = [
  {
    id: '1',
    name: TITLE_ASC_FILTER,
  },
  {
    id: '2',
    name: TITLE_DESC_FILTER,
  },
  {
    id: '3',
    name: DATE_ASC_FILTER,
  },
  {
    id: '4',
    name: DATE_DESC_FILTER,
  },
];
