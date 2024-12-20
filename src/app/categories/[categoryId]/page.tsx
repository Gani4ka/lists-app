'use server';
import { notFound } from 'next/navigation';

import { getCategoryById } from '@app/api/categories';
import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';

import AddEditCategory from '../components/AddEditCategory';
import { CategoryParamProp } from '../components/categoryCard/types';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: CategoryParamProp };
}) {
  const { categoryId } = params;

  if (categoryId) {
    const { category, error, message } = await getCategoryById(categoryId);
    if (category) return <AddEditCategory category={category} />;
    if (error) {
      return <GoToLoginPage message={message} />;
    }
  }

  notFound();
}
