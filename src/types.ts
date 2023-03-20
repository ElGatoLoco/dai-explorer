import type { WithStringValuesOnly } from './utils/type';

export type Direction = 'asc' | 'desc' | null;

export type TxInfo = {
  txHash: string;
  timestamp: number;
  sender: string;
  recipient: string;
  value: number;
};

export type TxData = {
  [txKey: string]: TxInfo;
};

export type Ordering = { [key in keyof Partial<TxInfo>]: Direction };
export type Transforms = {
  filters: WithStringValuesOnly<TxInfo>;
  ordering: Ordering[];
};
