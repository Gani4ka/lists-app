import { type Dispatch, type SetStateAction, useEffect } from 'react';

import { useSubCategoryContext } from '@app/contexts/SubCategoryContext';
import type { CategoryType } from '@app/types/list.types';

export function useSetInitialCategory(
  category: CategoryType | null,
  setCategory: Dispatch<SetStateAction<CategoryType | null>>,
  categories: CategoryType[]
) {
  const { categoryId } = useSubCategoryContext();

  useEffect(() => {
    if (categoryId && !category) {
      const selectedCategory = categories?.find((ct) => ct._id === categoryId);
      if (selectedCategory) {
        setCategory(selectedCategory);
      }
    }
  }, []);
}
