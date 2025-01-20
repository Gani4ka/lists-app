import { getCategories } from '@app/api/categories';
import { getAllSubcategories } from '@app/api/subcategory';

import ArchivedSubcategories from './ArchivedSubcategories';

export default async function ArchivedSubcatgoriesPage() {
  const { categories } = await getCategories();
  const { subcategories } = await getAllSubcategories(true);
  return (
    <ArchivedSubcategories
      subcategories={subcategories}
      categories={categories}
    />
  );
}
