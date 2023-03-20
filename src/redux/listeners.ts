import { Unsubscribe } from '@reduxjs/toolkit';

import { getInitialTxData } from '../blockchain/getInitialTxData';
import { subscribeToEventUpdates } from '../blockchain/subscribeToEventUpdates';
import { initialDataReceived, fetchTxData, filterUpdated, triggerFilterUpdate } from './txDataSlice';
import type { AppListenerEffectAPI, AppStartListening } from './types';

const SEARCH_DEBOUNCE_TIME_MS = 300;

const onTxDataAsync = async (
  _: ReturnType<typeof fetchTxData>,
  { dispatch }: AppListenerEffectAPI,
) => {
  const txData = await getInitialTxData();
  dispatch(initialDataReceived(txData));
  subscribeToEventUpdates();
};

const onFilterUpdateTriggered = async (
  { payload }: ReturnType<typeof triggerFilterUpdate>,
  { cancelActiveListeners, delay, dispatch }: AppListenerEffectAPI,
) => {
  cancelActiveListeners();
  await delay(SEARCH_DEBOUNCE_TIME_MS);
  dispatch(filterUpdated(payload));
};

export const setupTxDataListeners = (startListening: AppStartListening): Unsubscribe => {
  const subscriptions = [
    startListening({
      actionCreator: fetchTxData,
      effect: onTxDataAsync,
    }),
    startListening({
      actionCreator: triggerFilterUpdate,
      effect: onFilterUpdateTriggered,
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
};
