'use server';

import { revalidateTag } from 'next/cache';

import { USER_TOKEN_ERROR } from '@app/app/constants';
import type {
  SubCategoryItemResponse,
  SubCategoryItemsResponse,
  SubCategoryItemType,
  SubCategoryManyItemsResponse,
} from '@app/types/list.types';
import { getBackendUrl } from '@app/utils/getBackendUrl';

import { getUserToken } from './user';
const backendUrl = getBackendUrl();

export async function getSubcategoryItems(
  id: string
): Promise<SubCategoryItemsResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(
      `${backendUrl}subcategory-items/subcategory/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { tags: ['items'] },
      }
    );
    if (res.ok) {
      const result = await res.json();
      return {
        error: result.error,
        subcategoryItems: result.subcategoryItems,
        message: result.message,
      };
    } else if (res.status === 401) {
      return {
        message: USER_TOKEN_ERROR,
        subcategoryItems: [],
        error: true,
      };
    } else {
      throw new Error('Error creating subcategory item');
    }
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

    const res = await fetch(`${backendUrl}subcategory-items/${subCategoryId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const response = await res.json();
      revalidateTag('items');
      return {
        error: response.error,
        subcategoryItem: response.subcategoryItem,
        message: response.message,
      };
    } else if (res.status === 401) {
      return {
        message: USER_TOKEN_ERROR,
        subcategoryItem: null,
        error: true,
      };
    } else {
      throw new Error('Error creating subcategory item');
    }
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

    const res = await fetch(`${backendUrl}subcategory-items/${subCategoryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      revalidateTag('items');
      const response = await res.json();
      return {
        error: response.error,
        subcategoryItem: response.subcategoryItem,
        message: response.message,
      };
    } else if (res.status === 401) {
      return {
        message: USER_TOKEN_ERROR,
        subcategoryItem: null,
        error: true,
      };
    } else {
      throw new Error('Error updating subcategory item');
    }
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
      `${backendUrl}subcategory-items/all-subcategory-items/${subCategoryId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      revalidateTag('items');
      const response = await res.json();
      return {
        error: response.error,
        subcategoryItems: response.subcategoryItems,
        subcategoryItemsFailed: response.subcategoryItemsFailed ?? [],
        message: response.message,
      };
    } else if (res.status === 401) {
      return {
        message: USER_TOKEN_ERROR,
        subcategoryItems: [],
        error: true,
      };
    } else {
      throw new Error('Error updating subcategory items');
    }
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

    const res = await fetch(`${backendUrl}subcategory-items/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      revalidateTag('items');
      const response = await res.json();
      return {
        error: response.error,
        subcategoryItem: response.subcategoryItem,
        message: response.message,
      };
    } else if (res.status === 401) {
      return {
        message: USER_TOKEN_ERROR,
        subcategoryItem: null,
        error: true,
      };
    } else {
      throw new Error('Error deleting subcategory item');
    }
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
