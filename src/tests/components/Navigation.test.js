import { shallow } from 'enzyme';
import { Navigation } from '../../components/Navigation';
import React from 'react';

test('app renders with no errors',()=>{
    const wrapper = shallow(<Navigation />);   
    expect(wrapper.debug()).toMatchSnapshot();
});