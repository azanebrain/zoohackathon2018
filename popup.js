// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// grab post content from local storage
// apply to Popup's DOM

/**
 * Listen for messages from the DOM
 * 
 * @param message A Posts Message object that contains ...?
 */
chrome.runtime.onMessage.addListener((message) => {
  console.log('message: ' , message)

  // Set the posts to the popup
})

chrome.storage.sync.get('posts', function(data) {
  console.log('data: ' , data)
  // for each data
  // that post with the id: add .show
  // if not: add .hide


  // changeColor.style.backgroundColor = data.color;
  // changeColor.setAttribute('value', data.color);
});
