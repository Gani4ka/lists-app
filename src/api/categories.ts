import type { CategoryType } from '@app/types/list.types';

export async function getCategories(): Promise<
  { categories: CategoryType[] } | undefined
> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    return res.json();
  } catch (e) {
    console.log('error', e);
  }
}
