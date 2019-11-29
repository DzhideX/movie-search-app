import axios from 'axios';

const GET_MOVIES_START = 'GET_MOVIES_START';
const GET_MOVIES_RECIEVED = 'GET_MOVIES_RECIEVED';
const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';

export const getMovies = (movie) => {
    return function(dispatch) {
                dispatch({type: GET_MOVIES_START});
    /*await*/   return axios.get(`http://www.omdbapi.com/?apikey=10d92ac&s=${movie}`)
                .then(response => {
                    dispatch({type: GET_MOVIES_RECIEVED, payload: response.data});
                })
                .catch(error => {
                    dispatch({type: GET_MOVIES_ERROR, payload: error});
                });
    };
};

export { GET_MOVIES_START, GET_MOVIES_RECIEVED, GET_MOVIES_ERROR };