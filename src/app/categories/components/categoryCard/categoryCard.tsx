'use client';

import type { IconType } from 'react-icons';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex, Text } from '@radix-ui/themes';

import Link from 'next/link';

import { deleteCategory } from '@app/api/category';
import { DeleteButton } from '@app/components/deleteButton';

import classes from './classes.module.css';
import type { CategoryCardProps } from './types';

export const CategoryCard = async (props: CategoryCardProps) => {
  const { category } = props;
  const { title, icon } = category;

  const icons = (await import('react-icons/fc')) as unknown as {
    [key: string]: IconType;
  };
  const Icon = icons[icon] || icons['FcLikePlaceholder'];
  const url = `/categories/${category._id}`;
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
          <Icon />
          <Text>{title}</Text>
        </Flex>
      </Link>

      <Flex gap={'1rem'} align={'center'} className={classes.buttons}>
        <Button style={{ width: '24px', height: '24px', padding: '2px' }}>
          <FaPlus />
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
