import React from 'react';

const RatingForm = ({ currentUser, movie, updateRating}) => {
    let currentMovie = currentUser.movies.find(mov => mov.id === movie.id)
    return (
        <div>
            <b>Your rating: </b>
            <select value={currentMovie ? currentMovie.screamFactor : null}
                onChange={event => updateRating(movie, event)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}

export default RatingForm;