import React, { useState } from 'react';
import { connect } from 'react-redux';
import noImage from '../images/340719-200.png';

const Movie = ({index,title,image,year,type}) => {

    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    return (
        <div className='movie-thumbnail'>
            {!hovered && <div className='movie-thumbnail__no-info' onMouseEnter={toggleHover}>
            {image === 'N/A' ? <img className='movie-thumbnail-no-image-icon' src={noImage} alt='not loaded'/> : <img className='movie-thumbnail__image'  src={image} alt={index}/>} 
            <p className='movie-thumbnail__title'> {title} </p>
            </div>}
            {hovered && 
            <div className='movie-thumbnail-more-info' onMouseLeave={toggleHover}> 
                <p className='movie-thumbnail-more-info__description'> Title: </p>
                <p> {title} </p>
                <p className='movie-thumbnail-more-info__description'> Year: </p>
                <p> {year} </p>
                <p className='movie-thumbnail-more-info__description'> Type: </p>
                <p> {type} </p>
                <button className='movie-thumbnail-more-info__button'> More info </button>
            </div>}
        </div>
    );
};

class Movies extends React.Component {

    displayMessage = () => {
        if(this.props.fetching){
            return <p className='message-container__message'> Loading.. </p>
        }else if(this.props.error){
            return <p className='message-container__message'> No movie found with that name. Try again! </p>
        }

        // Previous solution
        // {this.props.fetching && <p> Loading.. </p>}
        // {this.props.error && <p> There was an error..</p>}
    }

    render(){
        console.log(JSON.stringify(this.props.movies) === '[]')
        return(
            <React.Fragment>
                {this.props.movies && JSON.stringify(this.props.movies) !== '[]' && 
                <div className='movies-container-large'>
                    {this.props.movies ? this.props.movies.map((movie,index) => {
                        return <Movie key={index} title={movie.Title} year={movie.Year} type={movie.Type} image={movie.Poster}/>
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