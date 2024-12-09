import { GoToLoginPage } from '@app/app/auth/components/GoToLogin';
import { USER_TOKEN_ERROR } from '@app/app/constants';

import { ItemsForm } from '../components/itemsForm';
import { ListTitle } from '../components/ListTitle';
import type { ListProps } from '../types';
import { getData } from '../utils/getData';
import classes from './styles.module.css';
const List = async ({ params }: ListProps) => {
  const subcategoryId = params.subcategoryId;
  const { subcategoryItems, error, message } = await getData(
    'subcategoryItems',
    subcategoryId
  );
  const {
    subcategory,
    error: subcategoryError,
    message: subcategoryMessage,
  } = await getData('subcategory', subcategoryId);
  const tokenErrorMessage =
    message === USER_TOKEN_ERROR || subcategoryMessage === USER_TOKEN_ERROR;

  return (
    <main className={classes.main}>
      {subcategory && <ListTitle list={subcategory} />}
      {subcategoryId && (
        <>
          <ItemsForm
            listOfItems={subcategoryItems}
            subcategoryId={subcategoryId}
          />
          {tokenErrorMessage && <GoToLoginPage message={message} />}
          {(error || subcategoryError) && !tokenErrorMessage && (
            <p className={'error-text'}>{subcategoryMessage ?? message}</p>
          )}
        </>
      )}
    </main>
  );
};

export default List;
