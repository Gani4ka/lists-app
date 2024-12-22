'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface SubCategoryContext {
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  subcategoryTitle: string;
  setSubcategoryTitle: (subcategoryTitle: string) => void;
}

const SubCategoryContext = createContext<SubCategoryContext | undefined>(
  undefined
);

export const SubCategoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoryId, setCategoryId] = useState<string>('');
  const [subcategoryTitle, setSubcategoryTitle] = useState<string>('');

  return (
    <SubCategoryContext.Provider
      value={{
        categoryId,
        setCategoryId,
        subcategoryTitle,
        setSubcategoryTitle,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

export const useSubCategoryContext = () => {
  const context = useContext(SubCategoryContext);
  if (!context) {
    throw new Error(
      'useSubCategoryContext must be used within a SubCategoryContextProvider'
    );
  }
  return context;
};
