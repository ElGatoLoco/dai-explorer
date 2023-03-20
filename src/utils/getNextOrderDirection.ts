import type { Direction } from '../types';

export const getNextOrderDirection = (currDirection: Direction): Direction => {
  switch (currDirection) {
    case 'desc':
      return 'asc';
    case 'asc':
      return null;
    case null:
      return 'desc';
  }
};
