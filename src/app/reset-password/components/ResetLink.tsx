import Link from 'next/link';

import styles from './resetLink.module.css';
const ResetLink = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.resetLink} href={'/reset-password'}>
        Forgot password?
      </Link>
    </div>
  );
};
export default ResetLink;
