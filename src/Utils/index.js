import { applyMiddleware, createStore } from 'redux';
import { movieReducer } from '../reducers/movieReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

export const findByAttribute = (component, attribute) =>  component.find(`[data-test='${attribute}']`);

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(movieReducer, initialState);
};