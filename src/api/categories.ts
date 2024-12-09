'use server';

import { redirect } from 'next/navigation';

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

      if (res.ok) {
        const categoriesResponse = await res.json();
        return {
          message: categoriesResponse.message,
          categories: categoriesResponse?.categories ?? [],
          error: categoriesResponse.error,
        };
      } else if (res.status === 401) {
        redirect('/auth/login');
      } else {
        throw new Error('Error fetching categories');
      }
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

      if (res.ok) {
        const categoryResponse = await res.json();
        return {
          message: categoryResponse.message,
          category: categoryResponse?.category,
          error: categoryResponse.error,
        };
      } else if (res.status === 401) {
        redirect('/auth/login');
      } else {
        throw new Error('Error fetching category');
      }
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
