import { Suspense } from 'react';
import { Box, Flex, Grid } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import { getAllSubcategories } from '@app/api/subcategory';
import AddButton from '@app/components/addButton';
import { CategoryIcon } from '@app/components/icon-picker/types';
import Loader from '@app/components/loader';
import { PATHS } from '@app/constants/pages';
import { CategoryType } from '@app/types/list.types';

import { categoryIcons } from '../constants';
import ListCard from './components/listCard';
import classes from './mainPage.module.css';

export default async function MainPage() {
  const subcategoriesResponse = await getAllSubcategories();
  const { categories } = await getCategories();

  const subcategories = subcategoriesResponse?.subcategories;

  return (
    <main className={classes.main}>
      <Box p={'4'} className={classes['main-wrapper']}>
        <Suspense fallback={<Loader />}>
          <Flex mb={'4'} justify={'end'} className={classes.filter}>
            Sort by
          </Flex>
          <Grid className={classes.grid}>
            {subcategories &&
              categories &&
              subcategories.map((list) => {
                let Icon = null;

                const currentCategory = categories.find(
                  (category: CategoryType) => category._id === list.categoryId
                );
                const userIcon =
                  categoryIcons.find(
                    (icon: CategoryIcon) => icon.name === currentCategory?.icon
                  ) ?? categoryIcons[0];
                if (userIcon) {
                  Icon = userIcon.Icon;
                }

                const color = currentCategory?.color ?? 'white';
                return (
                  <ListCard key={list._id} list={list} color={color}>
                    {Icon && (
                      <Icon
                        size={20}
                        color={'white'}
                        // style={{
                        //   marginTop: '20px',
                        // }}
                      />
                    )}
                  </ListCard>
                );
              })}
          </Grid>
        </Suspense>
      </Box>
      <AddButton linkTo={PATHS.list} />
    </main>
  );
}
