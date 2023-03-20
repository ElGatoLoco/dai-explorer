import { allPass, compose, curry, filter, sortWith } from 'ramda';

import type { Ordering, Transforms, TxData, TxInfo } from '../types';
import { getAppliedOrdering } from './getAppliedOrdering';
import { getFilterPredicates } from './getFilterPredicates';
import type { WithStringValuesOnly } from './type';

const getFilterFn = (filters: WithStringValuesOnly<TxInfo>) =>
  compose(filter<string>, allPass, curry(getFilterPredicates)(filters));

const getOrderFn = (ordering: Ordering[]) =>
  compose(sortWith<keyof TxInfo>, curry(getAppliedOrdering)(ordering));

export const getTransformedKeys = ({ filters, ordering }: Transforms, txData: TxData) => {
  const filterFunc = getFilterFn(filters)(txData);
  const orderFunc = getOrderFn(ordering)(txData);

  return compose(orderFunc, filterFunc)(Object.keys(txData));
};
