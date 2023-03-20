import { compose, curry } from 'ramda';
import { ReactNode, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onOrderingUpdated, orderingUpdated } from '../../redux/txDataSlice';
import type { TxInfo } from '../../types';
import { getCurrentColumnDirection } from './utils/getCurrentColumnDirection';
import { getSortIcon } from './utils/getSortIcon';

type Props = {
  children: ReactNode;
  column: keyof TxInfo;
};
export const SortableColHeader = ({ children, column }: Props) => {
  const appDispatch = useAppDispatch();
  const transforms = useAppSelector((state) => state.transforms);
  const SortIcon = compose(
    getSortIcon,
    curry(getCurrentColumnDirection)(column),
  )(transforms.ordering);

  const updateOrdering = useCallback(
    (column: keyof TxInfo) => () => {
      appDispatch(orderingUpdated({ column }));
    },
    [appDispatch],
  );

  useEffect(() => {
    appDispatch(onOrderingUpdated());
  }, [appDispatch, transforms.ordering]);

  return (
    <th
      onClick={updateOrdering(column)}
      scope="col"
      className="px-6 py-3 group hover:cursor-pointer"
    >
      <span className="inline-flex justify-between items-center">
        {children}
        <SortIcon className="w-6 h-6 ml-2 transition-all ease-in-out duration-200 group-hover:fill-gray-500 group-active:fill-gray-300" />
      </span>
    </th>
  );
};
