import React from 'react';
// import ReactDOM from 'react-dom';
import HomeScreen from 'root';

import { shallow } from 'enzyme';

describe('HomeScreen', () => {
  it('renders the home screen', () => {
    const wrapper =shallow(<HomeScreen />);

    expect(wrapper).toMatchInlineSnapshot();
  })
})
