import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { SearchFields } from '../SearchFields';

describe('SearchFields', () => {
  const mockStore = configureStore();
  const store = mockStore({
    transforms: { filters: { sender: '', recipient: '' }, ordering: [] },
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('renders the search fields', () => {
    render(
      <Provider store={store}>
        <SearchFields />
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Sender')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Recipient')).toBeInTheDocument();
  });

  it('dispatches the filter update action when a search field is updated', () => {
    render(
      <Provider store={store}>
        <SearchFields />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Sender'), { target: { value: 'Alice' } });

    expect(store.getActions()).toEqual([
      { payload: undefined, type: 'txData/onFilterUpdated' },
      { payload: { key: 'sender', val: 'Alice' }, type: 'txData/triggerFilterUpdate' },
    ]);
  });

  it('dispatches the onFilterUpdated action when a search field is updated', () => {
    render(
      <Provider store={store}>
        <SearchFields />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('Recipient'), { target: { value: 'Bob' } });

    expect(store.getActions()).toEqual([
      { payload: undefined, type: 'txData/onFilterUpdated' },
      { payload: { key: 'recipient', val: 'Bob' }, type: 'txData/triggerFilterUpdate' },
    ]);
  });
});
