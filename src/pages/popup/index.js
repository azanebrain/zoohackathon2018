import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Post from '../../components/Post/Post.js';

const Container = styled.div`
  padding: 16px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    width: 20rem;
    margin:0;
    font-color: #666666;
  }
`;



/*

.link-more {display: none;}

.post.active .accordion, .accordion:hover {
    background-color: #e7e7e8;
}

.post.active .accordion:after {
  content: "-";
  font-size: 42px;
}

*/

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


/**
 * Initialize this view
 */
async function init() {

  var acc = document.getElementsByClassName("accordion");
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

  
}



const mountNode = document.getElementById('app');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = { posts: [] };
  }

  getPosts() {
    return new Promise(function(resolve, reject) {
      chrome.storage.local.get(['conconPosts'], (items) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        }else{
          resolve(items['conconPosts']);
        }
      });
    });
  }

  getRelevantPosts() {
    // Show the posts which should be shown
    return new Promise(function(resolve, reject) {
      chrome.storage.sync.get('posts', function(data) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        }else{
          resolve(data.posts);
        }
      });
    });
  }

  clickEvent(callback) {
    console.log(callback);
  }

  componentDidMount() {
    const relevantPosts = this.getRelevantPosts(); //.then((posts) => posts);
    const getPosts = this.getPosts(); //.then((posts) => this.setState({ 'posts': posts }));
    Promise.all([relevantPosts, getPosts]).then(values => {
      const [ relevantPosts, posts ] = values;

      const filteredPosts = posts.filter((post) => relevantPosts.includes(post.id));
      this.setState({ 'posts': filteredPosts })
    });
  }

  render() {
    const { posts } = this.state;
    return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <h1>Conscious Consumer</h1>
      </Container>

      <div id="posts">

      {
        posts.map((post) => {
          const {
            excerpt: { rendered: excerpt },
            title: {rendered: title},
            link,
            id,
            featured_media: featuredMedia
          } = post;
          return (
            <Post 
              id={id}
              title={title}
              excerpt={excerpt}
              link={link}
              clickEvent={this.clickEvent}
              isActive={true}
              featuredMedia={featuredMedia}
            />
          );
        })
      }

    </div>
  </React.Fragment>);
  }
}


ReactDOM.render(<App/>, mountNode);

//init();
