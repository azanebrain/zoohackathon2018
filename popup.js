// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * Grab post content from storage (set by Background)
 * Apply to Popup's DOM
 */
async function loadPosts() {
  chrome.storage.local.get(['conconPosts'], (posts) => {
    // console.log('posts: ' , posts)
    var postsBlock = document.getElementById('posts')

    posts.conconPosts.forEach(post => {
      // console.log('adding post: ' , post)
      var newPost = document.createElement('div')
      newPost.className = `post-${post.id}`
      newPost.innerHTML = `
        Title: ${post.title.rendered}
        Link: ${post.link}
        <div class="inner">
        ${post.excerpt.rendered}
        </div>
      `
      postsBlock.appendChild(newPost)
    });
  })
}

loadPosts()

chrome.storage.sync.get('posts', function(data) {
  console.log('data: ' , data)
  // for each data
  // that post with the id: add .show
  // if not: add .hide


  // changeColor.style.backgroundColor = data.color;
  // changeColor.setAttribute('value', data.color);
});
