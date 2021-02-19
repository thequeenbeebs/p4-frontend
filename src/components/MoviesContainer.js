import React from "react";
import MovieCard from "./MovieCard";

class MoviesContainer extends React.Component {
    render() {
        return (
            <div className="main-container">
                {this.props.movies.map((movie) => (
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        addToMovieList={this.props.addToMovieList}
                        removeFromMovieList={this.props.removeFromMovieList}
                        currentUser={this.props.currentUser}
                        updateRating={this.props.updateRating}
                    />
                ))}
            </div>
        );
    }
}

export default MoviesContainer;
