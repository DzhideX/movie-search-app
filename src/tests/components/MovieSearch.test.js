import { shallow } from 'enzyme';
import { Movies } from '../../components/MovieSearch';
import React from 'react';

test('app renders with no errors',()=>{
    const wrapper = shallow(<Movies />);   
    expect(wrapper.debug()).toMatchSnapshot();
});