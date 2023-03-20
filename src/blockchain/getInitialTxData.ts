import { ethers } from 'ethers';
import type { BigNumberish, Contract, EventFilter } from 'ethers';
import type { Result } from 'ethers/lib/utils';

import { TX_COUNT } from '../config';
import { daiContractProvider } from './providers';
import type { BlockTimestampsCache, TxMap } from './types';

const getTxs = async (
  provider: Contract,
  filter: EventFilter,
  decimals: BigNumberish,
  txs: TxMap = {},
  fromBlock = -TX_COUNT,
  toBlock?: number,
): Promise<TxMap> => {
  const eventsBatch = await provider.queryFilter(
    filter,
    fromBlock,
    // We want initial toBlock param to be undefined,
    // since we're processing to the latest available block
    !toBlock && fromBlock === -TX_COUNT ? undefined : toBlock,
  );

  await Promise.all(
    eventsBatch.map(
      async ({ logIndex, blockNumber, blockHash, transactionHash: txHash, args, getBlock }) => {
        const [sender, recipient, amount] = args as Result;
        const txKey = `${logIndex}-${blockHash}-${txHash}`;

        const cachedTimestamp = blockTimestampsCache[blockNumber];
        const timestamp = cachedTimestamp || (await getBlock()).timestamp;
        if (!cachedTimestamp) {
          blockTimestampsCache[blockNumber] = timestamp;
        }
        const value = parseFloat(ethers.utils.formatUnits(amount, decimals));

        txs[txKey] = {
          txHash,
          timestamp,
          sender,
          recipient,
          value,
        };
      },
    ),
  );

  const receivedTxCount = Object.keys(txs).length;
  // Retrieve and process additional data
  // in case minimal target is not reached
  if (receivedTxCount < TX_COUNT) {
    return await getTxs(
      provider,
      filter,
      decimals,
      txs,
      fromBlock - TX_COUNT,
      // If we moved past first iteration (fromBlock lower than inital value)
      // We want next toBlock to become what fromBlock was previously
      fromBlock <= -TX_COUNT ? fromBlock : toBlock,
    );
  }

  return txs;
};

const blockTimestampsCache: BlockTimestampsCache = {};
export const getInitialTxData = async () => {
  const tokenDecimals = (await daiContractProvider.decimals()) as BigNumberish;
  const transferFilter = daiContractProvider.filters.Transfer();
  return await getTxs(daiContractProvider, transferFilter, tokenDecimals);
};
