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
      <label>Choose your color:</label>
      <CirclePicker
        color={color}
        onChangeComplete={handleColorChange}
        colors={pickerColors}
      />
      <p>Your color:{color}</p>
    </Flex>
  );
};

export default ColorPicker;
