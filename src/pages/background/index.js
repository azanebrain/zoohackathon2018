import { WPRemoteGet } from '../../actions/PostActions';

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
  chrome.storage.local.set({conconPosts: data});
  return data;
};

chrome.storage.local.get(['conconPosts'], async function(results) {

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
  console.log('A message: ' , message)
  // Badge Message:
  if (message.hasOwnProperty('count')) {
    if(message.count < 1) {
      clearBadgeCount()
    } else {
      setBadgeCount(message.count)
    }
  }
  if (message.hasOwnProperty('color')) {
    console.log('set a color')
  }

  // Post Message:
  if (message.hasOwnProperty('posts')) {
    console.log('the message has posts: ', message.posts)
    chrome.storage.sync.set({posts: message.posts});
  }
})

