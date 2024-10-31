import { getCategories } from '@app/api/categories';
import { getSubcategoryItems } from '@app/api/item';
import { getSubcategory } from '@app/api/subcategory';
import type {
  CategoriesResponse,
  SubCategoryItemsResponse,
} from '@app/types/list.types';

import { SubCategoryResponse } from '../types';

export async function getData(
  dataType: 'subcategory',
  id: string
): Promise<SubCategoryResponse>;

export async function getData(
  dataType: 'subcategoryItems',
  id: string
): Promise<SubCategoryItemsResponse>;

export async function getData(
  dataType: 'categories',
  id: string
): Promise<CategoriesResponse>;

export async function getData<
  T extends 'subcategory' | 'subcategoryItems' | 'categories'
>(dataType: T, id: string) {
  switch (dataType) {
    case 'subcategory': {
      const subcategoryResponse = id && (await getSubcategory(id));
      return subcategoryResponse;
    }
    case 'subcategoryItems': {
      const subcategoryItemsResponse = id && (await getSubcategoryItems(id));
      return subcategoryItemsResponse;
    }
    case 'categories': {
      const categoriesResponse = await getCategories();
      return categoriesResponse;
    }
    default:
      return undefined;
  }
}
