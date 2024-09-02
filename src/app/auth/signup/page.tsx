import { Flex } from '@radix-ui/themes';

import SignUp from './SignUp';

export default async function Page() {
  return (
    <Flex direction={'column'} align={'center'}>
      <SignUp />
    </Flex>
  );
}
