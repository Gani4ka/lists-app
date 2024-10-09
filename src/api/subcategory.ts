'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import type { SubcategoriesType } from '@app/types/list.types';

export async function getAllSubcategories(): Promise<
  { subcategories: SubcategoriesType[] } | undefined
> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}all-subcategories`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          next: { tags: ['subcategory'] },
        }
      );
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function getSubcategory(
  id: string
): Promise<{ subcategory: SubcategoriesType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          next: { tags: ['subcategory'] },
        }
      );
      return await res.json();
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function createSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<{ subcategoryItem: SubcategoriesType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      revalidateTag('subcategory');
      return result;
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<{ subcategoryItem: SubcategoriesType } | undefined> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      revalidateTag('subcategory');
      return result;
    }
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteSubcategory(id: string): Promise<void> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      });
      revalidateTag('subcategory');
    }
  } catch (e) {
    console.log('error', e);
  }
}
