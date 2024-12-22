import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Flex } from '@radix-ui/themes';

import classes from './customSelect.module.css';
import {
  CategoryFilterOption,
  CategorySelectProps,
  CategorySortingOption,
} from './types';

const CustomSelect = ({
  options,
  value,
  onChange,
  label,
}: CategorySelectProps) => {
  return (
    <Flex className={classes.select}>
      <Select.Root
        value={value ? value.name : ''}
        onValueChange={(value) => {
          const selected = options?.find(
            (option: CategoryFilterOption | CategorySortingOption) =>
              option.name === value
          );
          if (selected) onChange(selected);
        }}
      >
        <Select.Trigger className={classes['select-trigger']}>
          <Select.Value placeholder={label} className={classes.label} />
          <Select.Icon className={classes.icon}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className={classes.selectContent}>
          <Select.ScrollUpButton className={classes.scrollButton} />
          <Select.Viewport className={classes.selectViewport}>
            {options?.map(
              (option: CategoryFilterOption | CategorySortingOption) => (
                <Select.Item
                  key={option.id}
                  value={option.name}
                  className={classes['select-item']}
                >
                  <Select.ItemText>{option.name}</Select.ItemText>
                </Select.Item>
              )
            )}
          </Select.Viewport>
          <Select.ScrollDownButton className={classes.scrollButton} />
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
export default CustomSelect;
