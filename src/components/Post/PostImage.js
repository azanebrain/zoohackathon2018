import styled from 'styled-components';

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

export default PostImage;
