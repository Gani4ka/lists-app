import { Suspense } from 'react';
import { Flex } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import Loader from '@app/components/loader';

import { CategoryCard } from './components/categoryCard';
import classes from './styles.module.css';

const Categories = async () => {
  const categories = await getCategories();

  return (
    <main className={classes.main}>
      <Flex className={classes.wrapper}>
        <Suspense fallback={<Loader />}>
          {categories &&
            categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
        </Suspense>
      </Flex>
    </main>
  );
};

export default Categories;
