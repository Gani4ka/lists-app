import Link from 'next/link';

import { USER_TOKEN_ERROR } from '@app/app/constants';
import { GoToLoginPageProps } from '@app/types/list.types';

import styles from '../auth.module.css';
export const GoToLoginPage = ({ message }: GoToLoginPageProps) => {
  if (message === USER_TOKEN_ERROR) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p className="error-text">{message} </p>
        <Link className={styles.link} href={'/auth/login'}>
          <span>Login</span>
        </Link>
      </div>
    );
  }
  return <p className="error-text">{message}</p>;
};
