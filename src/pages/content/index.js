import Mark from 'mark.js';
import throttle from 'lodash/throttle';
import { Store } from 'react-chrome-redux';
import { contentMutations } from '../../utilities/utilities';
import {
  increment,
  resetCount,
  resetMatches,
  categoryMatch,
} from '../../redux/actions/actions';

const store = new Store({
  portName: 'CONCON',
});

console.log('CONTENT SCRIPT: RUNNING');

/* lifecycle of the content script.
1. Page loads,
2. content script runs,
3. dies on page change.
*/

let previousStatus = { status: 'not loaded' };

store.ready(() => {
  console.log('CONTENT SCRIPT: STORE READY');

  previousStatus = store.getState().page.status;
});

// For each match: Add this category's ID to a list to find matching posts
const onMatch = (category) => {
  console.log(category);
  store.dispatch(categoryMatch(category));
};

const updateCount = (count) => {
  store.dispatch(increment(count));
}

// run mark js on a specific "category" term
const runMark = (category) => {
  const options = {
    done: count => updateCount(count),
    each: () => onMatch(category.id),
    caseSensitive: false,
    ignoreJoiners: true,
    separateWordSearch: false,
  };
  const instance = new Mark(document.body);
  instance.mark(category.name, options);
};

const init = () => {
  const { categories } = store.getState();
  store.dispatch(resetCount());
  store.dispatch(resetMatches());
  Object.entries(categories).map(([key, category]) => runMark(category));
}

store.subscribe(throttle(() => {
  const { page } = store.getState();

  // run at the very end of the page load and whenever a page change event is fired
  if (previousStatus !== 'complete' && page.status === 'complete') {
    contentMutations(init);
    console.log('pageStatus', page);
  }

  previousStatus = page.status;

  console.log('store', store.getState());
}, 400));
