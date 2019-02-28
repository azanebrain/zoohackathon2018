import React from 'react';

// import { connect } from 'react-redux';

import Accordion from '../Accordion/Accordion';
import { Panel, PanelContainer } from '../Accordion/Panel';
import PostImage from './PostImage';
import PostTitle from './PostTitle';
import PostLearnMore from './PostLearnMore';

class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }

  clickCallback() {
    return this.props.updateActivePanels(this.props.id);
  }

  render() {
    const { title, excerpt, link, isActive } = this.props;

    return (
      <div id={this.props.id} onClick={this.clickCallback}>
        <Accordion isActive={isActive}>
          <PostImage backgroundImage={this.props.featuredMedia} />
          <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
        </Accordion>
        <Panel isActive={isActive}>
          <PanelContainer isActive={isActive}>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            <p>
              <PostLearnMore href={link} target="_blank">
                Learn More
              </PostLearnMore>
            </p>
          </PanelContainer>
        </Panel>
      </div>
    );
  }
}

export default Post;
