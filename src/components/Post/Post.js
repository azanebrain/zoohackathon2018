import React from 'react';
import { Store } from "react-chrome-redux";
import { connect } from 'react-redux';

import Accordion from '../Accordion/Accordion';
import { Panel, PanelContainer } from '../Accordion/Panel';
import PostImage from './PostImage';
import PostTitle from './PostTitle';
import PostLearnMore from './PostLearnMore';

class Post extends React.PureComponent {

  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
    this.state = { backgroundImage: null };
  }

  clickCallback() {
    return this.props.updateActivePanels(this.props.id);
  }

  componentDidMount() {
    console.log('Post context', this);
    console.log(this.props.featuredMedia);
    
    this.props.fetchMedia(this.props.featuredMedia).then((media) => {
      // Utilize the media hosted on Jetpack's servers
      this.setState({backgroundImage: media.media_details.sizes.thumbnail.source_url })
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  render() {
    const { title, excerpt, link, isActive } = this.props;

    return(
      <div id={this.props.id} onClick={this.clickCallback}>
        <Accordion isActive={isActive}>
          <PostImage backgroundImage={this.state.backgroundImage} />
          <PostTitle dangerouslySetInnerHTML={{__html: title}}></PostTitle>
        </Accordion>
        <Panel isActive={isActive}>
          <PanelContainer isActive={isActive}>
            <div dangerouslySetInnerHTML={{__html: excerpt}}></div>
            <p><PostLearnMore href={link} target="_blank">Learn More</PostLearnMore></p>
          </PanelContainer>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    count: state.count,
    posts: state.posts,
    activePanels: state.activePanels
});

export default connect(mapStateToProps)(Post);