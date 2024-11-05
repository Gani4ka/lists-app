import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Flex } from '@radix-ui/themes';

import classes from './customSelect.module.css';
import {
  CategoryFilterOption,
  CategorySelectProps,
  CategorySortingOption,
} from './types';

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
}: CategorySelectProps) {
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
        <Select.Trigger className={classes.selectOption}>
          <Select.Value placeholder={label} className={classes.label} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className={classes.selectContent}>
          <Select.Viewport>
            {options?.map(
              (option: CategoryFilterOption | CategorySortingOption) => (
                <Select.Item key={option.id} value={option.name}>
                  <Select.ItemText>{option.name}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            )}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
