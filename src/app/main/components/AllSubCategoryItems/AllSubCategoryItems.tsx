'use client';
import { useCallback, useMemo, useState } from 'react';
import { Flex, Grid } from '@radix-ui/themes';

import { CategoryIcon } from '@app/components/icon-picker/types';
import { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { CATEGORY_ICONS } from '../../../constants';
import classes from '../../mainPage.module.css';
import { AllSubCategoriesItemsType } from '../../type';
import CustomSelect from '../custom-select';
import {
  categoriesSortingOptions,
  CategoryFilterOption,
  CategorySortingOption,
  DATE_ASC_FILTER,
  DATE_DESC_FILTER,
  NO_CATEGORIES_FILLTER,
  TITLE_ASC_FILTER,
  TITLE_DESC_FILTER,
} from '../custom-select/types';
import ListCard from '../listCard';

export function AllSubCategoryItems({
  subcategories,
  categories,
}: AllSubCategoriesItemsType) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterOption | null>(null);
  const [sorting, setSorting] = useState<CategorySortingOption | null>(null);

  const userCategories = useMemo(() => {
    const userCategoriesList = categories?.map((category: CategoryType) => {
      return { id: category._id, name: category.title };
    });
    userCategoriesList?.unshift(NO_CATEGORIES_FILLTER);
    return userCategoriesList;
  }, [categories]);

  const getSortedItems = useCallback(
    (items: SubcategoriesType[]) => {
      if (sorting) {
        return [...items].sort(
          (itemA: SubcategoriesType, itemB: SubcategoriesType) => {
            if (sorting.name === TITLE_ASC_FILTER) {
              return itemA.title.localeCompare(itemB.title);
            } else if (sorting.name === TITLE_DESC_FILTER) {
              return itemB.title.localeCompare(itemA.title);
            } else if (
              sorting.name === DATE_ASC_FILTER &&
              itemA.createdAt &&
              itemB.createdAt
            ) {
              return +new Date(itemA.createdAt) - +new Date(itemB.createdAt);
            } else if (
              sorting.name === DATE_DESC_FILTER &&
              itemA.createdAt &&
              itemB.createdAt
            ) {
              return +new Date(itemB.createdAt) - +new Date(itemA.createdAt);
            }
            return 0;
          }
        );
      } else {
        return items;
      }
    },
    [sorting]
  );

  const filteredSubCategoryItems = useMemo(() => {
    const filteredSubCategories =
      selectedCategory && selectedCategory.name !== NO_CATEGORIES_FILLTER.name
        ? subcategories.filter(
            (subcategory: SubcategoriesType) =>
              subcategory.categoryId === selectedCategory.id
          )
        : subcategories;
    return getSortedItems(filteredSubCategories);
  }, [getSortedItems, selectedCategory, subcategories]);

  return (
    <>
      <Flex className={classes['filter-sorting']}>
        <CustomSelect
          options={userCategories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          label={'Filter by'}
        />
        <CustomSelect
          options={categoriesSortingOptions}
          value={sorting}
          onChange={setSorting}
          label={'Sort by'}
        />
      </Flex>
      <Grid className={classes.grid}>
        {filteredSubCategoryItems &&
          filteredSubCategoryItems.map((subcategory: SubcategoriesType) => {
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

            const color = currentCategory?.color ?? 'white';
            return (
              <ListCard key={subcategory._id} list={subcategory} color={color}>
                {Icon && <Icon color={'white'} className={classes.icon} />}
              </ListCard>
            );
          })}
      </Grid>
    </>
  );
}
