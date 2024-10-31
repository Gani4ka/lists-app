import { CirclePicker, ColorResult } from 'react-color';
import { Flex } from '@radix-ui/themes';

import { pickerColors } from '@app/constants/pickerColors';
import { ColorPickerType } from '@app/types/colorPicker.types';

import classes from './styles.module.css';

const ColorPicker = ({ color, setColor }: ColorPickerType) => {
  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <Flex className={classes.wrapper}>
      <label className={classes.text}>Choose category color:</label>
      <CirclePicker
        color={color}
        onChangeComplete={handleColorChange}
        colors={pickerColors}
      />
    </Flex>
  );
};

export default ColorPicker;
