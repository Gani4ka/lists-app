import { Flex, Text } from '@radix-ui/themes';

import { setRandomIconColor } from '@app/utils/setRandomIconColor';

import type { CategoryIconProps } from './types';

export const CategoryIcon = ({ children }: CategoryIconProps) => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      p={'1'}
      height={'150px'}
      width={'150px'}
      style={{
        backgroundColor: setRandomIconColor(),
      }}
    >
      <Text style={{ flexBasis: '100%', textAlign: 'center' }}>{children}</Text>
    </Flex>
  );
};
