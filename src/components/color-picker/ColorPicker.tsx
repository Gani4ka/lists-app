import { CirclePicker, ColorResult } from 'react-color';
import { Flex } from '@radix-ui/themes';

import { pickerColors } from '@app/constants/pickerColors';
import { ColorPickerType } from '@app/types/colorPicker.types';

const ColorPicker = ({ color, setColor }: ColorPickerType) => {
  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <Flex direction={'column'} gap={'2rem'} align={'center'}>
      <label>Choose category color:</label>
      <CirclePicker
        color={color}
        onChangeComplete={handleColorChange}
        colors={pickerColors}
      />
    </Flex>
  );
};

export default ColorPicker;
