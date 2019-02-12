import React from 'react';
import styled from 'styled-components';

const StyledPost = styled.div`
  background-color: palevioletred;
`;

const Accordion = styled.button`
  background-color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.2s;
  position:relative;

  &:after {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    content: ${props => (props.isActive ? '-' : '+')};
    font-size: ${props => (props.isActive ? '42px' : '27px')};
    color: #777;
    float: right;
    margin-left: 5px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 24px;
  }
`;



const Panel = styled.div`
  background-color: white;
  display: block;
  max-height: ${props => (props.whiteColor ? 0 : '500px')};
  overflow: hidden;
  padding: 0;
  transition: max-height 0.25s linear;
`;

const PanelContainer = styled.div`
  padding: 0 16px 16px 84px;
  font-size: 14px;
`;

const PostImage = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  line-height: 1;
  background-position: center center;
  background-color: #e7e7e8;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  margin-right: 16px;
  background-image: url(${props => (props.backgroundImage ? props.backgroundImage : null)});
`;

const PostTitle = styled.span`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
`;

const PostLearnMore = styled.a`
  color: #00878b;
  font-weight: 400;
`;

export default class Post extends React.PureComponent {

  constructor(props) {
    super(props);
    this.fetchMedia = this.fetchMedia.bind(this);
    this.state = { backgroundImage: null };
  }

  clickCallback() {
    return this.props.clickEvent(this);
  }

  // I would like to make this into an abstract fetchOnce method.
  // I think it would live at the global state so we can cache
  // remote requests.
  fetchMedia(featuredMedia) {
    var domain = 'https://2018zoohackathon.ajzane.com';
    return fetch(`${domain}/wp-json/wp/v2/media/${featuredMedia}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
  }

  componentDidMount() {

    this.fetchMedia(this.props.featuredMedia).then((media) => {
      console.log('Media: ' , media)
      // Utilize the media hosted on Jetpack's servers

      this.setState({backgroundImage: media.media_details.sizes.thumbnail.source_url })
    })
    .catch(err => {
      console.log(err);
    });

  }

  render() {
    const { id, title, excerpt, link, clickEvent, isActive, featuredMedia } = this.props;
    return(
      <StyledPost onClick={this.clickCallback} isActive>
        <Accordion isActive>
          <PostImage backgroundImage={this.state.backgroundImage} />
          <PostTitle dangerouslySetInnerHTML={{__html: title}}></PostTitle>
        </Accordion>
        <Panel isActive>
          <PanelContainer isActive>
            <div dangerouslySetInnerHTML={{__html: excerpt}}></div>
            <p><PostLearnMore href={link} target="_blank">Learn More</PostLearnMore></p>
          </PanelContainer>
        </Panel>
      </StyledPost>
    );
  }
}
