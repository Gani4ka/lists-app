import type { CategoryType } from '@app/types/list.types';

export function getCategoryByTitle(
  title: string,
  categories: CategoryType[] | undefined
) {
  if (title?.includes('-')) {
    title = title.replace(/-/g, ' ');
  }
  return categories?.find((category) => category.title === title);
}
