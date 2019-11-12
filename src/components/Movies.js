import React from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';

export class Movies extends React.Component {

    displayMessage = () => {
        if(this.props.fetching){
            return <p className='message-container__message'> Loading.. </p>
        }else if(this.props.error){
            return <p className='message-container__message'> No movie found with that name. Try again! </p>
        }
    }
    
    render(){
        console.log(JSON.stringify(this.props.movies) === '[]')
        return(
            <React.Fragment>
                {console.log('this.props.movies:', this.props.movies)}
                { !(this.props.fetching || this.props.error) && 
                <div className='movies-container-large'>
                    {this.props.movies ? this.props.movies.map((movie,index) => {
                        return <Movie key={index} title={movie.Title} year={movie.Year} type={movie.Type} image={movie.Poster} id={movie.imdbID}/>
                    }) : null}
                </div>}

                {this.props.fetching || this.props.error ? (
                    <div className='message-container'>
                        {this.displayMessage()}
                    </div>
                ) : null}
                
            </React.Fragment>
            
        );
    }
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched, fetching: state.fetching, error: state.error });

export default connect(mapStateToProps)(Movies);