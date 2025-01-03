import type { Dispatch, SetStateAction } from 'react';

import { createSubCategoryItem } from '@app/api/item';
import type { SubcategoriesType } from '@app/types/list.types';

export const createSubCategoryItems = async (
  list: string[],
  subcategory: SubcategoriesType,
  setErrorMessage: Dispatch<SetStateAction<string>>
) => {
  try {
    await Promise.all(
      list?.map((item) => {
        return createSubCategoryItem(subcategory._id, {
          title: item,
          subcategoryId: subcategory?._id,
          _id: '',
        });
      })
    );
  } catch (error) {
    setErrorMessage(`Error creating subcategory items: ${error}`);
  }
};
