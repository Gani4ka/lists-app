import type { MouseEventHandler } from 'react';

import type { PATHS } from '@app/constants/pages';

export interface AddButtonProps {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  linkTo?: PATHS;
  disabled?: boolean;
}
