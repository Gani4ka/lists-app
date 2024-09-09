import { cookies } from 'next/headers';

import type { CategoryType } from '@app/types/list.types';

export async function getCategories(): Promise<
  { categories: CategoryType[] } | undefined
> {
  try {
    const token = cookies().get('token');
    if (token && token.value) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      return res.json();
    } else {
      throw new Error('Token is not found/valid. Try loging in again');
    }
  } catch (e) {
    console.log('error', e);
  }
}
