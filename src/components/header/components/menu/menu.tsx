'use client';
import { Link } from '@radix-ui/themes';
import { clsx } from 'clsx';

import BaseLink from 'next/link';

import { logout } from '@app/api/user';
import { PAGES_NAMES, PATHS } from '@app/constants/pages';

import styles from './menu.module.css';
import type { MenuProps } from './types';

const Menu = ({ isOpen, hasUser }: MenuProps) => {
  if (!hasUser) {
    return (
      <div className={clsx(styles.menu, isOpen && styles.open)}>
        <nav>
          <ul>
            <li>
              <Link asChild highContrast>
                <BaseLink href={PATHS.auth}>{PAGES_NAMES.auth}</BaseLink>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  return (
    <div className={clsx(styles.menu, isOpen && styles.open)}>
      <nav>
        <ul>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.home}>{PAGES_NAMES.home}</BaseLink>
            </Link>
          </li>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.categories}>
                {PAGES_NAMES.categories}
              </BaseLink>
            </Link>
          </li>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.category}>
                Create {PAGES_NAMES.category}
              </BaseLink>
            </Link>
          </li>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.list}>Create {PAGES_NAMES.list}</BaseLink>
            </Link>
          </li>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.contact}>{PAGES_NAMES.contact}</BaseLink>
            </Link>
          </li>
          <li>
            <Link asChild highContrast>
              <BaseLink href={PATHS.about}>{PAGES_NAMES.about}</BaseLink>
            </Link>
          </li>
          <li>
            <Link style={{ color: 'white' }} onClick={() => logout()}>
              Logout
              {/* <BaseLink href={PATHS.logout}>{PAGES_NAMES.logout}</BaseLink> */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
