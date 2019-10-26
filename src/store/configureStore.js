import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { movieReducer } from '../reducers/movieReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, logger);
export const store = createStore(movieReducer,composeEnhancers(middleware));

store.subscribe(() => {
    console.log(store.getState());
});
