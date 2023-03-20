import { Unsubscribe } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import { Spinner } from './components/Spinner';
import { SearchFields } from './features/search/SearchFields';
import { DataTable } from './features/tx-table/DataTable';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setupTxDataListeners } from './redux/listeners';
import { startAppListening } from './redux/store';
import { fetchTxData } from './redux/txDataSlice';

export const App = () => {
  const appDispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isLoading);

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [setupTxDataListeners(startAppListening)];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  useEffect(() => {
    appDispatch(fetchTxData());
  }, [appDispatch]);

  return (
    <>
      <h1 className="text-white text-center text-3xl tracking-wider my-10">DAI Explorer</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <SearchFields />
          <DataTable />
        </>
      )}
    </>
  );
};
