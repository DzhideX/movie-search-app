import axios from 'axios';

export const getMovies = (movie) => {
    return function(dispatch) {
                dispatch({type: 'GET_MOVIES_START'});
    /*await*/   axios.get(`http://www.omdbapi.com/?apikey=10d92ac&s=${movie}`)
                .then(response => {
                    dispatch({type: 'GET_MOVIES_RECIEVED', payload: response.data});
                })
                .catch(error => {
                    dispatch({type: 'GET_MOVIES_ERROR', payload: error});
                });
    };
};