'use client';
import { useCallback, useMemo, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { Flex, Grid } from '@radix-ui/themes';

import { CategoryIcon } from '@app/components/icon-picker/types';
import { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { categoryIcons } from '../constants';
import ListCard from './components/listCard';
import classes from './mainPage.module.css';
import {
  AllSubCategoriesItemsType,
  categoriesSortingTypes,
  UserCategorySortingType,
  UserCategoryType,
} from './type';

const allCategory = { id: '0', category: 'No filter' };

export default function AllSubCategoryItems({
  subcategories,
  categories,
}: AllSubCategoriesItemsType) {
  const [selectedCategory, setSelectedCategory] =
    useState<UserCategoryType | null>(null);

  const [sorting, setSorting] = useState<UserCategorySortingType>();
  const userCategories = useMemo(() => {
    const userCategoriesList = categories.map((category: CategoryType) => {
      return { id: category._id, category: category.title };
    });
    userCategoriesList.unshift(allCategory);
    return userCategoriesList;
  }, [categories]);

  const getSortedItems = useCallback(
    (items: SubcategoriesType[]) => {
      if (sorting) {
        return [...items].sort(
          (itemA: SubcategoriesType, itemB: SubcategoriesType) => {
            if (sorting.sorting === 'title-asc') {
              return itemA.title.localeCompare(itemB.title);
            } else if (sorting.sorting === 'title-desc') {
              return itemB.title.localeCompare(itemA.title);
            } else if (
              sorting.sorting === 'date-asc' &&
              itemA.createdAt &&
              itemB.createdAt
            ) {
              return +new Date(itemA.createdAt) - +new Date(itemB.createdAt);
            } else if (
              sorting.sorting === 'date-desc' &&
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
      selectedCategory && selectedCategory.category !== allCategory.category
        ? subcategories.filter(
            (subcategory: SubcategoriesType) =>
              subcategory.categoryId === selectedCategory.id
          )
        : subcategories;
    return getSortedItems(filteredSubCategories);
  }, [getSortedItems, selectedCategory, subcategories]);

  return (
    <>
      <Flex className={classes.filterSorting}>
        <Flex className={classes.select}>
          <Label.Root>Filter by category</Label.Root>
          <Select.Root
            value={selectedCategory?.id.toString()}
            onValueChange={(value) => {
              const selected = userCategories?.find(
                (option) => option.id.toString() === value
              );
              if (selected) setSelectedCategory(selected);
            }}
          >
            <Select.Trigger className={classes.selectOption}>
              <Select.Value placeholder="Select category" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className={classes.selectContent}>
              <Select.Viewport>
                {userCategories?.map((option) => (
                  <Select.Item key={option.id} value={option.id.toString()}>
                    <Select.ItemText>{option.category}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex className={classes.sorting}>
          <Label.Root>Sort by </Label.Root>
          <Select.Root
            value={sorting?.id.toString()}
            onValueChange={(value) => {
              const selected = categoriesSortingTypes?.find(
                (option) => option.id.toString() === value
              );
              if (selected) setSorting(selected);
            }}
          >
            <Select.Trigger className={classes.selectOption}>
              <Select.Value placeholder="Select Sorting" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className={classes.selectContent}>
              <Select.Viewport>
                {categoriesSortingTypes?.map((option) => (
                  <Select.Item key={option.id} value={option.id.toString()}>
                    <Select.ItemText>{option.sorting}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
      <Grid className={classes.grid}>
        {filteredSubCategoryItems &&
          filteredSubCategoryItems.map((subcategory: SubcategoriesType) => {
            let Icon = null;

            const currentCategory = categories.find(
              (category: CategoryType) =>
                category._id === subcategory.categoryId
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
              <ListCard key={subcategory._id} list={subcategory} color={color}>
                {Icon && <Icon color={'white'} className={classes.icon} />}
              </ListCard>
            );
          })}
      </Grid>
    </>
  );
}
