import Mark from 'mark.js';
import { WPRemoteGet } from '../../actions/PostActions';
import { Store } from 'react-chrome-redux';

const store = new Store({
  portName: 'CONCON',
})

store.dispatch({type: 'RESET_BADGE_TEXT'});

// Update the popup
const updatePosts = (posts) => {
  chrome.runtime.sendMessage(null, {
    posts: posts.map(post => post.id)
  });
};

// For each match: Add this category's ID to a list to find matching posts 
const onMatch = (category_id) => {
  store.dispatch({type: 'CATEGORY_MATCH', id: category_id });
};

// run mark js on a specific "category" term
const runMark = (category) => {
  var options = {
    "done": (count) => {
      store.dispatch({type: 'SET_BADGE_TEXT', text: count.toString()})
    },
    "each": () => onMatch(category.id),
    "caseSensitive": false,
    "ignoreJoiners": true,
    "separateWordSearch": false
  };
  var instance = new Mark(document.body);
  instance.mark(category.name, options);
};

const findAllMatches = (categories) => {

  const { match } = store.getState();

  // If there are no matches, no further work is needed
  const length = categories.length;
  if (categories.length < 1) {
    store.dispatch({type: 'SET_BADGE_TEXT', length });
    return;
  }

  const matchCategories = Object.keys(match);
  
  //WPRemoteGet(`/posts?categories=${matchCategories}`, updatePosts);
};

store.ready(() => {
  const { categories } = store.getState();

  categories
    .filter(category => category.name != "Uncategorized")
    .forEach((category) => runMark(category));

  findAllMatches(categories);
});
