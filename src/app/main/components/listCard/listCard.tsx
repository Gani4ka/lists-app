import { Flex, Heading } from '@radix-ui/themes';

import Link from 'next/link';

import styles from './listCard.module.css';
import type { ListCardProps } from './listCard.types';

const ListCard = ({ list, children, color }: ListCardProps) => {
  return (
    <Link href={`/list/${list._id}`}>
      <Flex
        key={list._id}
        className={styles.listItem}
        direction={'column'}
        justify={'center'}
        align={'center'}
        p={'1'}
        content="space-between"
        gapY={'50px'}
        style={{ backgroundColor: color }}
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
