import { getMovies } from '../../actions/moviesActions';
import moxios from 'moxios';
import { testStore } from '../../Utils';

describe('movies action generator', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly',  (done)  => {

            const expectedState = {
            "Search": [
              {
                "Title": "The Avengers",
                "Year": "2012",
                "imdbID": "tt0848228",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
              },
              {
                "Title": "Avengers: Infinity War",
                "Year": "2018",
                "imdbID": "tt4154756",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
              },
              {
                "Title": "Avengers: Age of Ultron",
                "Year": "2015",
                "imdbID": "tt2395427",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
              },
              {
                "Title": "Avengers: Endgame",
                "Year": "2019",
                "imdbID": "tt4154796",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
              }]
            };
        
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState  
                });
            });
            return store.dispatch(getMovies('Avengers'))
            .then(() => {
                const newState = store.getState();
                expect(newState.movies[0].Title).toEqual(expectedState.Search[0].Title);
                done();
            });
            
    });

});


        // console.log(getMovies('Avengers').toString());
        // const movie = getMovies('Avengers');
        // console.log(movie.toString());
        // done();
        // return store.dispatch(getMovies('Avengers')).then(res => console.log(res));