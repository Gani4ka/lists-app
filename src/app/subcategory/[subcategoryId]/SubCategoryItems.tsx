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
    error: subategoryError,
    message: subcategoryMessage,
  } = await getData('subcategory', subcategoryId);

  return (
    <main className={classes.main}>
      {subcategory && <ListTitle list={subcategory} />}
      {subcategoryId && (
        <>
          <ItemsForm
            listOfItems={subcategoryItems}
            subcategoryId={subcategoryId}
          />
          <p>{(error || subategoryError) && (message || subcategoryMessage)}</p>
        </>
      )}
    </main>
  );
};

export default List;
