import type { CategoryType } from '@app/types/list.types';

export function getCategoryByTitle(
  title: string,
  categories: CategoryType[] | undefined
) {
  return categories?.find((category) => category.title === title);
}
