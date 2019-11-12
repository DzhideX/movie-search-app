import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../../components/Navigation';

const setUp = ( props = {}) =>  shallow(<Navigation {...props} />);

const findByAttribute = (component, attribute) =>  component.find(`[data-test='${attribute}']`);

describe('Navigation component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    test('Navigation renders with no errors',()=>{
        const wrapper = findByAttribute(component,'navigation');
        expect(wrapper.length).toBe(1);
    });

    test('Navigation logo renders with no errors',()=>{
        const logo = findByAttribute(component,'navigation-logo');
        expect(logo.length).toBe(1);
    });

});