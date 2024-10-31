import { PAGES_NAMES, PATHS } from '@app/constants/pages';

export function getPageNameByPath(path: string) {
  switch (path) {
    case PATHS.home:
      return PAGES_NAMES.home;
    case PATHS.subcategory:
      return PAGES_NAMES.subcategory;
    case PATHS.category: {
      return PAGES_NAMES.category;
    }
    case PATHS.about:
      return PAGES_NAMES.about;
    case PATHS.contact:
      return PAGES_NAMES.contact;
    case PATHS.auth:
      return PAGES_NAMES.auth;
    default: {
      const categoryPageRegexp = /categories\//;
      const matchCategoryPage = path.match(categoryPageRegexp);
      if (matchCategoryPage) return PAGES_NAMES.category;
      const categoriesPageRegexp = /categories/;
      const matchCategoriesPage = path.match(categoriesPageRegexp);
      if (matchCategoriesPage) return PAGES_NAMES.categories;
      return PAGES_NAMES.home;
    }
  }
}
