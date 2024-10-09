'use server';

import { revalidateTag } from 'next/cache';

import type { CategoryCreateType, CategoryType } from '@app/types/list.types';

import { getUserToken } from './user';

export async function createCategory(data: CategoryCreateType) {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      await reloadCategories();
      return result;
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateCategory(data: CategoryType) {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}categories/${data._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      await reloadCategories();
      return result;
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteCategory(id: string) {
  try {
    const token = await getUserToken();
    if (token) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await res.json();
      await reloadCategories();
      return result;
    }
  } catch (e) {
    console.log('error', e);
  }
}
const reloadCategories = async () => {
  revalidateTag('categories');
};
