import type { CategoryType } from '@app/types/list.types';

export function isCategoryType(
  opt: string | CategoryType
): opt is CategoryType {
  return typeof opt !== 'string';
}
