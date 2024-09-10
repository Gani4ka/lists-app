'use server';

import type { CategoryCreateType, CategoryType } from '@app/types/list.types';

import { getUserToken } from './user';

export async function createCategory(data: CategoryCreateType) {
  try {
    const token = getUserToken();
    if (token && token) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateCategory(data: CategoryType) {
  try {
    const token = getUserToken();
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteCategory(id: string) {
  try {
    const token = getUserToken();
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}
