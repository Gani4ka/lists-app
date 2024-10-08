'use client';

import { Flex, Heading, Text } from '@radix-ui/themes';

import Link from 'next/link';

import { useElementWidth } from '@app/hooks/useElementWidth';

import styles from './listCard.module.css';
import type { ListCardProps } from './listCard.types';

const ListCard = ({ list, children, color }: ListCardProps) => {
  const formattedTitle = list.title.replace(/\s+/g, '_');

  const [ref, width] = useElementWidth();
  return (
    <Link href={`/list/${formattedTitle}-${list._id}`}>
      <Flex
        ref={ref}
        key={list._id}
        className={styles.listItem}
        justify={'center'}
        align={'center'}
        p={'1'}
        wrap={'wrap'}
        style={{
          backgroundColor: color,
          height: width,
          minWidth: '100px',
          minHeight: '100px',
        }}
      >
        <Text style={{ flexBasis: '100%', textAlign: 'center' }}>
          {children}
        </Text>
        <Heading as={'h3'} className={styles.heading}>
          {list.title}
        </Heading>
      </Flex>
    </Link>
  );
};

export default ListCard;
