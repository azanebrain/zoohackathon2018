import React from 'react';
import uuid from 'uuid/v4';

import styled, { createGlobalStyle } from 'styled-components';
import Post from '../../components/Post/Post';

import * as actionCreators from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
sup { font-weight: 100; }
`;

class App extends React.Component {

  sizeImage(image, width=100, height=100) {
    const url = new URL(image);
    url.searchParams.set('fit',`${width},${height}`);
    return url;
  }

render() {
  const {posts, categories, count, matches} = this.props;
  
  const matchIDs = Object.keys(matches).map((id) => parseInt(id));

  const filter = Object.entries(posts).filter(([id, post]) => {
    const {
      categories: postCat,
    } = post;

    const intersection = matchIDs.filter(element => { return postCat.includes(element); });

    return intersection.length;
  });

  return (
  <React.Fragment>
    <GlobalStyle />
    <Container>
      <h1>Conscious Consumer <sup>{this.props.count}</sup></h1>
    </Container>

    <div id="posts">
      {
        
        filter.map(([id, post]) => {
          const {
            excerpt,
            title,
            link,
            categories,
            jetpack_featured_media_url: jetpack_featured_media_url,
            isActive,
          } = post;
          const sizedImage = this.sizeImage(jetpack_featured_media_url);
          return (
            <Post 
              id={id}
              title={title}
              excerpt={excerpt}
              link={link}
              updateActivePanels={this.props.togglePost}
              isActive={isActive}
              featuredMedia={sizedImage}
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
    posts: state.posts,
    categories: state.categories,
    count: state.count,
    matches: state.matches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

App.defaultProps = {
  posts: {},
  categories: {},
  count: 0,
  matches: {}
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
