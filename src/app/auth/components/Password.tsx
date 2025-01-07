import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';

import styles from '../auth.module.css';
export default function Password() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Flex direction={'column'} className={styles.inputDiv}>
      <Label.Root className="LabelRoot" htmlFor="password">
        Password
      </Label.Root>
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <input
          className={styles.input}
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          name="password"
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '10px',
            cursor: 'pointer',
            color: '#888',
          }}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </Flex>
  );
}
