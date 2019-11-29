import React, { useState, useEffect } from 'react';
import noImage from '../images/340719-200.png';
import Modal from 'react-modal';
import axios from 'axios';
import MovieRating from './MovieRating';
import _ from 'lodash';

const Movie = ({index,title,image,year,type,id}) => {

    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
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

    const { Title, Rated, Released, Runtime, Genre, Writer, Actors, Plot, Awards, Ratings } = movieData;
    const movieDataObj = {Title,Rated, Released,Runtime,Genre,Writer, Actors};

    return (
        <div data-testid='movie-thumbnail' className='movie-thumbnail'>
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
                                {_.keys(movieDataObj).map(key => {
                                    if(key === 'Writer'){
                                        return key !== 'N/A' && <p><span> Writer: </span>{Writer.substring(0,70) + '...'}</p>
                                    }else{
                                        return key !== 'N/A' && <p><span> {key}: </span>{movieDataObj[key]}</p>
                                    }
                                } )}
                            </div>
                        </div>
                        <div className='movie-thumbnail-more-info-modal-bottom'>
                            {Plot !== 'N/A' && <p> <span> Plot: </span>  {movieData.Plot}</p>}
                            {Awards !== 'N/A' && <p> <span> Awards: </span>  {movieData.Awards}</p>}
                            <div className='movie-thumbnail-more-info-modal-bottom-cards'>
                                {Ratings.length > 0 && movieData.Ratings.map(rating => <MovieRating rating={rating}/>)}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>}
        </div>
    );
};

export default Movie;