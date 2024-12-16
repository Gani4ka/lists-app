import { forwardRef, useEffect, useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';

import type { CategoryIconItem } from '@app/app/categories/types';
import { CATEGORY_ICONS } from '@app/app/constants';
import type { CategoryType } from '@app/types/list.types';

import classes from '../Select/styles.module.css';

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  category: CategoryType;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, forwardedRef) {
    const defaultIcon = CATEGORY_ICONS[0];
    const [categoryIcon, setCategoryIcon] =
      useState<CategoryIconItem>(defaultIcon);
    const { icon, color } = props.category;
    let Icon = null;

    useEffect(() => {
      if (icon) {
        const selectedIcon = CATEGORY_ICONS.find(
          (iconItem) => iconItem.name === icon
        );

        setCategoryIcon(selectedIcon ?? defaultIcon);
      }
    }, [icon, defaultIcon]);

    if (categoryIcon?.Icon) {
      Icon = categoryIcon.Icon;
    }

    return (
      <Select.Item
        className={classes['select-item']}
        {...props}
        ref={forwardedRef}
        value={props.value}
      >
        <Select.ItemText>
          {Icon && <Icon color={color} className={classes['category-icon']} />}
          {props.children}
        </Select.ItemText>
        <Select.ItemIndicator>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
