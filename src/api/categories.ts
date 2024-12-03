'use server';

import { CategoryParamProp } from '@app/app/categories/components/categoryCard/types';
import type {
  CategoriesResponse,
  CategoryResponse,
} from '@app/types/list.types';
import { getBackendUrl } from '@app/utils/getBackendUrl';

import { getUserToken } from './user';
const backendUrl = getBackendUrl();

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(`${backendUrl}categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const categoriesResponse = await res.json();
      return {
        message: categoriesResponse.message,
        categories: categoriesResponse?.categories,
        error: categoriesResponse.error,
      };
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      message: eString,
      categories: [],
      error: true,
    };
  }
}
export async function getCategoryById(
  categoryId: CategoryParamProp
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(`${backendUrl}categories/${categoryId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const categoryResponse = await res.json();
      return {
        message: categoryResponse.message,
        category: categoryResponse?.category,
        error: categoryResponse.error,
      };
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      message: eString,
      category: null,
      error: true,
    };
  }
}
