import { ItemsForm } from '../components/itemsForm';
import { ListTitle } from '../components/ListTitle';
import type { ListProps } from '../types';
import { getData } from '../utils/getData';
import classes from './styles.module.css';

const List = async ({ params }: ListProps) => {
  const listId = params.id;

  const listOfItems = await getData('subcategoryItems', listId);
  const list = await getData('subcategory', listId);

  return (
    <main className={classes.main}>
      {list && <ListTitle list={list} />}
      {listId && <ItemsForm listOfItems={listOfItems} listId={listId} />}
    </main>
  );
};

export default List;
