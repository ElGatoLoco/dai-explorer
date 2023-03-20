import type { TxData, TxInfo } from '../types';
import type { WithStringValuesOnly } from './type';

const getFilterFunc =
  (vals: TxData, property: keyof WithStringValuesOnly<TxInfo>, val: string) => (k: string) => {
    return vals[k][property].toLowerCase().includes(val.toLowerCase());
  };

export const getFilterPredicates = (filters: WithStringValuesOnly<TxInfo>, data: TxData) => {
  return Object.entries(filters).map(([key, val]) =>
    getFilterFunc(data, key as keyof WithStringValuesOnly<TxInfo>, val),
  );
};
