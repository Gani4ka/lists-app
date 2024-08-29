import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';
import type { CategoryType } from '@app/types/list.types';

export function getCategoryIcon(
  categoryId: string,
  categories: CategoryType[]
): string {
  const category = categories.find((category) => category._id === categoryId);
  return category ? category.icon : DEFAULT_CATEGORY_ICON;
}
