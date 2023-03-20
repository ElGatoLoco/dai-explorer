import type { TxInfo } from '../../types';
import { getOldestTx } from '../getOldestTx';

describe('getOldestTx', () => {
  const tx1: TxInfo = {
    txHash: 'hash1',
    timestamp: 1234567890,
    sender: 'sender1',
    recipient: 'recipient1',
    value: 100,
  };
  const tx2: TxInfo = {
    txHash: 'hash2',
    timestamp: 1234567891,
    sender: 'sender2',
    recipient: 'recipient2',
    value: 200,
  };
  const tx3: TxInfo = {
    txHash: 'hash3',
    timestamp: 1234567892,
    sender: 'sender3',
    recipient: 'recipient3',
    value: 300,
  };

  const txData = {
    tx1: tx1,
    tx2: tx2,
    tx3: tx3,
  };

  it('should return the oldest transaction', () => {
    const oldestTx = getOldestTx(txData);
    expect(oldestTx[0]).toBe('tx1');
    expect(oldestTx[1]).toBe(1234567890);
  });

  it('should return the correct result for a single transaction', () => {
    const oldestTx = getOldestTx({ tx1: tx1 });
    expect(oldestTx[0]).toBe('tx1');
    expect(oldestTx[1]).toBe(1234567890);
  });

  it('should return an empty string and Infinity for an empty object', () => {
    const oldestTx = getOldestTx({});
    expect(oldestTx[0]).toBe('');
    expect(oldestTx[1]).toBe(Infinity);
  });
});
