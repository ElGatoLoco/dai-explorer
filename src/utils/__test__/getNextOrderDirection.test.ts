import type { Direction } from '../../types';
import { getNextOrderDirection } from '../getNextOrderDirection';

describe('getNextOrderDirection', () => {
  it('should return "asc" when current direction is "desc"', () => {
    const currDirection: Direction = 'desc';
    const result = getNextOrderDirection(currDirection);
    expect(result).toBe('asc');
  });

  it('should return null when current direction is "asc"', () => {
    const currDirection: Direction = 'asc';
    const result = getNextOrderDirection(currDirection);
    expect(result).toBeNull();
  });

  it('should return "desc" when current direction is null', () => {
    const currDirection: Direction = null;
    const result = getNextOrderDirection(currDirection);
    expect(result).toBe('desc');
  });
});
