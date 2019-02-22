import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import App from '../../components/App/App';

/* lifecycle of the popup.
1. user clicks icon
2. popup opens and runs,
3. dies when the user clicks the ui icon, to close the popup.
*/

const store = new Store({
  portName: 'CONCON'
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
