import { cookies } from 'next/headers';

import AuthHeader from './auth-header';

export default function Header() {
  const user = cookies().get('auth-user');
  const hasUser = user && user.value ? true : false;

  return <AuthHeader hasUser={hasUser} />;
}
