import type { TxInfo } from '../types';

export type BlockTimestampsCache = {
  [blockNumber: string]: number;
};
export type TxMap = { [key: string]: TxInfo };
