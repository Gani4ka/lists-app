'use client';
import React from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { Flex } from '@radix-ui/themes';
const pickerColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
];
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
      <CirclePicker
        color={color}
        onChangeComplete={handleColorChange}
        colors={pickerColors}
      />
      <p>{color}</p>
    </Flex>
  );
};

export default ColorPicker;
