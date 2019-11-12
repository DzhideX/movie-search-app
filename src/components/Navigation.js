import React from 'react';
import { getMovies } from '../actions/moviesActions';
import { store } from '../store/configureStore';
import { connect } from 'react-redux';

export class Navigation extends React.Component {

    state = {
        value: '',
    };

    updateInput = (e) => {
        const value = e.target.value;
            this.setState(prevState => ({
                value
            }));
    };

    handleSubmit = async () => {
        if(this.state.value){
            store.dispatch(getMovies(this.state.value));
        }
    }

    handleKeyPress = (target) => {
        if(this.state.value && target.charCode===13){
            store.dispatch(getMovies(this.state.value));
        }
    }

    render(){
        return(
            <div data-test='navigation' className='navigation'>
                <h3 data-test='navigation-logo' className='navigation-logo'> MovieSearch </h3>
                <div className='navigation-search'>
                    <input className='navigation-search__input' placeholder="Search for some movies.." onKeyPress={this.handleKeyPress} value={this.state.value} onChange={this.updateInput}/>
                    <button className='navigation-search__button' onClick={this.handleSubmit}> Search </button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched });

export default connect(mapStateToProps)(Navigation);