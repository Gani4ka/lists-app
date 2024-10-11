'use server';

import { CategoryParamProp } from '@app/app/categories/components/categoryCard/types';
import type { CategoryType } from '@app/types/list.types';

import { getUserToken } from './user';

export async function getCategories(): Promise<CategoryType[] | undefined> {
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
      return categoriesResponse?.categories;
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (e) {
    console.log('error', e);
  }
}
export async function getCategoryById(
  categoryId: CategoryParamProp
): Promise<CategoryType | undefined> {
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

      const categoriesResponse = await res.json();
      return categoriesResponse?.category;
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (e) {
    console.log('error', e);
  }
}
