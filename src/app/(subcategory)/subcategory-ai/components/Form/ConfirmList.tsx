import classes from '../../../formStyles.module.css';

export function ConfirmList({ items }: { items: string[] }) {
  return (
    <ul className={classes.list}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: '8px', fontSize: '16px' }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
