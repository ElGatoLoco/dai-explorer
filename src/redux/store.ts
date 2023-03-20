import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import txDataReducer from './txDataSlice';
import { AppStartListening } from './types';

const listenerMiddlewareInstance = createListenerMiddleware({
  // eslint-disable-next-line no-console
  onError: () => console.error,
});

export const store = configureStore({
  reducer: txDataReducer,
  middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
});

export const startAppListening = listenerMiddlewareInstance.startListening as AppStartListening;
