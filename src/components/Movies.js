import React from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';

export const Movies = ({fetching, error, movies}) => {

        return(
            <React.Fragment>
                { !(fetching || error) && 
                <div data-testid='movies-container-large' data-test='movies-container-large' className='movies-container-large'>
                    {movies && movies.map((movie,index) => {
                        return <Movie key={index} title={movie.Title} year={movie.Year} type={movie.Type} image={movie.Poster} id={movie.imdbID}/>
                    })}
                </div>}

                {(fetching || error) && (
                    <div data-test='message-container' className='message-container'>
                        {fetching ? <p className='message-container__message'> Loading.. </p> :
                        error ? <p className='message-container__message'> No movie found with that name. Try again! </p>:
                        null}
                    </div>
                )}
                
            </React.Fragment>
            
        );
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched, fetching: state.fetching, error: state.error });

export default connect(mapStateToProps)(Movies);