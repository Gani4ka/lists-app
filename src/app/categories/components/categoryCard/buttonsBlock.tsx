'use client';

import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Button, Flex, Link } from '@radix-ui/themes';

import { deleteCategory } from '@app/api/category';
import { DeleteButton } from '@app/components/deleteButton';
import type { CategoryType } from '@app/types/list.types';

interface ButtonsBlockProps {
  category: CategoryType;
  url: string;
}

export const ButtonsBlock = ({ category, url }: ButtonsBlockProps) => {
  return (
    <Flex>
      <Button>
        <FaPlus />
      </Button>
      <Button>
        <Link href={url}>
          <FaPencilAlt />
        </Link>
      </Button>
      <DeleteButton item={category} cb={deleteCategory} />
    </Flex>
  );
};
