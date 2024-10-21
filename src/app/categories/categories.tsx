import { Suspense } from 'react';
import { Flex } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import Loader from '@app/components/loader';
import { CategoryType } from '@app/types/list.types';

import { CategoryCard } from './components/categoryCard';

const Categories = async () => {
  const { categories } = await getCategories();

  return (
    <Flex direction={'column'} align={'center'}>
      <Suspense fallback={<Loader />}>
        {categories &&
          categories.map((category: CategoryType) => (
            <CategoryCard key={category._id} category={category} />
          ))}
      </Suspense>
    </Flex>
  );
};

export default Categories;
