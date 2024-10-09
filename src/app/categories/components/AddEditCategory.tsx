'use client';

import { useEffect, useState } from 'react';
import { FaBasketShopping, FaBook, FaListCheck } from 'react-icons/fa6';
import { PiAirplaneTiltFill } from 'react-icons/pi';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { createCategory, updateCategory } from '@app/api/category';
import ColorPicker from '@app/components/color-picker/ColorPicker';
import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';
import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import classes from '../category.module.css';
import { CategoryIconItem } from '../types';
import { AddEditProps } from './categoryCard/types';

export const categoryIcons: CategoryIconItem[] = [
  { id: 1, name: 'shopping', Icon: FaBasketShopping },
  { id: 2, name: 'book', Icon: FaBook },
  { id: 3, name: 'list', Icon: FaListCheck },
  { id: 4, name: 'travel', Icon: PiAirplaneTiltFill },
];

const AddEditCategory = ({ category }: AddEditProps) => {
  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [categoryIcon, setCategoryIcon] = useState<CategoryIconItem>();
  const [categoryColor, setCategoryColor] = useState<string>('');

  const router = useRouter();

  let Icon = null;

  useEffect(() => {
    if (category) {
      setCategoryTitle(category.title);
      const selectedIcon =
        categoryIcons.find(
          (icon: CategoryIconItem) => icon.name === category.icon
        ) ?? categoryIcons[2];
      setCategoryIcon(selectedIcon);
      setCategoryColor(category.color ?? setRandomIconColor());
    }
  }, [category]);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    try {
      let message = '';
      let requestResult = null;
      if (category && categoryTitle) {
        requestResult = await updateCategory({
          _id: category._id,
          title: categoryTitle,
          icon: categoryIcon?.name || DEFAULT_CATEGORY_ICON,
          color: categoryColor || setRandomIconColor(),
        });
        message = 'Category updated';
      } else {
        requestResult = await createCategory({
          title: categoryTitle || '',
          icon: categoryIcon?.name || DEFAULT_CATEGORY_ICON,
          color: categoryColor ?? setRandomIconColor(),
        });
        message = 'Category created';
      }
      if (requestResult && requestResult.error) {
        message = requestResult.error;
      }
      alert(message);
      handleCancel();
    } catch (error) {
      console.error('Error updating/creating category', error);
      alert('Error updating/creating category');
    }
  };

  // function editIcon() {
  //   //TODO - add icon picker
  //   // setNewIcon(category?.icon);
  // }
  if (categoryIcon?.Icon) {
    Icon = categoryIcon.Icon;
  }

  return (
    <Flex
      direction={'column'}
      gap={'1rem'}
      align={'center'}
      className={classes.category}
    >
      <Heading as="h6" className={classes.header}>
        {category ? 'Update category' : 'Create category'}
      </Heading>

      {Icon && <Icon size={40} color={categoryColor ?? 'red'} />}
      <ColorPicker setColor={setCategoryColor} color={categoryColor} />
      <Text wrap={'wrap'} className={classes.text}>
        {categoryTitle}
      </Text>
      <Flex className={classes['flex-input']} direction={'column'} gap={'1rem'}>
        <input
          type="text"
          value={categoryTitle || category?.title}
          placeholder={category?.title || 'Category title'}
          onChange={(e) => setCategoryTitle(e.target.value)}
          className={classes.input}
          multiple={true}
        />

        <Flex gap={'2rem'} className={classes.buttons}>
          <Button onClick={handleSave} className={classes['category-button']}>
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className={classes['category-button']}
            color="blue"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AddEditCategory;
