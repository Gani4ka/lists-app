import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

export function isCategoryType(
  opt: string | CategoryType | SubcategoriesType
): opt is CategoryType | SubcategoriesType {
  return typeof opt !== 'string';
}
