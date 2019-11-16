import React from 'react';
import { shallow } from 'enzyme';
import MovieRating from '../../components/MovieRating';

const setUp = (props = {}) => shallow(<MovieRating {...props} />);

const findByAttribute = (component, attribute) =>  component.find(`[data-test='${attribute}']`);

describe('Movie rating', () => {


    describe('Have props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                rating: {
                    Source: 'Rotten Tomatoes',
                    Value:92.3
                }
            };
            wrapper = setUp(props);
        });

        test('renders without errors', () => {
            const component = findByAttribute(wrapper, 'movie-rating-card');
            expect(component.length).toBe(1);
        });

        test('renders image', () => {
            const component = findByAttribute(wrapper, 'movie-rating-card-image');
            expect(component.length).toBe(1);
        });

        test('renders card value', () => {
            const component = findByAttribute(wrapper, 'movie-rating-card-value');
            expect(component.text()).toBe(' 92.3 ');
        });

    });

});