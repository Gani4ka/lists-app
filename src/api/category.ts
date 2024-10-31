'use server';

import { revalidateTag } from 'next/cache';

import type {
  CategoryCreateType,
  CategoryResponse,
  CategoryType,
} from '@app/types/list.types';

import { getUserToken } from './user';

export async function createCategory(
  data: CategoryCreateType
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

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
    return {
      message: result.message,
      category: result.category,
      error: result.error,
    };
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      message: eString,
      category: null,
      error: true,
    };
  }
}

export async function updateCategory(
  data: CategoryType
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

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
    return {
      message: result.message,
      category: result.category,
      error: result.error,
    };
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      message: eString,
      category: null,
      error: true,
    };
  }
}

export async function deleteCategory(id: string): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

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
    return {
      message: result.message,
      category: result.category,
      error: result.error,
    } as CategoryResponse;
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      message: eString,
      category: null,
      error: true,
    };
  }
}
const reloadCategories = async () => {
  revalidateTag('categories');
};
