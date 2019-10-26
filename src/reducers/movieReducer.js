export const movieReducer = (state = {
    movies: [],
    fetching: false,
    fetched: false,
    error: null
}, action) =>  {
    switch(action.type){
        case 'GET_MOVIES_START':
            return { ...state, fetching: true};
            // eslint-disable-next-line
            break;
        case 'GET_MOVIES_RECIEVED':
            return { ...state, fetching: false, fetched: true, movies: action.payload.Search, error: action.payload.Response === 'False' ? true: false  };
            // eslint-disable-next-line
            break;
        case 'GET_MOVIES_ERROR':
            return { ...state, fetching: false, error: action.payload};
            // eslint-disable-next-line
            break;
        default:
            return state;
    };
};