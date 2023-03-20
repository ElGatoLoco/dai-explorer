import type { TxData } from '../types';

export const getOldestTx = (data: TxData) => {
  return Object.entries(data).reduce(
    ([oldestTransferId, minVal], [id, { timestamp }]) => {
      if (timestamp < minVal) {
        return [id, timestamp];
      } else {
        return [oldestTransferId, minVal];
      }
    },
    ['', Infinity],
  );
};
