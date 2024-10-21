'use client';

import { useEffect, useState } from 'react';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { createCategory, updateCategory } from '@app/api/category';
import { categoryIcons } from '@app/app/constants';
import ColorPicker from '@app/components/color-picker/ColorPicker';
import IconPicker from '@app/components/icon-picker/IconPicker';
import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import CustomDialog from '../../../components/custom-dialog/CustomDialog';
import classes from '../category.module.css';
import { CategoryIconItem } from '../types';
import { AddEditProps } from './categoryCard/types';
const defaultIcon = categoryIcons[0];
const AddEditCategory = ({ category }: AddEditProps) => {
  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const [categoryColor, setCategoryColor] = useState<string>('');

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  let Icon = null;

  useEffect(() => {
    if (category) {
      setCategoryTitle(category.title);
      setCategoryColor(category.color ?? setRandomIconColor());
      if (category.icon) {
        const userIcon = categoryIcons.find(
          (icon) => icon.name === category.icon
        );

        setCategoryIcon(userIcon ?? categoryIcons[0]);
      }
    }
  }, [category]);

  useEffect(() => {
    if (categoryIcon) {
      setOpen(false);
    }
  }, [categoryIcon]);

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
          icon: categoryIcon?.name || defaultIcon.name,
          color: categoryColor || setRandomIconColor(),
        });
        message = 'Category updated';
      } else {
        requestResult = await createCategory({
          title: categoryTitle || '',
          icon: categoryIcon?.name || defaultIcon.name,
          color: categoryColor ?? setRandomIconColor(),
        });
        message = 'Category created';
      }
      if (requestResult && requestResult.message) {
        message = requestResult.message;
      }
      alert(message);
      handleCancel();
    } catch (error) {
      console.error('Error updating/creating category', error);
      alert('Error updating/creating category');
    }
  };

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
      <div
        style={{
          backgroundColor: categoryColor,
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        {Icon && <Icon size={40} color={'white'} />}
      </div>
      <CustomDialog
        buttonTitle="Change icon"
        open={open}
        setOpen={setOpen}
        customContent={
          <IconPicker
            onSelectIcon={setCategoryIcon}
            selectedIcon={categoryIcon}
          />
        }
      />

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
          <Button
            onClick={handleSave}
            style={{ backgroundColor: '#2AA383' }}
            className={classes['category-button']}
          >
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
