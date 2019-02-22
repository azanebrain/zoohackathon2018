import Mark from 'mark.js';
import { contentMutations } from '../../utilities/utilities';
import { increment, resetCount, resetMatches, categoryMatch } from '../../redux/actions/actions';
import throttle from 'lodash/throttle';

import { Store } from 'react-chrome-redux';
const store = new Store({
  portName: 'CONCON'
});

console.log('CONTENT SCRIPT: RUNNING');

/* lifecycle of the content script.
1. Page loads,
2. content script runs,
3. dies on page change.
*/

let previousStatus = { status: 'not loaded' };

store.ready( () => {

  console.log('CONTENT SCRIPT: STORE READY');

  previousStatus = store.getState().page.status;

});


store.subscribe(throttle(() => {
  const page = store.getState().page;

  // run at the very end of the page load and whenever a page change event is fired
  if( previousStatus !== 'complete' && page.status === 'complete' ) {
    contentMutations(init);
    console.log('pageStatus', page);
  }

  previousStatus = page.status;

  console.log('store', store.getState());
}, 400));

const init = () => {
  const categories = store.getState().categories;
  store.dispatch(resetCount());
  store.dispatch(resetMatches());
  Object.entries(categories).map(([key, category]) => {
    runMark(category);
  });
}

// run mark js on a specific "category" term
const runMark = (category) => {
  var options = {
    "done": (count) => { console.log('count', count); updateCount(count);},
    "each": () => onMatch(category.id),
    "caseSensitive": false,
    "ignoreJoiners": true,
    "separateWordSearch": false
  };
  var instance = new Mark(document.body);
  instance.mark(category.name, options);
};

const updateCount = (count) => {
  store.dispatch(increment(count));
}

// For each match: Add this category's ID to a list to find matching posts 
const onMatch = (category) => { console.log(category);
  store.dispatch(categoryMatch(category));
};
