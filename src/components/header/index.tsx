import { cookies } from 'next/headers';

import Header from './header';

export default function Page() {
  const user = cookies().get('auth-user');
  const hasUser = user && user.value ? true : false;

  return <Header hasUser={hasUser} />;
}
