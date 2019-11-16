import { movieReducer } from '../../reducers/movieReducer';

describe('Movie Reducer', () => {
    
    test('Should return default state', () => {
        
        const newState = movieReducer(undefined,{});
        expect(newState).toEqual({"error": null, "fetched": false, "fetching": false, "movies": []});

    });

    test('Should return new state if recieving GET_MOVIES_START', () => {
        
        const newState = movieReducer(undefined, {type: 'GET_MOVIES_START'} );
        expect(newState).toEqual({"error": null, "fetched": false, "fetching": true, "movies": []});

    });

    test('Should return new state if recieving GET_MOVIES_RECIEVED', () => {
        
        const defaultState = { 
            movies: [],
            fetching: false,
            fetched: false,
            error: null 
        };
        const movies = [
            'Avengers', 'Avengers: Endgame', 'Avengers: Infinity War'
        ]
        const newState = movieReducer(undefined, {type: 'GET_MOVIES_RECIEVED',payload: { Search: movies}} );
        expect(newState).toEqual({"error": false, "fetched": true, "fetching": false, "movies": ["Avengers", "Avengers: Endgame", "Avengers: Infinity War"]});

    });

    test('Should return new state if recieving GET_MOVIES_ERROR', () => {
        
        const newState = movieReducer(undefined, {type: 'GET_MOVIES_ERROR', payload: 'There was an error!' });
        expect(newState).toEqual({"error": "There was an error!", "fetched": false, "fetching": false, "movies": []});

    });

});