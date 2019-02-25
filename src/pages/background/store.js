import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';

import reducer from '../../redux/reducers';

import { saveState, loadState } from '../../utilities/localStorage';

const store = createStore(reducer, loadState());

store.subscribe(() => {
  saveState({
    categories: store.getState().categories,
    // count: store.getState().count,
    matches: store.getState().matches,
    panel: store.getState().panel,
    posts: store.getState().posts,
    settings: store.getState().settings,
  });
});

wrapStore(store, {
  portName: 'CONCON',
});

export default store;
