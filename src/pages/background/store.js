import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';

import reducer from '../../reducers';
import throttle from 'lodash/throttle';

import { saveState, loadState } from '../../util/localStorage';

const store = createStore(
  reducer,
  loadState()
);

store.subscribe(throttle(() => {
  saveState({
    settings: store.getState().settings,
  });
}), 1000);

wrapStore(store, {
  portName: 'CONCON',
});

export default store;