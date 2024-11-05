import { Suspense } from 'react';
import { Box } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import { getAllSubcategories } from '@app/api/subcategory';
import AddButton from '@app/components/addButton';
import Loader from '@app/components/loader';
import { PATHS } from '@app/constants/pages';

import AllSubCategoryItems from './AllSubCategoryItems';
import classes from './mainPage.module.css';

export default async function MainPage() {
  const { subcategories, error, message } = await getAllSubcategories();
  const { categories } = await getCategories();

  return (
    <main className={classes.main}>
      <Box p={'4'} className={classes['main-wrapper']}>
        <Suspense fallback={<Loader />}>
          <AllSubCategoryItems
            subcategories={subcategories}
            categories={categories}
          />
          {error && <p className="error-text">{message}</p>}
        </Suspense>
      </Box>
      <AddButton linkTo={PATHS.subcategory} />
    </main>
  );
}
