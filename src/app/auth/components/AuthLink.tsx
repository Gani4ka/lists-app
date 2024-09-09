import Link from 'next/link';

import styles from '../auth.module.css';

type Props = {
  text: string;
  linkText: string;
  errorMessage: string;
  link: string;
};
export default function AuthLink({
  errorMessage,
  text,
  linkText,
  link,
}: Props) {
  return (
    <div>
      <Link className={styles.link} href={link}>
        {text} <span>{linkText}</span> then
      </Link>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
