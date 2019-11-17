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
            const expectedState = [{ title: 'Avengers'}, { title: 'Avengers: Infinity War'}, { title: 'Avengers: Endgame'}];
        
            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState  
                });
            });
            return store.dispatch(getMovies('Avengers'))
            .then((res) => {
                const newState = store.getState();
                console.log(newState, res);
                done();
            });
            
    });

});


        // console.log(getMovies('Avengers').toString());
        // const movie = getMovies('Avengers');
        // console.log(movie.toString());
        // done();
        // return store.dispatch(getMovies('Avengers')).then(res => console.log(res));