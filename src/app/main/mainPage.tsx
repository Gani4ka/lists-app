import { Box, Flex, Grid } from '@radix-ui/themes';

// import {
//   getCategories,
//   getSubcategories,
//   makeCategoriesReqWithErrCatch,
// } from '@app/api/fetchData';
import { mockListsList } from './_mock_';
import ListCard from './components/listCard';
import styles from './mainPage.module.css';

export default async function MainPage() {
  // const data = await getSubcategories();

  // const data2 = await getCategories();
  // console.log('da', data2);
  // const r = await makeCategoriesReqWithErrCatch();
  // console.log('data', r);

  return (
    <main className={styles.main}>
      <Box p={'4'}>
        <Flex mb={'4'} justify={'end'} className={styles.filter}>
          Sort by
        </Flex>
        <Grid columns="3" gap="3" rows="repeat(auto, auto)" width="auto">
          {mockListsList.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </Grid>
      </Box>
    </main>
  );
}
