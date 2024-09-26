import * as Form from '@radix-ui/react-form';
import { Checkbox, Flex } from '@radix-ui/themes';

import { DeleteButton } from '@app/components/deleteButton';

import type { ItemProps } from './item.types';
import classes from './styles.module.css';

export const Item = ({
  item,
  index,
  handleToggleDone,
  handleTitleChange,
  handleDelete,
}: ItemProps) => {
  return (
    <Flex key={item._id} className={classes['item-wrapper']}>
      <Checkbox
        checked={item.isDone}
        onCheckedChange={() => handleToggleDone(item._id!, !item.isDone)}
        id={`checkbox-${index}`}
      />
      <Form.Field name={`title-${index}`}>
        <Form.Control asChild>
          <input
            value={item.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            placeholder="Enter title"
            style={{ flex: 1, marginRight: '10px' }}
            className={classes['item-input']}
          />
        </Form.Control>
      </Form.Field>
      <DeleteButton item={item} cb={handleDelete} />
    </Flex>
  );
};
