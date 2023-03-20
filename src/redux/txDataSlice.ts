import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { equals, findIndex, has, remove } from 'ramda';

import { TX_COUNT } from '../config';
import type { Direction, TxData, TxInfo } from '../types';
import { getNextOrderDirection } from '../utils/getNextOrderDirection';
import { getOldestTx } from '../utils/getOldestTx';
import { getTransformedKeys } from '../utils/getTransformedKeys';
import type { EventReceivePayload, FilterUpdatePayload, TxDataState } from './types';

const initialState: TxDataState = {
  txData: {},
  txKeys: [],
  transforms: { filters: {}, ordering: [{ timestamp: 'desc' }] },
  isLoading: false,
};

export const txDataSlice = createSlice({
  name: 'txData',
  initialState,
  reducers: {
    fetchTxData: (state) => {
      state.isLoading = true;
    },
    initialDataReceived: (state, action: PayloadAction<TxData>) => {
      const data = action.payload;
      const orderedKeys = getTransformedKeys(state.transforms, data);

      const txKeys = orderedKeys.slice(0, TX_COUNT);
      const excessTxKeys = orderedKeys.slice(TX_COUNT);
      excessTxKeys.forEach((txKey) => {
        delete data[txKey];
      });

      state.isLoading = false;
      state.txData = data;
      state.txKeys = txKeys;
    },
    newEventReceived: (state, action: PayloadAction<EventReceivePayload>) => {
      const { txKey, txData } = action.payload;

      // Some events are received more than once,
      // so we skip updating state if we already have the data
      if (!(txKey in state.txData)) {
        const [oldestTransferId] = getOldestTx(state.txData);
        const oldestTransferKeyIdx = findIndex(equals(oldestTransferId), state.txKeys);

        state.txData[txKey] = txData;
        state.txKeys = remove(
          oldestTransferKeyIdx,
          1,
          Object.keys(state.txData),
        ) as (keyof TxInfo)[];
        delete state.txData[oldestTransferId];
        state.txKeys = getTransformedKeys(state.transforms, state.txData);
      }
    },
    orderingUpdated: (state, action: PayloadAction<{ column: keyof TxInfo }>) => {
      const { column } = action.payload;
      const ordIdx = findIndex(has(column), state.transforms.ordering);
      if (ordIdx === -1) {
        state.transforms.ordering.push({ [column]: getNextOrderDirection(null) });
      } else {
        const nextOrderingDirection = getNextOrderDirection(
          state.transforms.ordering[ordIdx][column] as Direction,
        );
        if (nextOrderingDirection === null) {
          state.transforms.ordering = state.transforms.ordering.filter((_, idx) => idx !== ordIdx);
        } else {
          state.transforms.ordering[ordIdx][column] = nextOrderingDirection;
        }
      }
    },
    onOrderingUpdated: (state) => {
      state.txKeys = getTransformedKeys(state.transforms, state.txData);
    },
    // Only used to trigger listener which debounces search
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    triggerFilterUpdate: (_state, _action: PayloadAction<FilterUpdatePayload>) => {},
    filterUpdated: (state, action: PayloadAction<FilterUpdatePayload>) => {
      const { key, val } = action.payload;
      if (val.length === 0) {
        delete state.transforms.filters[key];
      } else {
        state.transforms.filters[key] = val;
      }
    },
    onFilterUpdated: (state) => {
      state.txKeys = getTransformedKeys(state.transforms, state.txData);
    },
  },
});

export const {
  initialDataReceived,
  fetchTxData,
  filterUpdated,
  newEventReceived,
  orderingUpdated,
  onOrderingUpdated,
  onFilterUpdated,
  triggerFilterUpdate,
} = txDataSlice.actions;

export default txDataSlice.reducer;
