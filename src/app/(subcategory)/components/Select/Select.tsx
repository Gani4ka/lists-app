import { ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectUI from '@radix-ui/react-select';
import { ChevronDownIcon, Flex } from '@radix-ui/themes';

import Loading from '@app/app/loading';
import type { CategoryType, SubcategoriesType } from '@app/types/list.types';

import { SelectItem } from '../SelectItem';
import classes from './styles.module.css';
import type { SelectProps } from './types';
import { isCategoryType } from './utils/isCategoryType';

export function Select({
  value,
  text,
  onValueChange,
  defaultValue,
  required,
  children,
  options,
  placeholder,
  loading,
}: SelectProps) {
  if (loading) {
    return <Loading />;
  }
  return (
    <SelectUI.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      required={required}
    >
      <SelectUI.Trigger className={classes['select-trigger']}>
        <SelectUI.Value placeholder={placeholder} aria-label={value}>
          <Flex className={classes['select-value']}>
            {children}
            {text}
          </Flex>
        </SelectUI.Value>
        <SelectUI.Icon className={classes['select-icon']}>
          <ChevronDownIcon />
        </SelectUI.Icon>
      </SelectUI.Trigger>

      <SelectUI.Content className={classes['select-content']}>
        <SelectUI.ScrollUpButton className={classes['select-scroll-button']}>
          <ChevronUpIcon />
        </SelectUI.ScrollUpButton>
        <SelectUI.Viewport className={classes['select-viewport']}>
          {options?.map((option: string | CategoryType | SubcategoriesType) => (
            <SelectItem
              value={isCategoryType(option) ? option._id : option}
              key={isCategoryType(option) ? option._id : option}
              category={
                isCategoryType(option) && 'icon' in option ? option : undefined
              }
            >
              {isCategoryType(option) ? option.title : option}
            </SelectItem>
          ))}
        </SelectUI.Viewport>
      </SelectUI.Content>
    </SelectUI.Root>
  );
}
