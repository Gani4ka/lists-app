'use server';
import { notFound } from 'next/navigation';

import { getCategoryById } from '@app/api/categories';

import AddEditCategory from '../components/AddInitCategory';
import { CategoryParamProp } from '../components/categoryCard/types';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: CategoryParamProp };
}) {
  const { categoryId } = params;

  if (categoryId) {
    const { category } = await getCategoryById(categoryId);
    if (category) return <AddEditCategory category={category} />;
  }

  notFound();
}
