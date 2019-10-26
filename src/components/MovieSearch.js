import React from 'react';
import { connect } from 'react-redux';

const Movie = ({index,title,image}) => {
    return (
        <div>
            <p key={index}> {title} </p>
            <img src={image} alt={index}/> 
        </div>
    );
};

class Movies extends React.Component { 

    render(){
        console.log('asdas',this.props)
        return(
            <div className='movies-container'>
            {this.props.movies ? this.props.movies.map((movie,index) => {
                return <Movie index={index} title={movie.Title} image={movie.Poster}/>
            }) : null}
            {this.props.fetching && <p> Loading.. </p>}
            {this.props.error && <p> There was an error..</p>}
            </div>
        );
    }
};

const mapStateToProps = (state) => ({  movies: state.movies, fetched: state.fetched, fetching: state.fetching, error: state.error });

export default connect(mapStateToProps)(Movies);