'use client';
import { Link } from '@radix-ui/themes';

import BaseLink from 'next/link';

import { PAGES_NAMES, PATHS } from '@app/constants/pages';

import styles from './styles.module.css';
import type { DesktopMenuProps } from './types';

const DesktopMenu = ({ hasUser }: DesktopMenuProps) => {
  if (!hasUser) {
    return (
      <div className={styles.menu}>
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
    <div className={styles.menu}>
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
              <BaseLink href={PATHS.subcategory}>
                Create {PAGES_NAMES.subcategory}
              </BaseLink>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DesktopMenu;
