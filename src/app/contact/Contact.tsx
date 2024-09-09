'use client';
import { useState } from 'react';

import ColorPicker from '@app/components/color-picker/ColorPicker';

export default function Contact() {
  const [color, setColor] = useState<string>('');

  return <ColorPicker color={color} setColor={setColor} />;
}
