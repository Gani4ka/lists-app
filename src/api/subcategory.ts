import type { ItemType, SubcategoriesType } from '@app/types/list.types';

export async function getSubcategoryItems(
  id: string
): Promise<{ subcategoryItems: ItemType[] } | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategory-items/subcategory/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

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
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function createSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<{ subcategoryItem: SubcategoriesType } | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<{ subcategoryItem: SubcategoriesType } | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${categoryId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteSubcategory(id: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log('error', e);
  }
}

export async function getSubcategory(
  id: string
): Promise<{ subcategory: SubcategoriesType } | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}subcategories/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}
