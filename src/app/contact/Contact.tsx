'use client';
import { useEffect, useState } from 'react';

import ColorPicker from '@app/components/color-picker/ColorPicker';

export default function Contact() {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    console.log('selected color:', color);
  }, [color]);
  return <ColorPicker color={color} setColor={setColor} />;
}
