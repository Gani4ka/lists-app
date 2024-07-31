'use client';

import { useState } from 'react';
import { Button } from '@radix-ui/themes';

import { useRouter } from 'next/navigation';

import { updateCategory } from '@app/api/fetchData';
import Loader from '@app/components/loader';

import { CategoryIcon } from './categoryIcon';
import type { CategoryCardProps } from './types';

const CategoryCard = ({ category, children }: CategoryCardProps) => {
  const [newTitle, setNewTitle] = useState(category?.title);
  const [newIcon, setNewIcon] = useState(category?.icon);
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSave = () => {
    try {
      updateCategory({
        _id: category._id,
        title: newTitle,
        icon: newIcon,
      });
      alert('Category updated');
    } catch (error) {
      alert('Error updating category');
    }
  };

  function editIcon() {
    //TODO - add icon picker
    setNewIcon(category.icon);
  }

  return (
    <div className="category-card">
      {category ? (
        <>
          <button onClick={editIcon}>
            <CategoryIcon>{children}</CategoryIcon>
          </button>
          <h2>{newTitle}</h2>
          <div className="edit-section">
            <input
              type="text"
              value={category.title}
              placeholder={category.title}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="buttons">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CategoryCard;
