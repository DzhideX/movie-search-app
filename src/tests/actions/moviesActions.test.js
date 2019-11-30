import { getMovies } from '../../actions/moviesActions';
import moxios from 'moxios';
import { testStore } from '../../Utils';
import { expectedState } from '../Utils';

describe('movies action generator', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly',  (done)  => {
        
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