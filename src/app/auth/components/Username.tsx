import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';

import styles from '../auth.module.css';
export default function Username() {
  return (
    <Flex direction={'column'} className={styles.inputDiv}>
      <Label.Root className="LabelRoot" htmlFor="username">
        Username
      </Label.Root>
      <input
        className={styles.input}
        type="text"
        id="username"
        name="username"
      />
    </Flex>
  );
}
