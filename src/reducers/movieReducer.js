import { GET_MOVIES_START, GET_MOVIES_RECIEVED, GET_MOVIES_ERROR } from '../actions/moviesActions';

export const movieReducer = (state = {
    movies: [],
    fetching: false,
    fetched: false,
    error: null
}, action) =>  {
    switch(action.type){
        case GET_MOVIES_START:
            return { ...state, fetching: true};
        case GET_MOVIES_RECIEVED:
            return { ...state, fetching: false, fetched: true, movies: action.payload.Search, error: action.payload.Response === 'False' ? true: false  };
        case GET_MOVIES_ERROR:
            return { ...state, fetching: false, error: action.payload};
        default:
            return state;
    };
};