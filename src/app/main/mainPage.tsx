import { Suspense } from 'react';
import { Box } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import { getAllSubcategories } from '@app/api/subcategory';
import AddButton from '@app/components/addButton';
import Loader from '@app/components/loader';
import { PATHS } from '@app/constants/pages';

import { GoToLoginPage } from '../auth/components/GoToLogin';
import { USER_TOKEN_ERROR } from '../constants';
import { AllSubCategoryItems } from './components/AllSubCategoryItems';
import classes from './mainPage.module.css';

export default async function MainPage() {
  const {
    subcategories,
    error: subcategoriesError,
    message,
  } = await getAllSubcategories();
  const {
    categories,
    error: categoriesError,
    message: categoriesMessage,
  } = await getCategories();
  const errorMessage = message ?? categoriesMessage;
  const error = subcategoriesError || categoriesError;
  return (
    <main className={classes.main}>
      <Box p={'4'} className={classes['main-wrapper']}>
        <Suspense fallback={<Loader />}>
          {error &&
            (errorMessage === USER_TOKEN_ERROR ? (
              <GoToLoginPage message={message} />
            ) : (
              <p className="error-text">{errorMessage}</p>
            ))}
          {!error && (
            <AllSubCategoryItems
              subcategories={subcategories}
              categories={categories}
            />
          )}
        </Suspense>
      </Box>
      <AddButton linkTo={PATHS.subcategory} />
    </main>
  );
}
