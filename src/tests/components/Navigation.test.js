import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../../components/Navigation';
import { findByAttribute,testStore } from '../../Utils/index';

const setUp = ( initialState = {}) =>  {
    const store = testStore(initialState)
    const wrapper = shallow(<Navigation store={store} />);
    return wrapper;
};

describe('Navigation component', () => {

    let component;
    beforeEach(() => {
        const initialState = {
            movies: [],
            fetching: false,
            fetched: false,
            error: null
        };
        component = setUp(initialState);
    });

    test('Navigation renders with no errors',()=>{
        const wrapper = findByAttribute(component,'navigation');
        expect(wrapper.length).toBe(1);
    });

    test('Navigation logo renders with no errors',()=>{
        const logo = findByAttribute(component,'navigation-logo');
        expect(logo.length).toBe(1);
    });

    test('Navigation input renders with no errors',()=>{
        const input = findByAttribute(component,'navigation-input');
        expect(input.length).toBe(1);
    });

    test('Navigation search button renders with no errors',()=>{
        const button = findByAttribute(component,'navigation-search-button');
        expect(button.length).toBe(1);
    });

    // test('Should update state when typing', () => {
    //     const input = findByAttribute(component,'navigation-input');
    //     input.simulate('onChange', {
    //         preventDefault: () => { }
    //     });
    //     expect(component.state('value').length).toBeGreaterThan(0);
    // });

});