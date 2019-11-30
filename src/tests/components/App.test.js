import React from 'react';
import App from '../../components/App';
import { testStore } from '../../Utils/index';
import { Provider } from 'react-redux';
import { render, cleanup, wait } from '@testing-library/react';
import moxios from 'moxios';
import { expectedState } from '../Utils';
import { getMovies } from '../../actions/moviesActions';

describe('App component', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    afterEach(cleanup);

    test('app renders with no errors and simulates a search that properly updates the dom', async () => {
        
        const store = testStore();
        const { getByTestId } = render(<Provider store={store}> <App /> </Provider> );

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState  
            });
        });
        return store.dispatch(getMovies('Avengers'))
        .then(() => {
            const movieThumbnail = getByTestId('movies-container-large');     
            expect(movieThumbnail.children.length).toBe(4);
        });

    });

});