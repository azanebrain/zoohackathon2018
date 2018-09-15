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
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.count) {
    setBadgeCount(message.count)
  }
  if (message.color) {
    console.log('set a color')
  }
})

/*

// text highlighter plugin.
https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/jquery.mark.es6.min.js

var headings = document.evaluate("/html/body//h2", document, null, XPathResult.ANY_TYPE, null); 

var thisHeading = headings.iterateNext(); 
var alertText = "Level 2 headings in this document are:\n";
while (thisHeading) {
  thisHeading.style.backgroundColor = "red";
  thisHeading = headings.iterateNext();
}
console.log(alertText); // Alerts the text of all h2 elements

*/
