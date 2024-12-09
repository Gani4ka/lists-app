'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type {
  CategoryCreateType,
  CategoryResponse,
  CategoryType,
} from '@app/types/list.types';
import { getBackendUrl } from '@app/utils/getBackendUrl';

import { getUserToken } from './user';
const backendUrl = getBackendUrl();

export async function createCategory(
  data: CategoryCreateType
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      await reloadCategories();
      return {
        message: result.message,
        category: result.category,
        error: result.error,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error creating category');
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

export async function updateCategory(
  data: CategoryType
): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}categories/${data._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      await reloadCategories();
      return {
        message: result.message,
        category: result.category,
        error: result.error,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error updating category');
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

export async function deleteCategory(id: string): Promise<CategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const result = await res.json();
      await reloadCategories();
      return {
        message: result.message,
        category: result.category,
        error: result.error,
      } as CategoryResponse;
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error deleting category');
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
const reloadCategories = async () => {
  revalidateTag('categories');
};
