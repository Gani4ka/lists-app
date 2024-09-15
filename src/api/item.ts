'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import type { ItemType } from '@app/types/list.types';

export async function getSubcategoryItems(
  id: string
): Promise<{ subcategoryItems: ItemType[] } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/subcategory/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
): Promise<{ item: ItemType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${subCategoryId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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

export async function updateItem(
  subCategoryId: string,
  data: ItemType
): Promise<{ item: ItemType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${subCategoryId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/all-subcategory-items/${subCategoryId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
): Promise<{ item: ItemType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
