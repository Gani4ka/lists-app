export interface CategoryType {
  _id: string;
  title: string;
  icon: string;
  color: string;
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
