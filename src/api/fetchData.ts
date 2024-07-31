import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

export async function getAllSubcategories(): Promise<
  { subcategories: SubcategoriesType[] } | undefined
> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}all-subcategories`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          ContentType: 'application/json',
        },
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function getCategories(): Promise<
  { categories: CategoryType[] } | undefined
> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        ContentType: 'application/json',
      },
    });
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function createCategory(data: CategoryType) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        ContentType: 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateCategory(data: CategoryType) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}categories/${data._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          ContentType: 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}
