import { find, has } from 'ramda';

import type { Direction, Ordering, TxInfo } from '../../../types';

export const getCurrentColumnDirection = (column: keyof TxInfo, currOrdering: Ordering[]) => {
  return (find(has(column), currOrdering) || { [column]: null })[column] as Direction;
};
