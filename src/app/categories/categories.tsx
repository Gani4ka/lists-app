import { Suspense } from 'react';

import { getCategories } from '@app/api/fetchData';
import Loader from '@app/components/loader';

import { CategoryCard } from './components/categoryCard';

const Categories = async () => {
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse?.categories;
  return (
    <div>
      <Suspense fallback={<Loader />}>
        {categories &&
          categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
      </Suspense>
    </div>
  );
};

export default Categories;
