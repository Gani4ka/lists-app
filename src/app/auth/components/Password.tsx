import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';

import styles from '../auth.module.css';
export default function Password() {
  return (
    <Flex direction={'column'} className={styles.inputDiv}>
      <Label.Root className="LabelRoot" htmlFor="password">
        Password
      </Label.Root>
      <input
        className={styles.input}
        type="password"
        id="password"
        name="password"
      />
    </Flex>
  );
}
