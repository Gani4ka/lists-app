import { useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

import Menu from '../menu';

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button className="menu-button" onClick={toggleMenu} ml="auto">
        <HamburgerMenuIcon />
      </Button>
      <Menu isOpen={isOpen} />
    </>
  );
};

export default MenuButton;
