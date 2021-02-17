import React from 'react';
import MovieCard from './MovieCard';

const MovieListContainer = (props) => {
        return (
            <div>
                {props.currentUser 
                ? props.currentUser.movies.map(movie => <MovieCard movie={movie} key={movie.id}
                    currentUser={props.currentUser}
                    removeFromMovieList={props.removeFromMovieList}
                    updateRating={props.updateRating}
                    />)
                : <h1>Please Log in to view your list of movies!</h1>}
            </div>
        )
}

export default MovieListContainer;