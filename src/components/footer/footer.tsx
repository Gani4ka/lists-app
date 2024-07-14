import { Flex } from '@radix-ui/themes';

import AddButton from './components/addButton';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer>
      <Flex className={styles.footer}>
        <AddButton />
      </Flex>
    </footer>
  );
};
