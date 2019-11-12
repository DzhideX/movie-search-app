import imdb from'../images/BG_rectangle._CB1509060989_SY230_SX307_AL_.jfif';
import rotten from'../images/691px-Rotten_Tomatoes_logo.svg.png';
import meta from '../images/1280px-Metacritic_logo.svg.png';
import React from 'react';

const MovieRating = ({rating}) => {

    const renderImage = () => {
        if(rating.Source === 'Internet Movie Database'){
            return { src: imdb, alt: 'imdb' };
        }else if(rating.Source === 'Rotten Tomatoes'){
            return { src: rotten, alt: 'rotten tomatoes' };
        }else if(rating.Source === 'Metacritic'){
            return { src: meta, alt: 'metacritic' };
        }
    }

    return (
        <div data-test='movie-rating-card' className='movie-thumbnail-more-info-modal-bottom-cards__card'>
            <img data-test='movie-rating-card-image' className='movie-thumbnail-more-info-modal-bottom-cards__rating-image' src={renderImage().src} alt={renderImage().alt}/>
            <p data-test='movie-rating-card-value' className='movie-thumbnail-more-info-modal-bottom-cards__rating-value'> {rating.Value} </p>
        </div>
    );
};

export default MovieRating;