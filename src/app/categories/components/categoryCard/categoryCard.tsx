import type { IconType } from 'react-icons';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex } from '@radix-ui/themes';

import { headers } from 'next/headers';
import Link from 'next/link';

import { DeleteButton } from '../deleteButton';
import classes from './classes.module.css';
import type { CategoryCardProps } from './types';

export const CategoryCard = async (props: CategoryCardProps) => {
  const { category } = props;
  const { title, icon } = category;

  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';

  const icons = (await import('react-icons/fc')) as unknown as {
    [key: string]: IconType;
  };
  const Icon = icons[icon] || icons['FcLikePlaceholder'];
  const formattedTitle = title.replace(/\s+/g, '-');
  const url = `${protocol}://${host}/category/${formattedTitle}`;

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
        <Link href={url} className={classes.link}>
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
          <Link href={url}>
            <FaPencilAlt />
          </Link>
        </Button>
        <DeleteButton category={category} />
      </Flex>
    </Flex>
  );
};
