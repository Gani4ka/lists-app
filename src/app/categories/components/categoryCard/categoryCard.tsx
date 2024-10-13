'use client';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex, Text } from '@radix-ui/themes';

import Link from 'next/link';

import { categoryIcons } from '@app/app/constants';

import { CategoryIconItem } from '../../types';
import { DeleteButton } from '../deleteButton';
import classes from './classes.module.css';
import type { CategoryCardProps } from './types';
const defaultIcon = categoryIcons[0];

export const CategoryCard = async (props: CategoryCardProps) => {
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
    <Flex
      className={classes['main-container']}
      align="center"
      justify="between"
      wrap="nowrap"
    >
      <Link href={url} className={classes.title}>
        <Flex
          direction={'row'}
          justify={'between'}
          align={'center'}
          style={{ width: '100%' }}
          gap={'1rem'}
        >
          {Icon && <Icon size={25} color={color} />}
          <Text>{title}</Text>
        </Flex>
      </Link>

      <Flex gap={'1rem'} align={'center'} className={classes.buttons}>
        <Button>
          <FaPlus />
        </Button>
        <Button>
          <Link href={url}>
            <FaPencilAlt />
          </Link>
        </Button>
        <DeleteButton category={category} />
      </Flex>
    </Flex>
  );
};
