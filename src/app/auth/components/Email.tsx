import * as Label from '@radix-ui/react-label';
import { Flex } from '@radix-ui/themes';

import styles from '../auth.module.css';
export default function Email() {
  return (
    <Flex direction={'column'} className={styles.inputDiv}>
      <Label.Root className="LabelRoot" htmlFor="email">
        Email
      </Label.Root>
      <input className={styles.input} type="email" id="email" name="email" />
    </Flex>
  );
}
