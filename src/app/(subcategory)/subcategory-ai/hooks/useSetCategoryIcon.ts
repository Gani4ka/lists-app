import { type Dispatch, type SetStateAction, useEffect } from 'react';

import type { CategoryIconItem } from '@app/app/categories/types';
import { CATEGORY_ICONS } from '@app/app/constants';
import type { CategoryType } from '@app/types/list.types';

export function useSetCategoryIcon(
  category: CategoryType | null,
  setCategoryIcon: Dispatch<SetStateAction<CategoryIconItem | undefined>>,
  categories: CategoryType[]
) {
  const categoryData = categories?.find((cat) => cat.title === category?.title);
  const defaultIcon = CATEGORY_ICONS[0];

  useEffect(() => {
    if (categoryData?.icon) {
      const selectedIcon = CATEGORY_ICONS.find(
        (iconItem) => iconItem.name === categoryData.icon
      );

      setCategoryIcon(selectedIcon ?? defaultIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
}
