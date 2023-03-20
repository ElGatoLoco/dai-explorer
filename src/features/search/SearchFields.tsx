import { ChangeEvent, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onFilterUpdated, triggerFilterUpdate } from '../../redux/txDataSlice';
import type { TxInfo } from '../../types';
import type { WithStringValuesOnly } from '../../utils/type';
import { InputField } from './InputField';

export const SearchFields = () => {
  const appDispatch = useAppDispatch();
  const transforms = useAppSelector((state) => state.transforms);

  const updateSearchField = useCallback(
    (field: keyof WithStringValuesOnly<TxInfo>) => (evt: ChangeEvent<HTMLInputElement>) => {
      appDispatch(triggerFilterUpdate({ key: field, val: evt.target.value }));
    },
    [appDispatch],
  );

  useEffect(() => {
    appDispatch(onFilterUpdated());
  }, [appDispatch, transforms.filters]);

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2 mx-6">
      <InputField placeholder="Sender" onChange={updateSearchField('sender')} />
      <InputField placeholder="Recipient" onChange={updateSearchField('recipient')} />
    </div>
  );
};
