import { forwardRef } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';

import classes from '../../styles.module.css';

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, forwardedRef) {
    return (
      <Select.Item
        className={classes['select-item']}
        {...props}
        ref={forwardedRef}
        value={props.value}
      >
        <Select.ItemText>{props.children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
