import styled from 'styled-components';

const Panel = styled.div`
background-color: white;
display: block;
max-height: ${props => (!props.isActive ? 0 : '500px')};
overflow: hidden;
padding: 0;
transition: max-height 0.25s linear;

.link-more { display: none; }
`;

const PanelContainer = styled.div`
padding: 0 16px 16px 84px;
font-size: 14px;
`;

export { Panel, PanelContainer };
