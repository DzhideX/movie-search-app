import React, { useState, useEffect } from 'react';
import noImage from '../images/340719-200.png';
import Modal from 'react-modal';
import axios from 'axios';
import MovieRating from './MovieRating';

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
                                {movieData.Title !== 'N/A' && <p><span> Title: </span> {movieData.Title}</p>}
                                {movieData.Rated !== 'N/A' && <p><span> Rated: </span> {movieData.Rated}</p>}
                                {movieData.Released !== 'N/A' && <p><span> Released: </span> {movieData.Released}</p>}
                                {movieData.Runtime !== 'N/A' && <p><span> Run time: </span> {movieData.Runtime}</p>}
                                {movieData.Genre !== 'N/A' && <p><span> Genre: </span> {movieData.Genre}</p>}
                                {movieData.Writer !== 'N/A' && <p><span> Writer: </span>{movieData.Writer.substring(0,70) + '...'}</p>}
                                {movieData.Actors !== 'N/A' && <p><span>Actors: </span>{movieData.Actors}</p>}
                            </div>
                        </div>
                        <div className='movie-thumbnail-more-info-modal-bottom'>
                            {movieData.Plot !== 'N/A' && <p> <span> Plot: </span>  {movieData.Plot}</p>}
                            {movieData.Awards !== 'N/A' && <p> <span> Awards: </span>  {movieData.Awards}</p>}
                            <div className='movie-thumbnail-more-info-modal-bottom-cards'>
                                {movieData.Ratings.length > 0 && movieData.Ratings.map(rating => <MovieRating rating={rating}/>)}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>}
        </div>
    );
};

export default Movie;