'use server';

import { revalidateTag } from 'next/cache';

import type {
  SubCategoriesResponse,
  SubcategoriesType,
  SubCategoryResponse,
} from '@app/types/list.types';

import { getUserToken } from './user';

export async function getAllSubcategories(): Promise<SubCategoriesResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}all-subcategories`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { tags: ['subcategory'] },
      }
    );
    const result = await res.json();

    return {
      error: result.error,
      subcategories: result.subcategories,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategories: [],
      message: eString,
    };
  }
}

export async function getSubcategory(id: string): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { tags: ['subcategory'] },
      }
    );
    const result = await res.json();
    return {
      error: result.error,
      subcategory: result.subcategory,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function createSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    revalidateTag('subcategory');

    return {
      error: result.error,
      subcategory: result.subcategory,
      message: result.message,
    };
  } catch (error) {
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function updateSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
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
    revalidateTag('subcategory');
    return {
      error: result.error,
      subcategory: result.subcategory,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function deleteSubcategory(
  id: string
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    revalidateTag('subcategory');
    const response = await result.json();
    return {
      error: response.error,
      subcategory: response.subcategory,
      message: response.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}
