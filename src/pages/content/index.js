import Mark from 'mark.js';
import { WPRemoteGet } from '../../actions/PostActions';

// A list of Category IDs that have been found on this page
let categories = [];
// The total number of words found on the page
let countTotal = 0;


// Update the popup
const updateCountAndPosts = (posts) => {
  chrome.runtime.sendMessage(null, {
    count: countTotal,
    posts: posts.map(post => post.id)
  });
};

// Update the total count of matches
const updateCount = (count) => {
  countTotal += count;
};

// For each match: Add this category's ID to a list to find matching posts 
const onMatch = (node, category) => {
  if (categories.indexOf(category.id) < 0) {
    categories.push(category.id);
  }
};

// run mark js on a specific "category" term
const runMark = (category) => {
  var options = {
    "done": (count) => updateCount(count),
    "each": (node) => onMatch(node, category),
    "caseSensitive": false,
    "ignoreJoiners": true,
    "separateWordSearch": false
  };
  var instance = new Mark(document.body);
  instance.mark(category.name, options);
};


const findAllMatches = (jsonData) => {
  console.log('counting matches...');
  chrome.runtime.sendMessage(null, {
    count: '...'
  });

  jsonData.filter(category => category.name != "Uncategorized")
    // .map(category => category)
    .forEach((category) => runMark(category));
    
  console.log('total count: ' , countTotal);

  // Now that we have matching categories, find all of the Post IDs that belong to any of those categories
  console.log('Matching categories: ' , categories);
  // If there are no matches, no further work is needed
  if (categories.length < 1) {
    chrome.runtime.sendMessage(null, {
      count: 0
    });
    return;
  }
  WPRemoteGet(`/posts?categories=${categories}`, updateCountAndPosts);
};

WPRemoteGet(`/categories?per_page=100`, findAllMatches);