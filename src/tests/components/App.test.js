import React from 'react';
import App from '../../components/App';
import { testStore } from '../../Utils/index';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForDomChange, cleanup, wait } from '@testing-library/react'

describe('App component', () => {

    afterEach(cleanup);

    test('app renders with no errors', async () => {
        
        const store = testStore();
        const { getByTestId, debug, getByText } = render(<Provider store={store}> <App /> </Provider> );

        const input = getByTestId('navigation-input');
        const button = getByTestId('navigation-search-button');

        setTimeout(() =>{
            fireEvent.change(input, { target: {value: 'Avengers' } });
            fireEvent.click(button);
        },0);

        await waitForDomChange().then(() => {
            console.log('changed!');
        });

        // await wait(() => getByTestId('movie-thumbnail'));

        // debug();

    });

});