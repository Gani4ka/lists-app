'use client';

import { useEffect, useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';
import clsx from 'clsx';

import { useRouter } from 'next/navigation';

import { createCategory, updateCategory } from '@app/api/category';
import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';
import { CategoryIconItem } from '@app/app/categories/types';
import { CATEGORY_ICONS } from '@app/app/constants';
import AddButton from '@app/components/addButton';
import ColorPicker from '@app/components/color-picker/ColorPicker';
import CustomDialog from '@app/components/custom-dialog/CustomDialog';
import IconPicker from '@app/components/icon-picker/IconPicker';
import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import classes from './styles.module.css';
import { AddEditProps } from './types';

const defaultIcon = CATEGORY_ICONS[0];

const AddEditCategory = ({ category }: AddEditProps) => {
  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIconItem>(defaultIcon);
  const [categoryColor, setCategoryColor] = useState<string>(
    category?.color || setRandomIconColor()
  );

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  let Icon = null;

  useEffect(() => {
    if (category) {
      setCategoryTitle(category.title);
      setCategoryColor(category.color ?? setRandomIconColor());
      if (category.icon) {
        const userIcon = CATEGORY_ICONS.find(
          (icon) => icon.name === category.icon
        );

        setCategoryIcon(userIcon ?? CATEGORY_ICONS[0]);
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
      if (requestResult.error) {
        message = requestResult.message;
        setMessage(message);
      } else {
        router.back();
      }
    } catch (error) {
      setMessage('Error updating/creating category');
    }
  };

  if (categoryIcon?.Icon) {
    Icon = categoryIcon.Icon;
  }

  return (
    <Flex className={classes.category}>
      <div
        style={{
          backgroundColor: categoryColor,
        }}
        className={classes['icon-wrapper']}
      >
        {Icon && <Icon color={'white'} className={classes.icon} />}
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
      <Flex direction={'column'} gap={'1rem'}>
        <input
          type="text"
          value={categoryTitle || category?.title}
          placeholder={category?.title || 'Category title'}
          onChange={(e) => setCategoryTitle(e.target.value)}
          className={classes.input}
          multiple={true}
        />

        <GoToLoginPage message={message} />

        <Flex className={classes.buttons}>
          <Button
            onClick={handleSave}
            className={classes['category-button']}
            disabled={categoryTitle === ''}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className={clsx(classes['category-button'], classes.cancel)}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
      <AddButton clickHandler={handleSave} disabled={categoryTitle === ''} />
    </Flex>
  );
};
export default AddEditCategory;
