export interface CategoryType {
  _id: string;
  title: string;
  icon: string;
}

export type CategoryCreateType = Omit<CategoryType, '_id'>;

export interface List {
  _id?: string;
  title: string;
  category: CategoryType;
}

export interface SubcategoriesType {
  _id?: string;
  title: string;
  categoryId: string;
}

export interface ItemType {
  _id: string;
  title: string;
  subcategoryId: string;
  description?: string;
  isDone?: boolean;
}
export interface User {
  _id?: string;
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
