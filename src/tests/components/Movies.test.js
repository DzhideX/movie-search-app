import React from 'react';
import { shallow } from 'enzyme';
import { Movies } from '../../components/Movies';
import { findByAttribute,testStore } from '../../Utils/index';

const setUp = ( initialState = {}) =>  {
    const store = testStore(initialState);
    const wrapper = shallow(<Movies store={store} />);
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

    test('Movies container renders with no errors',()=>{
        const wrapper = findByAttribute(component,'movies-container-large');
        expect(wrapper.length).toBe(1);
    });

    test('Message container renders with no errors',()=>{
        const store = testStore();
        const wrapper = shallow(<Movies store={store} />);
        wrapper.setProps({ fetching: true });
        const messageContainer = findByAttribute(wrapper,'message-container');
        expect(messageContainer.length).toBe(1);
    });

});