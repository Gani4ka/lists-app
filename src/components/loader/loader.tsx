import { Box } from '@radix-ui/themes';

import classes from './loader.module.css';

const Loader = () => {
  return (
    <Box className={classes.loader}>
      <Box className={classes.spinner}></Box>
    </Box>
  );
};

export default Loader;
