import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/solid';

import type { Direction } from '../../../types';

export const getSortIcon = (direction: Direction) => {
  switch (direction) {
    case 'asc':
      return ArrowUpCircleIcon;
    case 'desc':
      return ArrowDownCircleIcon;
    case null:
      return CursorArrowRaysIcon;
  }
};
