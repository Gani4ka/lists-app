export interface CategoryType {
  _id: string;
  title: string;
  icon: string;
}

export interface List {
  _id: string;
  title: string;
  category: CategoryType;
}

export interface SubcategoriesType {
  _id: string;
  title: string;
  categoryId: string;
}
