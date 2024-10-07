'use client';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FaApple,
  FaBook,
  FaCat,
  FaCoffee,
  FaGoogleDrive,
  FaList,
  FaPersonBooth,
  FaPhone,
  FaRegCalendar,
  FaRegPaperPlane,
  FaShoppingBasket,
} from 'react-icons/fa';
import { MdOutlineSportsMartialArts } from 'react-icons/md';
import { Flex, Grid, Text } from '@radix-ui/themes';

import styles from './classes.module.css';
interface CategoryIcon {
  id: number;
  name: string;
  Icon: IconType;
}
const icons: CategoryIcon[] = [
  { id: 1, name: 'coffee', Icon: FaCoffee },
  { id: 2, name: 'apple', Icon: FaApple },
  { id: 3, name: 'book', Icon: FaBook }, //reading
  { id: 4, name: 'list', Icon: FaList },
  { id: 5, name: 'shopping', Icon: FaShoppingBasket },
  { id: 6, name: 'sport', Icon: MdOutlineSportsMartialArts },
  { id: 7, name: 'calender', Icon: FaRegCalendar },
  { id: 8, name: 'drive', Icon: FaGoogleDrive },
  { id: 9, name: 'person', Icon: FaPersonBooth }, //reading
  { id: 10, name: 'phone', Icon: FaPhone },
  { id: 11, name: 'plane', Icon: FaRegPaperPlane },
  { id: 12, name: 'cat', Icon: FaCat },
];
//shopping list, wishlist, books to read, travel list, things to do,
type Props = {
  onSelectIcon: (icon: string) => void;
  selectedIcon: string;
};
const IconPicker = ({ selectedIcon, onSelectIcon }: Props) => {
  return (
    <Flex
      direction={'column'}
      gap={'20px'}
      width={'20%'}
      align={'center'}
      className={styles.container}
    >
      <Text align={'center'}>Choose category</Text>
      <Grid columns={'3'} rows={'4'} className={styles.grid}>
        {icons.map(({ name, Icon: IconComponent }) => (
          <Flex
            key={name}
            onClick={() => onSelectIcon(name)}
            className={styles.icon}
            style={{
              backgroundColor:
                selectedIcon === name ? '#bed7dc' : 'transparent',
            }}
          >
            <IconComponent size={24} />
          </Flex>
        ))}
      </Grid>
      <Text align={'center'} style={{ marginTop: '2rem' }}>
        {selectedIcon ?? ''}
      </Text>
    </Flex>
  );
};

export default IconPicker;
