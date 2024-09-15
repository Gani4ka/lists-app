import type { IconType } from 'react-icons';
import { Flex } from '@radix-ui/themes';

import { getCategories } from '@app/api/categories';
import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';

import CategoryCard from './components';
import type { CategoryProps } from './types';
import { getCategoryByTitle } from './utils';

const Category = async ({ params }: CategoryProps) => {
  const categories = await getCategories();

  const categoryName = params.slug;

  const currentCategory = getCategoryByTitle(categoryName, categories);

  const icons = (await import('react-icons/fc')) as unknown as {
    [key: string]: IconType;
  };
  const Icon =
    (currentCategory && icons[currentCategory.icon]) ||
    icons[DEFAULT_CATEGORY_ICON];

  return (
    <Flex direction={'column'} align={'center'}>
      <CategoryCard category={currentCategory}>
        <Icon />
      </CategoryCard>
    </Flex>
  );
};

export default Category;
