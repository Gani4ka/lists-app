'use client';
import { useEffect, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Grid } from '@radix-ui/themes';

import { CategoryIcon } from '@app/components/icon-picker/types';
import { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { categoryIcons } from '../constants';
import ListCard from './components/listCard';
import classes from './mainPage.module.css';
import { AllSubCategoriesItemsType, UserCategoryType } from './type';

export default function AllSubCategoryItems({
  subcategories,
  categories,
}: AllSubCategoriesItemsType) {
  const [selectedCategory, setSelectedCategory] =
    useState<UserCategoryType | null>(null);
  const [userCategories, setUserCategories] = useState<UserCategoryType[]>();
  const [filteredSubCategoryItems, setFilteredSubCategoryItems] = useState<
    SubcategoriesType[]
  >([]);
  useEffect(() => {
    const userCat = categories.map((category) => {
      return { id: category._id, category: category.title };
    });

    setUserCategories(userCat);
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.categoryId === selectedCategory.id
      );
      setFilteredSubCategoryItems(filtered);
    } else {
      setFilteredSubCategoryItems(subcategories);
    }
  }, [selectedCategory]);
  return (
    <>
      <Select.Root
        value={selectedCategory?.id.toString()}
        onValueChange={(value) => {
          const selected = userCategories?.find(
            (option) => option.id.toString() === value
          );
          if (selected) setSelectedCategory(selected);
        }}
      >
        <Select.Trigger className="SelectTrigger">
          <Select.Value placeholder="Select an option" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className="SelectContent">
          <Select.Viewport>
            {userCategories?.map((option) => (
              <Select.Item
                key={option.id}
                value={option.id.toString()}
                className="SelectItem"
              >
                <Select.ItemText>{option.category}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
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
