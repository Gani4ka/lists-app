import type { IconType } from 'react-icons';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Button, Flex } from '@radix-ui/themes';

import Link from 'next/link';

import classes from './classes.module.css';
import type { CategoryCardProps } from './types';

export const CategoryCard = async (props: CategoryCardProps) => {
  const { category } = props;
  const { title, icon } = category;

  const icons = (await import('react-icons/fc')) as unknown as {
    [key: string]: IconType;
  };
  const Icon = icons[icon] || icons['FcLikePlaceholder'];

  return (
    <Flex
      className="category-card"
      align="center"
      justify="between"
      wrap="nowrap"
    >
      <Flex
        className="category-card"
        align="center"
        justify="between"
        wrap="nowrap"
      >
        <Link href={`/category/${title}`} className={classes.link}>
          <div>
            <Icon />
          </div>
          <div>{title}</div>
        </Link>
      </Flex>
      <Flex>
        <Button>
          <FaPlus />
        </Button>
        <Button>
          <FaPencilAlt />
        </Button>
        <Button>
          <RiDeleteBinLine />
        </Button>
      </Flex>
    </Flex>
  );
};
