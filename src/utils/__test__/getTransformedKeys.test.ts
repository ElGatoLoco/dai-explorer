import type { Transforms } from '../../types';
import { getTransformedKeys } from '../getTransformedKeys';

const txData = {
  tx1: {
    txHash: 'hash1',
    timestamp: 1630000000,
    sender: 'sender1',
    recipient: 'recipient1',
    value: 10,
  },
  tx2: {
    txHash: 'hash2',
    timestamp: 1631000000,
    sender: 'sender2',
    recipient: 'recipient2',
    value: 20,
  },
  tx3: {
    txHash: 'hash3',
    timestamp: 1632000000,
    sender: 'sender3',
    recipient: 'recipient3',
    value: 30,
  },
};

describe('getTransformedKeys', () => {
  test('should return all keys when no filters or ordering are provided', () => {
    const transforms = {
      filters: {},
      ordering: [],
    };
    const result = getTransformedKeys(transforms, txData);
    expect(result).toEqual(['tx1', 'tx2', 'tx3']);
  });

  test('should return only keys that match the provided filter', () => {
    const transforms = {
      filters: { sender: 'sender1' },
      ordering: [],
    };
    const result = getTransformedKeys(transforms, txData);
    expect(result).toEqual(['tx1']);
  });

  test('should return keys sorted in ascending order by timestamp', () => {
    const transforms: Transforms = {
      filters: {},
      ordering: [{ timestamp: 'asc' }],
    };
    const result = getTransformedKeys(transforms, txData);
    expect(result).toEqual(['tx1', 'tx2', 'tx3']);
  });

  test('should return keys sorted in descending order by value', () => {
    const transforms: Transforms = {
      filters: {},
      ordering: [{ value: 'desc' }],
    };
    const result = getTransformedKeys(transforms, txData);
    expect(result).toEqual(['tx3', 'tx2', 'tx1']);
  });

  test('should return keys sorted by timestamp and filtered by sender', () => {
    const transforms: Transforms = {
      filters: { sender: 'sender2' },
      ordering: [{ timestamp: 'asc' }],
    };
    const result = getTransformedKeys(transforms, txData);
    expect(result).toEqual(['tx2']);
  });
});
