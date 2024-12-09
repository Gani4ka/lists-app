import Link from 'next/link';

import { GoToLoginPageProps } from '@app/types/list.types';

import styles from '../auth.module.css';
export const GoToLoginPage = ({ message }: GoToLoginPageProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p className="error-text">{message} </p>
      <Link className={styles.link} href={'/auth/login'}>
        <span>Login</span>
      </Link>
    </div>
  );
};
