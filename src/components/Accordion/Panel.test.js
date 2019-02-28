import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Panel } from './Panel';

test('Active Panel renders 500px tall', () => {
  const tree = renderer.create(<Panel isActive />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-height', '500px');
});

test('Inactive Panel renders 0px tall', () => {
  const tree = renderer.create(<Panel isActive={false} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('max-height', '0');
});
