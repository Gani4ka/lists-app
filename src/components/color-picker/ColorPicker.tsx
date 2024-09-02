'use client';
import React from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { Flex } from '@radix-ui/themes';

type Props = {
  setColor: (color: string) => void;
  color: string;
};
const ColorPicker = ({ color, setColor }: Props) => {
  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <Flex direction={'column'} gap={'2rem'} align={'center'}>
      <label>Choose your color:</label>
      <CirclePicker color={color} onChangeComplete={handleColorChange} />
      <p>{color}</p>
    </Flex>
  );
};

export default ColorPicker;
