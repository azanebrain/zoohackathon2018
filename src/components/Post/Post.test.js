import React from 'react';
import Post from './Post';

describe('Post Component', () => {
  test('renders', () => {
    const component = shallow(
      <Post
        id={12}
        title="String Post Title"
        excerpt="<p>Excerpt with <strong>html</strong></p>"
        link="https://google.com/"
        updateActivePanels={id => !this.prop.isActive}
        isActive
        featuredMedia="https://i0.wp.com/2018zoohackathon.ajzane.com/wp-content/uploads/2018/09/Moschus_moschiferus_in_Plzen_zoo_12.02.2011-1.jpg?fit=100%2C100&ssl=1"
      />,
    );

    expect(component.exists()).toBe(true);
  });
});
