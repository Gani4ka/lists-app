'use client';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex, Text } from '@radix-ui/themes';

import Link from 'next/link';

import { deleteCategory } from '@app/api/category';
import { categoryIcons } from '@app/app/constants';
import { DeleteButton } from '@app/components/deleteButton';

import { CategoryIconItem } from '../../types';
import classes from './styles.module.css';
import type { CategoryCardProps } from './types';

const defaultIcon = categoryIcons[0];

export const CategoryCard = (props: CategoryCardProps) => {
  const { category } = props;
  const { title, icon, color } = category;
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const url = `/categories/${category._id}`;
  let Icon = null;

  useEffect(() => {
    if (icon) {
      const selectedIcon = categoryIcons.find(
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
          {Icon && <Icon size={25} color={color} />}
          <Text className={classes.title}>{title}</Text>
        </>
      </Link>

      <Flex gap={'1rem'} align={'center'} className={classes.buttons}>
        <Button style={{ width: '24px', height: '24px', padding: '2px' }}>
          <Link href={`/list`}>
            <FaPlus />
          </Link>
        </Button>
        <Button style={{ width: '24px', height: '24px', padding: '2px' }}>
          <Link href={url}>
            <FaPencilAlt />
          </Link>
        </Button>
        <DeleteButton item={category} cb={deleteCategory} />
      </Flex>
    </Flex>
  );
};
