import { ethers } from 'ethers';

import { store } from '../redux/store';
import { newEventReceived } from '../redux/txDataSlice';
import type { TxInfo } from '../types';
import { daiContractProvider, daiContractWsProvider } from './providers';
import type { BlockTimestampsCache } from './types';

export const subscribeToEventUpdates = async () => {
  const blockTimestampsCache: BlockTimestampsCache = {};
  const tokenDecimals = await daiContractProvider.decimals();

  daiContractWsProvider.on('Transfer', async (sender, recipient, amount, evtData) => {
    const { logIndex, blockHash, transactionHash: txHash, blockNumber, getBlock } = evtData;
    const txKey = `${logIndex}-${blockHash}-${txHash}` as keyof TxInfo;

    const cachedTimestamp = blockTimestampsCache[blockNumber];
    const timestamp = cachedTimestamp || (await getBlock()).timestamp;
    if (!cachedTimestamp) {
      blockTimestampsCache[blockNumber] = timestamp;
    }

    const value = parseFloat(ethers.utils.formatUnits(amount, tokenDecimals));
    const txData = {
      txHash,
      timestamp,
      sender,
      recipient,
      value,
    };

    store.dispatch(newEventReceived({ txKey, txData }));
  });
};
