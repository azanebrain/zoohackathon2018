import React from 'react';
import uuid from 'uuid/v4';


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



class App extends React.Component {

constructor(props) {
  super(props);
  this.updateActivePanels = this.updateActivePanels.bind(this);
  this.state = { posts: [], activePanels: {}, count: 0 }; // @todo remove state and move into redux store.
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

export default App;
