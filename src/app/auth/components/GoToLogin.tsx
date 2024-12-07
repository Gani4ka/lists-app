import Link from 'next/link';

import { GoToLoginPageProps } from '@app/types/list.types';

export const GoToLoginPage = ({ message }: GoToLoginPageProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p className="error-text">{message} </p>
      <Link href={'/auth/login'}>Login</Link>
    </div>
  );
};
