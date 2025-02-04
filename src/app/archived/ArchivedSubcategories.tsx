import { Flex, Grid, Heading } from '@radix-ui/themes';

import { CategoryIcon } from '@app/components/icon-picker/types';
import { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { CATEGORY_ICONS } from '../constants';
import ListCard from '../main/components/listCard';
import classes from '../main/mainPage.module.css';
import { AllSubCategoriesItemsType } from '../main/type';
import styles from './archive.module.css';
const ArchivedSubcategories = ({
  subcategories,
  categories,
}: AllSubCategoriesItemsType) => {
  return (
    <Flex key={'archive'} direction={'column'}>
      <Heading as={'h3'} className={styles.heading}>
        You have {subcategories.length} archived lists:
      </Heading>
      <Grid className={classes.grid}>
        {subcategories &&
          subcategories.map((subcategory: SubcategoriesType) => {
            let Icon = null;

            const currentCategory = categories?.find(
              (category: CategoryType) =>
                category._id === subcategory.categoryId
            );
            const userIcon =
              CATEGORY_ICONS.find(
                (icon: CategoryIcon) => icon.name === currentCategory?.icon
              ) ?? CATEGORY_ICONS[0];
            if (userIcon) {
              Icon = userIcon.Icon;
            }

            return (
              <ListCard key={subcategory._id} list={subcategory} color={'grey'}>
                {Icon && <Icon color={'white'} className={classes.icon} />}
              </ListCard>
            );
          })}
      </Grid>
    </Flex>
  );
};
export default ArchivedSubcategories;
