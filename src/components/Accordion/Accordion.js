import styled from 'styled-components';

const Accordion = styled.button`
  background-color: ${props => (!props.isActive ? '#fff' : '#e7e7e8')};
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

  &::after {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    content: '${props => (!props.isActive ? '-' : '+')}';
    font-size: '${props => (!props.isActive ? '27px' : '42px')}';
    color: #777;
    float: right;
    margin-left: 5px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 24px;
  }

  &::hover {
    background-color: #e7e7e8;
  }
`;

export default Accordion;
