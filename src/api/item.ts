'use server';

import { revalidateTag } from 'next/cache';

import type {
  SubCategoryItemResponse,
  SubCategoryItemsResponse,
  SubCategoryItemType,
  SubCategoryManyItemsResponse,
} from '@app/types/list.types';

import { getUserToken } from './user';

export async function getSubcategoryItems(
  id: string
): Promise<SubCategoryItemsResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/subcategory/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { tags: ['items'] },
      }
    );
    const result = await res.json();
    return {
      error: result.error,
      subcategoryItems: result.subcategoryItems,
      message: result.message,
    };
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      error: true,
      subcategoryItems: [],
      message: eString,
    };
  }
}

export async function createSubCategoryItem(
  subCategoryId: string,
  data: SubCategoryItemType
): Promise<SubCategoryItemResponse> {
  try {
    const token = await getUserToken();
    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${subCategoryId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    if (res.ok) revalidateTag('items');

    return {
      error: response.error,
      subcategoryItem: response.subcategoryItem,
      message: response.message,
    };
  } catch (error) {
    console.error('error', error);
    const eString = JSON.stringify(error);

    return {
      error: true,
      subcategoryItem: null,
      message: eString,
    };
  }
}

export async function updateItem(
  subCategoryId: string,
  data: SubCategoryItemType
): Promise<SubCategoryItemResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${subCategoryId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag('items');
    const response = await res.json();
    return {
      error: response.error,
      subcategoryItem: response.subcategoryItem,
      message: response.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);

    return {
      error: true,
      subcategoryItem: null,
      message: eString,
    };
  }
}

export async function updateItemMany(
  subCategoryId: string,
  data: SubCategoryItemType[]
): Promise<SubCategoryManyItemsResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/all-subcategory-items/${subCategoryId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag('items');
    const response = await res.json();
    return {
      error: response.error,
      subcategoryItems: response.subcategoryItems,
      subcategoryItemsFailed: response.subcategoryItemsFailed ?? [],
      message: response.message,
    };
  } catch (error) {
    const eString = JSON.stringify(error);

    return {
      error: true,
      subcategoryItems: [],
      subcategoryItemsFailed: [],
      message: eString,
    } as SubCategoryManyItemsResponse;
  }
}

export async function deleteItem(
  itemId: string
): Promise<SubCategoryItemResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    revalidateTag('items');
    const response = await res.json();
    return {
      error: response.error,
      subcategoryItem: response.subcategoryItem,
      message: response.message,
    };
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);

    return {
      error: true,
      subcategoryItem: null,
      message: eString,
    };
  }
}
