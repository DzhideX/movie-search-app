import { shallow } from 'enzyme';
import App from '../../components/App';
import React from 'react';

test('app renders with no errors',()=>{
    const wrapper = shallow(<App />);   
    expect(wrapper.debug()).toMatchSnapshot();
});