import { MAX_ITEM_LENGTH, MIN_ITEM_LENGTH } from '../constants';

export function checkIsValidValue(value: string): {
  isMin: boolean;
  isMax: boolean;
} {
  return {
    isMin: value.length < MIN_ITEM_LENGTH,
    isMax: value.length > MAX_ITEM_LENGTH,
  };
}
