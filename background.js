// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * Adds a number to the badge
 *
 * @param {number} count The number to set in the badge
 */
function setBadgeCount(count) {
  chrome.browserAction.setBadgeText({
    text: count.toString()
  });
}

/**
 * Clears the count from the badge
 */
function clearBadgeCount() {
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

/**
 * Listen for messages from the DOM
 * 
 * @param {Badge Message} message Updates the icon badge. Contains a count, a color, or both
 * @param {Post Message} message Contains the Post IDs that should be 
 */
chrome.runtime.onMessage.addListener((message) => {
  console.log('A message: ' , message)
  // Badge Message:
  if (message.count) {
    setBadgeCount(message.count)
  }
  if (message.color) {
    console.log('set a color')
  }

  // Post Message:
  if (message.posts) {
    console.log('the message has posts')
    chrome.storage.sync.set('posts', function (data) {
      console.log('data: ', data)
      // changeColor.style.backgroundColor = data.color;
      // changeColor.setAttribute('value', data.color);
    });
  }
})

