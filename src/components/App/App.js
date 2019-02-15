import React from 'react';
import {connect} from 'react-redux';
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
  this.state = { posts: [] }; // @todo remove state and move into redux store.
}

componentDidMount() {
  
  const { getRelevantPosts, getPosts } = this.props.actions;

  Promise.all([getRelevantPosts(), getPosts()]).then(values => {
    const [ relevantPosts, posts ] = values;

    const filteredPosts = posts.filter((category) => relevantPosts.includes(category.id));
    
    this.setState({ 'posts': filteredPosts });
  });
}

componentDidUpdate() {
  console.log('app.props.categories', this.props.categories);
}

render() {
  const { posts } = this.state;
  const { fetchMedia } = this.props.actions;
  return (
  <React.Fragment>
    <GlobalStyle />
    <Container>
      <h1>Conscious Consumer {this.props.badgeText}</h1>
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
              isActive={false}
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

const mapStateToProps = (state) => {
  return {
    badgeText: state.badgeText,
    settings: state.settings,
    panels: state.panels,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(App);
