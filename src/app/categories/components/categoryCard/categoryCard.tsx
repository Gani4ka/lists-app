'use client';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex, Text } from '@radix-ui/themes';

import Link from 'next/link';

import { deleteCategory } from '@app/api/category';
import { CATEGORY_ICONS } from '@app/app/constants';
import { DeleteButton } from '@app/components/deleteButton';
import { useSubCategoryContext } from '@app/contexts/SubCategoryContext';

import { CategoryIconItem } from '../../types';
import classes from './styles.module.css';
import type { CategoryCardProps } from './types';

const defaultIcon = CATEGORY_ICONS[0];

export const CategoryCard = (props: CategoryCardProps) => {
  const { category } = props;
  const { title, icon, color } = category;
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const { setCategoryId } = useSubCategoryContext();
  const url = `/categories/${category._id}`;
  let Icon = null;

  useEffect(() => {
    if (icon) {
      const selectedIcon = CATEGORY_ICONS.find(
        (iconItem) => iconItem.name === icon
      );

      setCategoryIcon(selectedIcon ?? defaultIcon);
    }
  }, [icon]);

  if (categoryIcon?.Icon) {
    Icon = categoryIcon.Icon;
  }

  return (
    <Flex className={classes['main-container']}>
      <Link href={url} className={classes.link}>
        <>
          {Icon && <Icon color={color} className={classes['category-icon']} />}
          <Text className={classes.title}>{title}</Text>
        </>
      </Link>

      <Flex gap={'1rem'} align={'center'}>
        <Button className={classes.button}>
          <Link
            href={`/subcategory`}
            onClick={() => setCategoryId(category._id)}
          >
            <FaPlus className={classes.icon} />
          </Link>
        </Button>
        <Button className={classes.button}>
          <Link href={url}>
            <FaPencilAlt className={classes.icon} />
          </Link>
        </Button>
        <DeleteButton item={category} cb={deleteCategory} />
      </Flex>
    </Flex>
  );
};
