import type { Direction, Ordering } from '../../../../types';
import { getCurrentColumnDirection } from '../getCurrentColumnDirection';

describe('getCurrentColumnDirection', () => {
  const ordering: Ordering[] = [{ timestamp: 'desc' }, { sender: 'asc' }, { value: null }];

  it('should return the direction for an existing column in the ordering', () => {
    const direction: Direction = getCurrentColumnDirection('timestamp', ordering);
    expect(direction).toBe('desc');
  });

  it('should return null for a column in the ordering with a null direction', () => {
    const direction: Direction = getCurrentColumnDirection('value', ordering);
    expect(direction).toBeNull();
  });

  it('should return null for a column not in the ordering', () => {
    const direction: Direction = getCurrentColumnDirection('recipient', ordering);
    expect(direction).toBeNull();
  });
});
