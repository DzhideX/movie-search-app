import React from 'react';
import { getMovies } from '../actions/moviesActions';
import { store } from '../store/configureStore';
import { connect } from 'react-redux';

class Navigation extends React.Component {

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

    render(){
        return(
            <div className='navigation'>
                <input placeholder="Search" value={this.state.value} onChange={this.updateInput}/>
                <button onClick={this.handleSubmit}> Search </button>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched });

export default connect(mapStateToProps)(Navigation);