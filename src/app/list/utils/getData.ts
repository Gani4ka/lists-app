import { getCategories } from '@app/api/categories';
import { getSubcategoryItems } from '@app/api/item';
import { getSubcategory } from '@app/api/subcategory';
import type {
  CategoryType,
  ItemType,
  SubcategoriesType,
} from '@app/types/list.types';

export async function getData(
  dataType: 'subcategory',
  id: string
): Promise<SubcategoriesType | undefined>;

export async function getData(
  dataType: 'subcategoryItems',
  id: string
): Promise<ItemType[] | undefined>;

export async function getData(
  dataType: 'categories',
  id: string
): Promise<CategoryType[] | undefined>;

export async function getData<
  T extends 'subcategory' | 'subcategoryItems' | 'categories'
>(dataType: T, id: string) {
  switch (dataType) {
    case 'subcategory': {
      const listResponse = id && (await getSubcategory(id));
      const list =
        listResponse &&
        'subcategory' in listResponse &&
        listResponse?.subcategory;

      return list;
    }
    case 'subcategoryItems': {
      const listOfItemsResponse = id && (await getSubcategoryItems(id));
      const listOfItems =
        listOfItemsResponse &&
        'subcategoryItems' in listOfItemsResponse &&
        listOfItemsResponse.subcategoryItems;

      return listOfItems;
    }
    case 'categories': {
      const categories = await getCategories();

      return categories;
    }
    default:
      return undefined;
  }
}
