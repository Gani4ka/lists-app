'use client';

import { useState } from 'react';
import { Button } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { createCategory, updateCategory } from '@app/api/category';
import { DEFAULT_CATEGORY_ICON } from '@app/constants/icon';

import { CategoryIcon } from './categoryIcon';
import type { CategoryCardProps } from './types';

const CategoryCard = ({ category, children }: CategoryCardProps) => {
  const [newTitle, setNewTitle] = useState(category?.title);
  const [newIcon, setNewIcon] = useState(category?.icon);
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    try {
      if (category && newTitle) {
        await updateCategory({
          _id: category._id,
          title: newTitle,
          icon: newIcon || DEFAULT_CATEGORY_ICON,
        });
      } else {
        await createCategory({
          title: newTitle || '',
          icon: newIcon || DEFAULT_CATEGORY_ICON,
        });
      }
      alert('Category updated');
      handleCancel();
    } catch (error) {
      alert('Error updating category');
    }
  };

  function editIcon() {
    //TODO - add icon picker
    setNewIcon(category?.icon);
  }

  return (
    <div className="category-card">
      <p>{category ? 'Update category' : 'Create category'}</p>
      <button onClick={editIcon}>
        <CategoryIcon>{children}</CategoryIcon>
      </button>
      <h2>{newTitle}</h2>
      <div className="edit-section">
        <input
          type="text"
          value={newTitle || category?.title}
          placeholder={category?.title || 'Category title'}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="buttons">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
