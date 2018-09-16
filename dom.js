'use strict';

var domain = 'https://2018zoohackathon.ajzane.com';
var headers = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Whether highlights should be added to the screen
// This value is set by Background so that it persists between page transitions
var isHighlighting;

console.log('hello DOM: ', isHighlighting);

chrome.runtime.sendMessage(null, {
  getHighlightingValue: ''
}, null, (value) => {
  console.log('=======')
  console.log('callback value: ' , value)
  console.log('=======')
});

var port = chrome.runtime.connect({name: 'knockknock'});

(function () {
  port.postMessage({ joke: 'heyo' });
  port.onMessage.addListener((msg) => {
    console.log('knock knock msg: ', msg)
  });
  // A list of Category IDs that have been found on this page
  let categories = [];
  // The total number of words found on the page
  let countTotal = 0;

  fetch(`${domain}/wp-json/wp/v2/categories?per_page=100`, headers)
  .then((response) => response.json() )
  .then((jsonData) => {
    var context = document.querySelector("body"); // expensive.
    
    console.log('counting matches...')
    chrome.runtime.sendMessage(null, {
      count: '...'
    });

    jsonData.filter(category => category.name != "Uncategorized")
      // .map(category => category)
      .forEach((category) => {
        var options = {
          "done": function (count) {
            // Update the total count of matches
            countTotal += count
          },
          "each": function (node) {
            // For each match: Add this category's ID to a list to find matching posts 
            if (categories.indexOf(category.id) < 0) {
              categories.push(category.id)
            }
          },
          "caseSensitive": false,
          "ignoreJoiners": true,
          "separateWordSearch": false
        };
        var instance = new Mark(context);

        console.log('~am I highlighting? ', isHighlighting)
        // If this is the first run, start highlighting
        // if (isHighlighting === undefined) {
        //   isHighlighting = true
        // If the user has chosen to not highlight the page, exit
        // }
        if (!isHighlighting) {
          return
        }
        instance.mark(category.name, options);
      });
      
    console.log('total count: ' , countTotal)

    // Now that we have matching categories, find all of the Post IDs that belong to any of those categories
    console.log('Matching categories: ' , categories)
    // If there are no matches, no further work is needed
    if (categories.length < 1) {
      chrome.runtime.sendMessage(null, {
        count: 0
      });
      return
    }
    fetch(`${domain}/wp-json/wp/v2/posts?categories=${categories}`, headers)
      .then((response) => response.json() )
      .then((posts) => {
        console.log('posts: ' , posts)
        // Update the popup
        chrome.runtime.sendMessage(null, {
          count: countTotal,
          posts: posts.map(post => post.id)
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
})();



// chrome.runtime.onStartup.addListener((startup) => {
//   console.log('hello DOM - startup: ' , startup)
//   console.log('isHighlighting: ' , isHighlighting)
//   console.log('chrome storage: ', chrome.storage.sync.get('isHighlighting') )
// })

// Toggle highlights
// chrome.runtime.onMessage.addListener((message) => {
//   console.log('DOM message: ' , message)

//   // Toggle highlights
//   if (message.hasOwnProperty('showHighlights')) {
//     isHighlighting = message.showHighlights
//   }
// })
