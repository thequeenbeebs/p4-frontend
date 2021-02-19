import React from 'react';
// import RatingForm from './RatingForm'
import MovieModal from './MovieModal'

class MovieCard extends React.Component {
    state = {
        modal: false
    }

    average = arr => {
        let sum = 0
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        return sum / arr.length
    }

    exitModal = () => {
        console.log('click', this.props.movie)
        this.setState({
            modal: false
        }, () => {console.log(this.state, 'state updated')})
    }

    render() {
        // let avgScreamFactor = parseInt(this.average(this.props.movie.scream_factor))
        return (
            <div className="card" >
                <img className="poster" src={this.props.movie.image} 
                    alt={this.props.movie.title}
                    onClick={() => this.setState({modal: true})}></img>
                {/* <h2>{this.props.movie.title}</h2>
                <h3>{this.props.movie.year}</h3>
                <h4>Director: {this.props.movie.director}</h4>
                <h4>Genre: {this.props.movie.genre}</h4>
                <h4>Scream Factor: {[...Array(this.props.movie.scream_factor)].map(i => <img className="scream" key={i} alt="scream" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0sceOuUN3aNZwMQyT4J4d-_PObtnttUMlmHD_nndcoVCCTaJd9UgXfTjZE2f4CEycqyzN6oA&usqp=CAc"></img>)}</h4>
                {this.props.currentUser && this.props.currentUser.movies.some(mov => mov.id === this.props.movie.id)
                    ? <RatingForm currentUser={this.props.currentUser} movie={this.props.movie} updateRating={this.props.updateRating}/> 
                    : null}
                <p><b>Summary:</b> {this.props.movie.summary}</p>
                {this.props.currentUser && this.props.currentUser.movies.some(mov => mov.id === this.props.movie.id) ? <button onClick={() => this.props.removeFromMovieList(this.props.movie)}>Remove from Movie List</button> : null}
                {this.props.currentUser && !this.props.currentUser.movies.some(mov => mov.id === this.props.movie.id) ? <button onClick={() => this.props.addToMovieList(this.props.movie)}>Add to Movie List</button> : null }    */}
                {this.state.modal 
                    ? <div>
                        <MovieModal movie={this.props.movie} 
                            exitModal={this.exitModal} 
                            currentUser={this.props.currentUser}
                            updateRating={this.props.updateRating}
                            removeFromMovieList={this.props.removeFromMovieList}
                            addToMovieList={this.props.addToMovieList}
                        />
                    </div>
                    : null }
            </div>
                
        )
    }
}



export default MovieCard;