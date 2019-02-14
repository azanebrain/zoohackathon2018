import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import App from '../../components/App/App';
import { fetchMedia, getPosts, getRelevantPosts } from '../../actions/PostActions';


const store = new Store({
  portName: 'CONCON'
});

console.log(store.getState().categories);

store.dispatch({ type: 'ADD_COUNT'});

store.subscribe(() => console.log('store', store.getState()));

const appActions = {
  getPosts: getPosts,
  getRelevantPosts: getRelevantPosts,
  fetchMedia: fetchMedia
};



const mountNode = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <App actions={appActions}/>
  </Provider>, mountNode);
