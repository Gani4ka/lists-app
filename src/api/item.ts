import type { ItemType } from '@app/types/list.types';

export async function createItem(
  subCategoryId: string,
  data: ItemType
): Promise<{ item: ItemType } | undefined> {
  try {
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
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateItem(
  subCategoryId: string,
  data: ItemType
): Promise<{ item: ItemType } | undefined> {
  try {
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
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateItemMany(
  subCategoryId: string,
  data: ItemType[]
): Promise<{ items: ItemType[] } | undefined> {
  try {
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
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}

export async function deleteItem(
  itemId: string
): Promise<{ item: ItemType } | undefined> {
  try {
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
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}
