'use client';
import { useState } from 'react';
import { Flex } from '@radix-ui/themes';

import IconPicker from '@app/components/icon-picker/IconPicker';

export default function Contact() {
  const [selectedIcon, setIcon] = useState('');
  return (
    <Flex direction={'column'} gap={'2rem 0'}>
      <IconPicker selectedIcon={selectedIcon} onSelectIcon={setIcon} />
      <p>{selectedIcon}</p>
    </Flex>
  );
}
