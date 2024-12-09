'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type {
  SubCategoriesResponse,
  SubcategoriesType,
  SubCategoryResponse,
} from '@app/types/list.types';
import { getBackendUrl } from '@app/utils/getBackendUrl';

import { getUserToken } from './user';
const backendUrl = getBackendUrl();

export async function getAllSubcategories(): Promise<SubCategoriesResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}all-subcategories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { tags: ['subcategory'] },
    });
    if (res.ok) {
      const result = await res.json();

      return {
        error: result.error,
        subcategories: result.subcategories,
        message: result.message,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error fetching subcategories');
    }
  } catch (error) {
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategories: [],
      message: eString,
    };
  }
}

export async function getSubcategory(id: string): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}subcategories/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { tags: ['subcategory'] },
    });
    if (res.ok) {
      const result = await res.json();
      return {
        error: result.error,
        subcategory: result.subcategory,
        message: result.message,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error fetching subcategory');
    }
  } catch (error) {
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function createSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}subcategories/${categoryId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      revalidateTag('subcategory');
      return {
        error: result.error,
        subcategory: result.subcategory,
        message: result.message,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error creating subcategory');
    }
  } catch (error) {
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function updateSubcategory(
  categoryId: string,
  data: SubcategoriesType
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const res = await fetch(`${backendUrl}subcategories/${categoryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      revalidateTag('subcategory');
      return {
        error: result.error,
        subcategory: result.subcategory,
        message: result.message,
      };
    } else if (res.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error updating subcategory');
    }
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}

export async function deleteSubcategory(
  id: string
): Promise<SubCategoryResponse> {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error('Token is not found/valid. Try loging in again');
    }

    const result = await fetch(`${backendUrl}subcategories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (result.ok) {
      revalidateTag('subcategory');
      const response = await result.json();
      return {
        error: response.error,
        subcategory: response.subcategory,
        message: response.message,
      };
    } else if (result.status === 401) {
      redirect('/auth/login');
    } else {
      throw new Error('Error deleting subcategory');
    }
  } catch (error) {
    console.log('error', error);
    const eString = JSON.stringify(error);
    return {
      error: true,
      subcategory: null,
      message: eString,
    };
  }
}
