import type { CategoryCreateType, CategoryType } from '@app/types/list.types';

export async function createCategory(data: CategoryCreateType) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
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

export async function deleteCategory(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}categories/${id}`,
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
