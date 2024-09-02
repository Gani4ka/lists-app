'use client';
import React from 'react';
import { IconType } from 'react-icons';
import {
  FaApple,
  FaBook,
  FaCoffee,
  FaList,
  FaShoppingBasket,
} from 'react-icons/fa';
import { MdOutlineSportsMartialArts } from 'react-icons/md';
import { Flex } from '@radix-ui/themes';

const icons: { name: string; icon: IconType }[] = [
  { name: 'coffee', icon: FaCoffee },
  { name: 'apple', icon: FaApple },
  { name: 'book', icon: FaBook },
  { name: 'list', icon: FaList },
  { name: 'shopping', icon: FaShoppingBasket },
  { name: 'sport', icon: MdOutlineSportsMartialArts },
];
type Props = {
  onSelectIcon: (icon: string) => void;
  selectedIcon: string;
};
const IconPicker = ({ selectedIcon, onSelectIcon }: Props) => {
  return (
    <Flex gap={'10px'}>
      {icons.map(({ name, icon: IconComponent }) => (
        <Flex
          key={name}
          onClick={() => onSelectIcon(name)}
          style={{
            cursor: 'pointer',
            border:
              selectedIcon === name
                ? '2px solid blue'
                : '2px solid transparent',
            padding: '5px',
          }}
        >
          <IconComponent size={24} />
        </Flex>
      ))}
    </Flex>
  );
};

export default IconPicker;
