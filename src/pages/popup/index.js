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
    color: #666666;
  }
`;


const fetchMedia = (media) => {
  var domain = 'https://2018zoohackathon.ajzane.com';
  return fetch(`${domain}/wp-json/wp/v2/media/${media}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json());
};

const getPosts = () => {
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
};

const getRelevantPosts = () => {
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
};


const appActions = {
  fetchMedia: fetchMedia,
  getPosts: getPosts,
  getRelevantPosts: getRelevantPosts,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.updateActivePanels = this.updateActivePanels.bind(this);
    this.state = { posts: [], activePanels: {} };
  }

  updateActivePanels(id) {
    // clone so we don't overwrite state directly
    console.log(this);
    let active = Object.create(this.state.activePanels);
    active[id] = 1 - (active[id]|0);
    this.setState({ activePanels: active });
  }

  componentDidMount() {

    const { getRelevantPosts, getPosts } = this.props.actions;

    Promise.all([getRelevantPosts(), getPosts()]).then(values => {
      const [ relevantPosts, posts ] = values;

      const filteredPosts = posts.filter((post) => relevantPosts.includes(post.id));
      this.setState({ 'posts': filteredPosts });
    });
  }

  render() {
    const { posts } = this.state;
    const { fetchMedia } = this.props.actions;
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
              updateActivePanels={this.updateActivePanels}
              isActive={this.state.activePanels[id]||false}
              featuredMedia={featuredMedia}
              fetchMedia={fetchMedia}

            />
          );
        })
      }

    </div>
  </React.Fragment>);
  }
}


const mountNode = document.getElementById('app');
ReactDOM.render(<App actions={appActions}/>, mountNode);
