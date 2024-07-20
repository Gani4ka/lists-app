import { PAGES_NAMES, PATHS } from '@app/constants/pages';

export function getPageNameByPath(path: string) {
  switch (path) {
    case (PATHS.home, PATHS.list):
      return PAGES_NAMES.home;
    case PATHS.categories:
      return PAGES_NAMES.categories;
    case PATHS.category:
      return PAGES_NAMES.category;
    case PATHS.about:
      return PAGES_NAMES.about;
    case PATHS.contact:
      return PAGES_NAMES.contact;
    default:
      return PAGES_NAMES.home;
  }
}
