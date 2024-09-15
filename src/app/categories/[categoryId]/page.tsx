import { getCategoryById } from '@app/api/categories';

import { CategoryParamProp } from '../components/categoryCard/types';
import AddEditCategory from './AddEditCategory';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: CategoryParamProp };
}) {
  const { categoryId } = params;
  if (categoryId) {
    const category = await getCategoryById(categoryId);
    if (category) return <AddEditCategory category={category} />;
  }
  //TO DO: show error page
  return <p>Error occured. Category is not found or not valid</p>;
}