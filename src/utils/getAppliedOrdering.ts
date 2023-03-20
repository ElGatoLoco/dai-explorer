import { ascend, descend } from 'ramda';

import type { Direction, Ordering, TxData, TxInfo } from '../types';

const getSortFunc = (vals: TxData, property: keyof TxInfo, direction: Direction) => {
  const directionFunc = direction === 'asc' ? ascend : descend;
  return directionFunc((key: string) => vals[key][property]);
};

export const getAppliedOrdering = (ordering: Ordering[], data: TxData) =>
  ordering.map((sortParam) => {
    const [key, val] = Object.entries(sortParam)[0];

    return getSortFunc(data, key as keyof TxInfo, val);
  });
