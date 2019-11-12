import React, { useState } from 'react';
import { getMovies } from '../actions/moviesActions';
import { store } from '../store/configureStore';
import { connect } from 'react-redux';

export const Navigation = () =>{

    const [value, setValue] = useState('');

    const updateInput = (e) => {
        const value = e.target.value;
        setValue(value);
    };

    const handleSubmit = async () => {
        if(value){
            store.dispatch(getMovies(value));
        }
    }

    const handleKeyPress = (target) => {
        if(value && target.charCode===13){
            store.dispatch(getMovies(value));
        }
    }
    
        return(
            <div data-test='navigation' className='navigation'>
                <h3 data-test='navigation-logo' className='navigation-logo'> MovieSearch </h3>
                <div className='navigation-search'>
                    <input className='navigation-search__input' placeholder="Search for some movies.." onKeyPress={handleKeyPress} value={value} onChange={updateInput}/>
                    <button className='navigation-search__button' onClick={handleSubmit}> Search </button>
                </div>
            </div>
        );
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched });

export default connect(mapStateToProps)(Navigation);