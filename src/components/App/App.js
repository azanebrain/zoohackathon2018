import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styled, { createGlobalStyle } from 'styled-components';
import Post from '../Post/Post';
import AppBar from '../AppBar/AppBar';

import * as actionCreators from '../../redux/actions/actions';

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

const sizeImage = (image, width = 100, height = 100) => {
  const url = new URL(image);
  url.searchParams.set('fit', `${width},${height}`);
  return url;
};

class App extends React.Component {
  render() {
    const {
      posts,
      categories,
      count,
      matches,
      togglePost,
    } = this.props;

    const matchIDs = Object.keys(matches).map(id => parseInt(id));

    const filter = Object.entries(posts).filter(([id, post]) => {
      const {
        categories: postCat,
      } = post;

      const intersection = matchIDs.filter(element => postCat.includes(element));

      return intersection.length;
    });

    return (
      <React.Fragment>
        <GlobalStyle />
        <AppBar count={count} />

        <div id="posts">
          {
          filter.map(([id, post]) => {
            const {
              excerpt,
              title,
              link,
              jetpack_featured_media_url,
              isActive,
            } = post;
            const sizedImage = sizeImage(jetpack_featured_media_url);
            return (
              <Post
                id={id}
                title={title}
                excerpt={excerpt}
                link={link}
                updateActivePanels={togglePost}
                isActive={isActive}
                featuredMedia={sizedImage}
              />
            );
          })
        }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories,
  count: state.count,
  matches: state.matches,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

App.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.object,
  count: PropTypes.number,
  matches: PropTypes.object,
  togglePost: PropTypes.bool,
};

App.defaultProps = {
  posts: {},
  categories: {},
  count: 0,
  matches: {},
  togglePost: false,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
