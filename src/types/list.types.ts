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
  createdAt?: Date;
}

export interface SubCategoryItemType {
  _id: string;
  title: string;
  subcategoryId: string;
  index: number;
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
  error: boolean;
}
export interface CategoriesResponse {
  message: string;
  categories: CategoryType[];
  error: boolean;
}
export interface SubCategoryResponse {
  message: string;
  subcategory: SubcategoriesType | null;
  error: boolean;
}
export interface SubCategoriesResponse {
  message: string;
  subcategories: SubcategoriesType[];
  error: boolean;
}
export interface SubCategoryItemResponse {
  message: string;
  subcategoryItem: SubCategoryItemType | null;
  error: boolean;
}
export interface SubCategoryItemsResponse {
  message: string;
  subcategoryItems: SubCategoryItemType[];
  error: boolean;
}
export interface SubCategoryManyItemsResponse {
  message: string;
  subcategoryItems: SubCategoryItemType[];
  subcategoryItemsFailed?: SubCategoryItemType[];
  error: boolean;
}
export type GoToLoginPageProps = {
  message: string;
};
