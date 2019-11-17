import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import { findByAttribute } from '../../Utils/index';

const setUp = ( props = {}) =>  shallow(<App {...props} />);

describe('App component', () => {

    test('app renders with no errors',() => {
        const component = setUp();
        const wrapper = findByAttribute(component, 'app'); 
        expect(wrapper.length).toBe(1);
    });

});