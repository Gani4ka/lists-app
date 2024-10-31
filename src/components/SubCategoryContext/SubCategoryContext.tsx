'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface SubCategoryContext {
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
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

  return (
    <SubCategoryContext.Provider value={{ categoryId, setCategoryId }}>
      {children}
    </SubCategoryContext.Provider>
  );
};

export const useSubCategoryContext = () => {
  const context = useContext(SubCategoryContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
