'use server';
import { notFound } from 'next/navigation';

import { getCategoryById } from '@app/api/categories';
import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';
import { USER_TOKEN_ERROR } from '@app/app/constants';

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
      return message === USER_TOKEN_ERROR ? (
        <GoToLoginPage message={message} />
      ) : (
        <p className="error-text">{message}</p>
      );
    }
  }

  notFound();
}
