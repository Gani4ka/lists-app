'use client';

import { useState } from 'react';
// import { IconType } from 'react-icons';
// import * as icons from 'react-icons';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { createCategory, updateCategory } from '@app/api/category';
// import { CategoryIcon } from '@app/app/category/components/categoryIcon';
import ColorPicker from '@app/components/color-picker/ColorPicker';
import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';
import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import styles from '../../category/components/category.module.css';
import { CategoryCardProps } from '../components/categoryCard/types';

const AddEditCategory = ({ category }: CategoryCardProps) => {
  const [newTitle, setNewTitle] = useState<string>(category?.title ?? '');
  const [newIcon] = useState(category?.icon);
  const router = useRouter();
  const [color, setColor] = useState(category?.color ?? setRandomIconColor());
  // const Icon =
  //   (category && icons[category.icon]) || icons[DEFAULT_CATEGORY_ICON];

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    try {
      let message = '';
      if (category && newTitle) {
        await updateCategory({
          _id: category._id,
          title: newTitle,
          icon: newIcon || DEFAULT_CATEGORY_ICON,
          color: color || setRandomIconColor(),
        });
        message = 'Category updated';
      } else {
        await createCategory({
          title: newTitle || '',
          icon: newIcon || DEFAULT_CATEGORY_ICON,
          color: color ?? setRandomIconColor(),
        });
        message = 'Category created';
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
  //   setNewIcon(category?.icon);
  // }

  return (
    <Flex
      direction={'column'}
      gap={'1rem'}
      align={'center'}
      style={{ width: '50%' }}
    >
      <Heading as="h6">
        {category ? 'Update category' : 'Create category'}
      </Heading>
      {/* <CategoryIcon onClick={editIcon} color={color}>
        <Icon />
      </CategoryIcon> */}
      <ColorPicker setColor={setColor} color={color} />

      <Text wrap={'wrap'} style={{ maxWidth: '14rem' }}>
        {newTitle}
      </Text>
      <Flex
        className="edit-section"
        direction={'column'}
        gap={'1rem'}
        style={{ width: '50%' }}
      >
        <input
          type="text"
          value={newTitle || category?.title}
          placeholder={category?.title || 'Category title'}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ height: '2rem' }}
          multiple={true}
        />
        <Flex className="buttons" justify={'between'}>
          <Button onClick={handleSave} className={styles['category-button']}>
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className={styles['category-button']}
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
