import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import noImage from '../images/340719-200.png';
import Modal from 'react-modal';
import axios from 'axios';
import imdb from'../images/BG_rectangle._CB1509060989_SY230_SX307_AL_.jfif';
import rotten from'../images/691px-Rotten_Tomatoes_logo.svg.png';
import meta from '../images/1280px-Metacritic_logo.svg.png';

const MovieRating = ({rating}) => {

    const renderImage = () => {
        if(rating.Source === 'Internet Movie Database'){
            return imdb;
        }else if(rating.Source === 'Rotten Tomatoes'){
            return rotten;
        }else if(rating.Source === 'Metacritic'){
            return meta;
        }
    }

    return (
        <div className='movie-thumbnail-more-info-modal-bottom-cards__card'>
            <img className='movie-thumbnail-more-info-modal-bottom-cards__rating-image' src={renderImage()} alt='movie rating source'/>
            <p> {rating.Value} </p>
        </div>
    );
}

const Movie = ({index,title,image,year,type,id}) => {

    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        // console.log('ran useEffect');
        axios.get(`http://www.omdbapi.com/?apikey=10d92ac&i=${id}`).then(response=> {
            setMovieData(response.data);
        });
        // eslint-disable-next-line
    }, []);
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    }
    const closeModal=  () => {
        setModal(false);
        setHovered(false);
    }

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
                <button onClick={openModal} className='movie-thumbnail-more-info__button'> More info </button>
                <Modal 
                isOpen={modal}
                ariaHideApp={false}
                style={{
                    content: {
                        width: '67vw',
                        height:'33rem',
                        margin: 'auto'
                    }
                  }}
                onRequestClose={closeModal}
                >   
                    <div className='movie-thumbnail-more-info-modal'>
                        <div className='movie-thumbnail-more-info-modal-top'>
                            {image === 'N/A' ? <img className='movie-thumbnail-more-info-modal-no-image-icon' src={noImage} alt='not loaded'/> : <img className='movie-thumbnail-more-info-modal-image'  src={image} alt={index}/>} 
                            <div className='movie-thumbnail-more-info-modal-top-right'>
                                {movieData.Title !== 'N/A' ? <p><span> Title: </span> {movieData.Title}</p> : null}
                                {movieData.Rated !== 'N/A' ? <p><span> Rated: </span> {movieData.Rated}</p> : null}
                                {movieData.Released !== 'N/A' ? <p><span> Released: </span> {movieData.Released}</p> : null}
                                {movieData.Runtime !== 'N/A' ? <p><span> Run time: </span> {movieData.Runtime}</p> : null}
                                {movieData.Genre !== 'N/A' ? <p><span> Genre: </span> {movieData.Genre}</p> : null}
                                {movieData.Writer !== 'N/A' ? <p><span> Writer: </span>{movieData.Writer.substring(0,70) + '...'}</p> : null}
                                {movieData.Actors !== 'N/A' ? <p><span>Actors: </span>{movieData.Actors}</p> : null}
                            </div>
                        </div>
                        <div className='movie-thumbnail-more-info-modal-bottom'>
                            {movieData.Plot !== 'N/A' ? <p> <span> Plot: </span>  {movieData.Plot}</p> : null}
                            {movieData.Awards !== 'N/A' ? <p> <span> Awards: </span>  {movieData.Awards}</p> : null}
                            <div className='movie-thumbnail-more-info-modal-bottom-cards'>
                                {movieData.Ratings.length > 0 ? movieData.Ratings.map(rating => <MovieRating rating={rating}/>) : null}
                            </div>
                        </div>
                    </div>
                </Modal>
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
    //this.props.movies && JSON.stringify(this.props.movies) !== '[]'
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