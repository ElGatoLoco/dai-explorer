import { ListenerEffectAPI, TypedStartListening } from '@reduxjs/toolkit';

import type { Transforms, TxData, TxInfo } from '../types';
import type { WithStringValuesOnly } from '../utils/type';
import { store } from './store';

export type TxDataState = {
  txData: TxData;
  txKeys: (keyof TxInfo)[];
  transforms: Transforms;
  isLoading: boolean;
};

export type FilterUpdatePayload = { key: keyof WithStringValuesOnly<TxInfo>; val: string };
export type EventReceivePayload = { txKey: keyof TxInfo; txData: TxInfo };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
