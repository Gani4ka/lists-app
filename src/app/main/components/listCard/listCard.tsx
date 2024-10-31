import { Flex, Heading } from '@radix-ui/themes';

import Link from 'next/link';

import styles from './listCard.module.css';
import type { ListCardProps } from './listCard.types';

const ListCard = ({ list, children, color }: ListCardProps) => {
  return (
    <Link href={`/subcategory/${list._id}`}>
      <Flex
        key={list._id}
        direction={'column'}
        justify={'center'}
        align={'center'}
        p={'1'}
        wrap={'wrap'}
        style={{
          backgroundColor: color,
          minWidth: '100px',
          minHeight: '100px',
          aspectRatio: '1/1',
        }}
      >
        {children}
        <Heading as={'h3'} className={styles.heading}>
          {list.title}
        </Heading>
      </Flex>
    </Link>
  );
};

export default ListCard;
