import { Flex, Text } from '@radix-ui/themes';

import type { CategoryIconProps } from './types';

export const CategoryIcon = ({
  children,
  onClick,
  color,
}: CategoryIconProps) => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      p={'1'}
      height={'150px'}
      width={'150px'}
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      <Text style={{ flexBasis: '100%', textAlign: 'center' }}>{children}</Text>
    </Flex>
  );
};
