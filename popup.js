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
      // All posts start off hidden
      newPost.className = `post hidden`
      newPost.id = `post-${post.id}`
      newPost.innerHTML = `
        <button class="accordion"><span style="background-image:url(http://lorempixel.com/250/200);" class="post-image"></span>${post.title.rendered}</button>
        <div class="panel">
          <div class="panel-container">
            <p>${post.excerpt.rendered}</p>
            <p><a href="${post.link}" target="_blank" class="post-learnmore">Learn More</a></p>
          </div>
        </div>
      `
      postsBlock.appendChild(newPost);

      newPost.onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      };
    });
  })
}

function setHighlightState() {
  console.log('#######')
  console.log('need to set highlight state on init')
  console.log('#######')
}

/**
 * Initialize this view
 */
async function init() {
  await loadPosts();
  setHighlightState(); 

  var acc = document.getElementsByClassName("accordion");
  console.log(acc);
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() { console.log('foo');
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }

  // Show the posts which should be shown
  chrome.storage.sync.get('posts', function(data) {
    console.log('data: ' , data)
    data.posts.forEach(postId => {
      document.getElementById(`post-${postId}`).classList.remove('hidden')
    });
  });
}

init();

// // Toggle highlights
// var highlightToggle = document.getElementsByName('highlights')

// highlightToggle.addEventListener('Click', (event) => {
//   // chrome.runtime.sendMessage(null, {
//   //   showHighlights: false
//   // });
// })

function toggleHighlight(show) {
  console.log('toggleHighlight: ', show)
}

// Enable Highlighting
document.getElementsByName("highlights")[0].addEventListener("click", function () {
  console.log('a 0 click!')
  toggleHighlight(true)
});

// Disable Highlighting
document.getElementsByName("highlights")[1].addEventListener("click", function () {
  console.log('a 1 click!')
  toggleHighlight(false)
});

/**
 * Toggles whether the DOM should show highlights
 * 
 * Emits a message to the DOM
 * @param {boolean} showHighlights: TRUE when the DOM should show highlights
 */
function toggleHighlight(showHighlights) {
  console.log('toggling highlight to: ' , showHighlights)


  // chrome.storage.sync.set({ isHighlighting: message.showHighlights });
  // Directly execute on DOM
  function modifyDOM(showHighlights) {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');

    console.log('before isHighlighting: ', isHighlighting);
    isHighlighting = showHighlights;
    console.log('after isHighlighting: ', isHighlighting);
    return document.body.innerHTML;
  }
  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: `(${modifyDOM})(${showHighlights});`,
    foo: 'bar'
  });

  // Tell Background to tell DOM
  // chrome.runtime.sendMessage(null, {
  //   showHighlights: showHighlights
  // });

  // To communicate directly with the DOM:
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) {
      chrome.tabs.sendMessage(tabArray[0].id, {
        showHighlights: showHighlights
      });
    }
  );
}
