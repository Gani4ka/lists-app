'use server';

import { CategoryParamProp } from '@app/app/categories/components/categoryCard/types';
import type {
  CategoriesResponse,
  CategoryResponse,
} from '@app/types/list.types';

import { getUserToken } from './user';

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
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
      } as CategoriesResponse;
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (error) {
    return {
      message: error,
      categories: [],
      error: error,
    } as CategoriesResponse;
  }
}
export async function getCategoryById(
  categoryId: CategoryParamProp
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}categories/${categoryId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      const categoryResponse = await res.json();
      return {
        message: categoryResponse.message,
        category: categoryResponse?.category,
        error: categoryResponse.error,
      } as CategoryResponse;
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (error) {
    return {
      message: error,
      category: null,
      error: error,
    } as CategoryResponse;
  }
}
