'use client';

import { Button } from '@radix-ui/themes';

import { usePathname, useRouter } from 'next/navigation';

import { PATHS } from '@app/constants/pages';

import styles from './styles.module.css';

const AddButton = () => {
  const path = usePathname();
  const router = useRouter();

  function clickHandler() {
    switch (path) {
      case PATHS.home:
        router.push('/list');
        break;
      case PATHS.categories:
        router.push('/category');
        break;
      case PATHS.category:
        alert('Adding new category');
        break;
      case PATHS.list:
        alert('Adding new list');
        break;
    }
  }

  return (
    <Button className={styles.button} onClick={clickHandler}>
      <p className={styles.icon} />
    </Button>
  );
};

export default AddButton;
