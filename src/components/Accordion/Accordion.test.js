import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Accordion from './Accordion';

test('Active Accordion renders with background color', () => {
  const tree = renderer.create(<Accordion isActive={true} />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('background-color', '#e7e7e8');
})

test('Inactive Accordion renders with background color', () => {
  const tree = renderer.create(<Accordion isActive={false} />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('background-color', '#fff');
})