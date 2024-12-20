import { Suspense } from 'react';

import { getData } from '@app/app/(subcategory)/subcategory/utils/getData';
import Loader from '@app/components/loader';

import { SubcategoryAIForm } from '../components/Form';

const SubcategoryAIPage = async () => {
  const { categories } = await getData('categories', '');

  return (
    <Suspense fallback={<Loader />}>
      <SubcategoryAIForm categories={categories} />
    </Suspense>
  );
};

export default SubcategoryAIPage;
