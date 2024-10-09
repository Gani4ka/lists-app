'use client';
import { useState } from 'react';
import { Flex } from '@radix-ui/themes';

import ColorPicker from '@app/components/color-picker/ColorPicker';
import IconPicker from '@app/components/icon-picker/IconPicker';

export default function Contact() {
  const [selectedIcon, setIcon] = useState('');
  const [color, setColor] = useState<string>('');

  return (
    <Flex direction={'column'} gap={'2rem 0'}>
      <ColorPicker color={color} setColor={setColor} />
      <IconPicker selectedIcon={selectedIcon} onSelectIcon={setIcon} />
    </Flex>
  );
}
