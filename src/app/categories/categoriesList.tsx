import { Suspense } from 'react';
import { Flex } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import AddButton from '@app/components/addButton';
import Loader from '@app/components/loader';
import { PATHS } from '@app/constants/pages';

import { GoToLoginPage } from '../auth/components/GoToLogin';
import { CategoryCard } from './components/categoryCard';
import classes from './styles.module.css';

const Categories = async () => {
  const { categories, message, error } = await getCategories();

  return (
    <main className={classes.main}>
      <Flex className={classes.wrapper}>
        <Suspense fallback={<Loader />}>
          {categories &&
            categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          {error && <GoToLoginPage message={message} />}
        </Suspense>
      </Flex>
      <AddButton linkTo={PATHS.category} />
    </main>
  );
};

export default Categories;
