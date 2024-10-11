'use server';

import { revalidateTag } from 'next/cache';

import type { ItemType } from '@app/types/list.types';

import { getUserToken } from './user';

export async function getSubcategoryItems(
  id: string
): Promise<{ subcategoryItems: ItemType[] } | undefined> {
  try {
    const token = await getUserToken();
    if (token) {
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function createItem(
  subCategoryId: string,
  data: ItemType
): Promise<{ subcategoryItem: ItemType } | { error: string }> {
  try {
    const token = await getUserToken();
    if (!token) {
      throw new Error('Not authorized');
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

    return response;
  } catch (e) {
    console.error('error', e);
    return { error: String(e) };
  }
}

export async function updateItem(
  subCategoryId: string,
  data: ItemType
): Promise<{ subcategoryItem: ItemType } | undefined> {
  try {
    const token = await getUserToken();
    if (token) {
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateItemMany(
  subCategoryId: string,
  data: ItemType[]
): Promise<{ items: ItemType[] } | undefined> {
  try {
    const token = await getUserToken();
    if (token) {
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteItem(
  itemId: string
): Promise<{ subcategoryItem: ItemType } | undefined> {
  try {
    const token = await getUserToken();
    if (token) {
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
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}
