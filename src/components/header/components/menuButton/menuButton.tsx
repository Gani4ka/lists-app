import { useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

import Menu from '../menu';
import classes from './styles.module.css';
type Props = {
  hasUser: boolean;
};
const MenuButton = ({ hasUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button className={classes['menu-button']} onClick={toggleMenu}>
        <HamburgerMenuIcon className={classes['menu-button-icon']} />
      </Button>
      <Menu isOpen={isOpen} hasUser={hasUser} />
    </>
  );
};

export default MenuButton;
