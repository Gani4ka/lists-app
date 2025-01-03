import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '../../constants';

export function checkIsValidValue(value: string): {
  isMin: boolean;
  isMax: boolean;
} {
  console.log('jk', value, value.length < MIN_FIELD_LENGTH);

  return {
    isMin: value.length < MIN_FIELD_LENGTH,
    isMax: value.length > MAX_FIELD_LENGTH,
  };
}
