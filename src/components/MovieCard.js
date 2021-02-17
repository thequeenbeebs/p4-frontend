import React from 'react';
import RatingForm from './RatingForm'


const MovieCard = ({ movie, addToMovieList, currentUser, removeFromMovieList, updateRating}) => {
    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length
    let avgScreamFactor = parseInt(average(movie.screamFactor))
    return (
        <div className="card">
            <img className="poster" src={movie.image} alt={movie.title}></img>
            <h2>{movie.title}</h2>
            <h3>{movie.year}</h3>
            <h4>Director: {movie.director}</h4>
            <h4>Genre: {movie.genre}</h4>
            <h4>Scream Factor: {[...Array(avgScreamFactor)].map(i => <img className="scream" key={i} alt="scream" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0sceOuUN3aNZwMQyT4J4d-_PObtnttUMlmHD_nndcoVCCTaJd9UgXfTjZE2f4CEycqyzN6oA&usqp=CAc"></img>)}</h4>
            {currentUser && currentUser.movies.some(mov => mov.id === movie.id)
                ? <RatingForm currentUser={currentUser} movie={movie} updateRating={updateRating}/> 
                : null}
            <p><b>Summary:</b> {movie.summary}</p>
            {currentUser && currentUser.movies.some(mov => mov.id === movie.id) ? <button onClick={() => removeFromMovieList(movie)}>Remove from Movie List</button> : null}
            {currentUser && !currentUser.movies.some(mov => mov.id === movie.id) ? <button onClick={() => addToMovieList(movie)}>Add to Movie List</button> : null }
        </div>
    )
}

export default MovieCard;