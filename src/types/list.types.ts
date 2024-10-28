export interface CategoryType {
  _id: string;
  title: string;
  icon: string;
  color: string;
}

export type CategoryCreateType = Omit<CategoryType, '_id'>;

export interface SubcategoriesType {
  _id: string;
  title: string;
  categoryId: string;
}

export interface SubCategoryItemType {
  _id: string;
  title: string;
  subcategoryId: string;
  description?: string;
  isDone?: boolean;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
export interface AuthUser {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
}
export interface CategoryResponse {
  message: string;
  category: CategoryType | null;
  error: string | null;
}
export interface CategoriesResponse {
  message: string;
  categories: CategoryType[];
  error: string | null;
}
export interface SubCategoryResponse {
  message: string;
  subcategory: SubcategoriesType | null;
  error: string | null;
}
export interface SubCategoriesResponse {
  message: string;
  subcategories: SubcategoriesType[];
  error: string | null;
}
export interface SubCategoryItemResponse {
  message: string;
  subcategoryItem: SubCategoryItemType | null;
  error: string | null;
}
export interface SubCategoryItemsResponse {
  message: string;
  subcategoryItems: SubCategoryItemType[];
  error: string | null;
}
export interface SubCategoryManyItemsResponse {
  message: string;
  subcategoryItems: SubCategoryItemType[];
  subcategoryItemsFailed?: SubCategoryItemType[];
  error: string | null;
}
