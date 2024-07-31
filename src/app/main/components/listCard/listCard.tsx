'use client';

import { Flex, Heading, Text } from '@radix-ui/themes';

import { useElementWidth } from '@app/hooks/useElementWidth';
import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import styles from './listCard.module.css';
import type { ListCardProps } from './listCard.types';

const ListCard = ({ list, children }: ListCardProps) => {
  const [ref, width] = useElementWidth();
  return (
    <Flex
      ref={ref}
      key={list._id}
      className={styles.listItem}
      justify={'center'}
      align={'center'}
      p={'1'}
      wrap={'wrap'}
      style={{
        backgroundColor: setRandomIconColor(),
        height: width,
        minWidth: '100px',
        minHeight: '100px',
      }}
    >
      <Text style={{ flexBasis: '100%', textAlign: 'center' }}>{children}</Text>
      <Heading as={'h3'} className={styles.heading}>
        {list.title}
      </Heading>
    </Flex>
  );
};

export default ListCard;
