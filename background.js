// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


console.log('hello BG');

chrome.storage.sync.set({ isHighlighting: true });

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

var cat = chrome.storage.local.get(['conconPosts'], async function(results) {

  if(Object.keys(results).length === 0) {

    var results = await fetch('https://2018zoohackathon.ajzane.com/wp-json/wp/v2/posts/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => { return response.json() })
    .then((jsonData) => {
      chrome.storage.local.set({conconPosts: jsonData});
      return jsonData;
    })
    .catch(err => {
      console.log(err);
    });
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

  // Toggle highlights
  if (message.hasOwnProperty('showHighlights')) {
    console.log('setting highlight sync value to ' ,message.showHighlights)
    // isHighlighting = message.showHighlights
    chrome.storage.sync.set({ isHighlighting: message.showHighlights });
  }
  
  if (message.hasOwnProperty('getHighlightingValue')) {
    console.log('got a message for the highlight val')
    return ({
      blearg: 'HEYO!!!'
    });
  }
})

chrome.runtime.onConnect.addListener((port) => {
  port.postMessage({gaah: 'fsdjdaafsd'})
  port.onMessagae.addListener((msg) => {
    console.log('background listener: ', msg)
  })
})
