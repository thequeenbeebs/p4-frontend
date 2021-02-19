import React from "react";
import RatingForm from "./RatingForm";

class MovieModal extends React.Component {
    state = {
        show: this.props.show,
    };

    handleClick = () => {
        this.props.exitModal();
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span class="close-btn" onClick={this.handleClick}>
                        &times;
                    </span>
                    <img
                        className="poster-modal left"
                        src={this.props.movie.image}
                        alt={this.props.movie.title}
                    ></img>
                    <h2>{this.props.movie.title}</h2>
                    <h3>{this.props.movie.year}</h3>
                    <h4>Director: {this.props.movie.director}</h4>
                    <h4>Genre: {this.props.movie.genre}</h4>
                    <h4>
                        Scream Factor:{" "}
                        {[...Array(this.props.movie.scream_factor)].map((i) => (
                            <img
                                className="scream"
                                key={i}
                                alt="scream"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0sceOuUN3aNZwMQyT4J4d-_PObtnttUMlmHD_nndcoVCCTaJd9UgXfTjZE2f4CEycqyzN6oA&usqp=CAc"
                            ></img>
                        ))}
                    </h4>
                    {this.props.currentUser &&
                    this.props.currentUser.movies.some(
                        (mov) => mov.id === this.props.movie.id
                    ) ? (
                        <RatingForm
                            currentUser={this.props.currentUser}
                            movie={this.props.movie}
                            updateRating={this.props.updateRating}
                        />
                    ) : null}
                    <p>
                        <b>Synopsis:</b> {this.props.movie.synopsis}
                    </p>
                    {this.props.currentUser &&
                    this.props.currentUser.movies.some(
                        (mov) => mov.id === this.props.movie.id
                    ) ? (
                        <button
                            onClick={() =>
                                this.props.removeFromMovieList(this.props.movie)
                            }
                        >
                            Remove from Movie List
                        </button>
                    ) : null}
                    {this.props.currentUser &&
                    !this.props.currentUser.movies.some(
                        (mov) => mov.id === this.props.movie.id
                    ) ? (
                        <button
                            onClick={() =>
                                this.props.addToMovieList(this.props.movie)
                            }
                        >
                            Add to Movie List
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default MovieModal;
