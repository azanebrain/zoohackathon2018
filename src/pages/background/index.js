import store from './store';
import { WPRemoteGet, getPosts } from '../../actions/PostActions';

// @todo: now that we're caching, we should version check to flush the cache.

console.log('store state', store.getState());

const { badgeText: currentBadgeText, categories: currentCategories } = store.getState();

/*

Background is persistent. 
Should be used for handling communication between: 
  1 external services
  2. content and popup scripts.

On background load
On initial load retrieve list of active categories and store in localstorage
retrieve 10 posts and store in localstorage


On content load
Retrieve categories from localstorage and find matching keywords within page, store matching category ID's

*/

/**
 * Adds a number to the badge
 *
 * @param {number} count The number to set in the badge
 */
function setBadgeCount(count) {
  // Can only support 4 digits
  if (count > 999) {
    count = '999+'
  }
  console.log('setting badge count to:' , count)
  chrome.browserAction.setBadgeText({
    text: count.toString()
  });
}


const handleBadgeText = () => {
  let previousText = currentBadgeText;
  const badgeText = store.getState().badgeText;

  if (previousText !== badgeText) {
    setBadgeCount(badgeText);
  }
}

store.subscribe(handleBadgeText);

/**
 * Clears the count from the badge
 */
function clearBadgeCount() {
  console.log('clearing')
  // set text to '' to remove the badge
  chrome.browserAction.setBadgeText({ text: '' });
}

function setBadgeToBadColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 128] });
}

function setBadgeToGoodColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 255, 0, 128] });
}

function setBadgeToMediumColor() {
  chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 128] });
}

const updateConConPosts = (data) => {
  console.log(data);
  chrome.storage.local.set({conconPosts: data});
  return data;
};

chrome.storage.local.get(['conconPosts'], async function(results) {

  console.log('conconPosts', results);

  if(Object.keys(results).length === 0) {
    WPRemoteGet('/posts/', updateConConPosts);
  }
  return results;
});

// look at localstorage see if posts exist, if not hit the endpoint and set to local storage.

/**
 * Listen for messages from the DOM
 * 
 * @param {Badge Message} message Updates the icon badge. Contains a count, a color, or both
 * @param {Post Message} message Contains the Post IDs that should be 
 */
chrome.runtime.onMessage.addListener((message) => {
  // Post Message:
  if (message.hasOwnProperty('posts')) {
    console.log('the message has posts: ', message.posts)
    chrome.storage.sync.set({posts: message.posts});
  }
});

if(store.getState().categories.length === 0) {
  WPRemoteGet(`/categories?per_page=100`, (data) => {
    data.map( (cat) => {
      const { id, link, name } = cat;
      const filterCat = ({id, link, name}) => ({id, link, name});
      store.dispatch({type: 'ADD_CATEGORY', id, name, link });
      return filterCat(cat);
    });
  });
}