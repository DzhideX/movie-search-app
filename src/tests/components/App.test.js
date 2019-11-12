import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

const setUp = ( props = {}) =>  shallow(<App {...props} />);

const findByAttribute = (component, attribute) =>  component.find(`[data-test='${attribute}']`);

describe('App component', () => {

    test('app renders with no errors',() => {
        const component = setUp();
        const wrapper = findByAttribute(component, 'app'); 
        expect(wrapper.length).toBe(1);
    });

});