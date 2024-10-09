import { Suspense } from 'react';
import type { IconType } from 'react-icons';
import { Box, Flex, Grid } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import { getAllSubcategories } from '@app/api/subcategory';
import AddButton from '@app/components/addButton';
import Loader from '@app/components/loader';
import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';
import { PATHS } from '@app/constants/pages';

import ListCard from './components/listCard';
import styles from './mainPage.module.css';
import { getCategoriesColor, getCategoryIcon } from './utils';

export default async function MainPage() {
  const subcategoriesResponse = await getAllSubcategories();
  const categories = await getCategories();

  const subcategories = subcategoriesResponse?.subcategories;

  const icons = (await import('react-icons/fc')) as unknown as {
    [key: string]: IconType;
  };

  return (
    <main className={styles.main}>
      <Box p={'4'}>
        <Flex mb={'4'} justify={'end'} className={styles.filter}>
          Sort by
        </Flex>
        <Suspense fallback={<Loader />}>
          <Grid columns="3" gap="3" rows="repeat(auto, auto)" width="auto">
            {subcategories &&
              categories &&
              subcategories.map((list) => {
                const icon = getCategoryIcon(list.categoryId, categories);
                const Icon = icons[icon] || icons[DEFAULT_CATEGORY_ICON];
                const color = getCategoriesColor(list.categoryId, categories);
                return (
                  <ListCard key={list._id} list={list} color={color}>
                    <Icon />
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
