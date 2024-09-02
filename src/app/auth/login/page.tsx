import { Flex } from '@radix-ui/themes';

import Login from './Login';

export default async function Page() {
  return (
    <Flex direction={'column'} align={'center'}>
      <Login />
    </Flex>
  );
}
