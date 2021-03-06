import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import MainContainer from "./components/MainContainer";
import MoviesContainer from "./components/MoviesContainer";
import ShopContainer from "./components/ShopContainer";
import MovieListContainer from "./components/MovieListContainer";
import ShoppingCartContainer from "./components/ShoppingCartContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    state = {
        users: [],
        currentUser: "",
        movies: [],
        items: [],
    };

    logInUser = (username) => {
        let current = this.state.users.find(
            (user) => user.username === username
        );
        this.setState({ currentUser: current });
    };

    componentDidMount() {
        fetch("http://localhost:3000/users")
            .then((resp) => resp.json())
            .then((userData) => this.setState({ users: userData }));

        fetch("http://localhost:3000/movies")
            .then((resp) => resp.json())
            .then((movieData) => this.setState({ movies: movieData }));

        fetch("http://localhost:3000/items")
            .then((resp) => resp.json())
            .then((itemData) => this.setState({ items: itemData }));
    }

    addToMovieList = (movie) => {
        let newUserMovie = {
            movie_id: movie.id,
            user_id: this.state.currentUser.id,
            user_scream_rating: 0,
        };

        let reqPack = {};
        reqPack.method = "POST";
        reqPack.headers = { "Content-Type": "application/json" };
        reqPack.body = JSON.stringify(newUserMovie);

        fetch(`http://localhost:3000/user_movies`, reqPack);

        let updatedMovies = [...this.state.currentUser.movies, movie];
        this.setState({
            currentUser: { ...this.state.currentUser, movies: updatedMovies },
        });
    };

    removeFromMovieList = (movie) => {
        let userMovie = this.state.currentUser.user_movies.find(
            (um) => um.movie_id === movie.id
        );

        fetch(`http://localhost:3000/user_movies/${userMovie.id}`, {
            method: "DELETE",
        });

        let updatedMovies = this.state.currentUser.movies.filter(
            (mv) => mv.id !== movie.id
        );
        this.setState({
            currentUser: { ...this.state.currentUser, movies: updatedMovies },
        });
    };

    updateRating = (movie, event) => {
        let userMovie = this.state.currentUser.user_movies.find(
            (um) => um.movie_id === movie.id
        );
        let newRating = {
            user_scream_rating: parseInt(event.target.value),
        };

        let reqPack = {};
        reqPack.method = "PATCH";
        reqPack.headers = { "Content-Type": "application/json" };
        reqPack.body = JSON.stringify(newRating);

        fetch(`http://localhost:3000/user_movies/${userMovie.id}`, reqPack)
            .then((resp) => resp.json())
            .then(console.log);

        let updatedMovie = {
            ...movie,
            user_scream_rating: parseInt(event.target.value),
        };
        this.setState({
            currentUser: {
                ...this.state.currentUser,
                movies: [
                    ...this.state.currentUser.movies.map((mv) =>
                        mv.id === updatedMovie.id ? updatedMovie : mv
                    ),
                ],
            },
        });

        // TO WORK ON -- SETTING UP AVERAGE SCREAM FACTOR

        // let movieRatings = {
        //   screamFactor: [...movie.screamFactor, parseInt(event.target.value)]
        // }

        // let requestPack = {}
        //     requestPack.method = "PATCH"
        //     requestPack.headers = {"Content-Type": "application/json"}
        //     requestPack.body = JSON.stringify(movieRatings)

        //     fetch(`http://localhost:3000/movies/${movie.id}`, requestPack)
        //     .then(resp => resp.json())
        //     .then(updatedMovie => this.setState({movies: this.state.currentUser.movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie)}))
    };

    addToShoppingCart = (item) => {
        let updatedItems = {
            items: [...this.state.currentUser.items, item],
        };

        let reqPack = {};
        reqPack.method = "PATCH";
        reqPack.headers = { "Content-Type": "application/json" };
        reqPack.body = JSON.stringify(updatedItems);

        fetch(
            `http://localhost:3000/users/${this.state.currentUser.id}`,
            reqPack
        )
            .then((resp) => resp.json())
            .then((updatedUser) => this.setState({ currentUser: updatedUser }));
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="header">
                        <img
                            id="title-img"
                            src="https://t3.ftcdn.net/jpg/02/39/24/98/360_F_239249872_WZGbgeTB96vhVTSmvkNSIrOnverXn5o9.jpg"
                            alt="creepy clown"
                        ></img>
                        <br />
                        <h1>Flat-tie Kreuger's Horror Emporium</h1>
                    </div>
                    <NavBar
                        user={this.state.currentUser}
                        logInUser={this.logInUser}
                        viewMovieList={this.viewMovieList}
                    />

                    <Route exact path="/" component={MainContainer} />
                    <Route
                        exact
                        path="/movies"
                        render={(props) => (
                            <MoviesContainer
                                {...props}
                                addToMovieList={this.addToMovieList}
                                removeFromMovieList={this.removeFromMovieList}
                                updateRating={this.updateRating}
                                currentUser={this.state.currentUser}
                                movies={this.state.movies}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/shop"
                        render={(props) => (
                            <ShopContainer
                                {...props}
                                items={this.state.items}
                                currentUser={this.state.currentUser}
                                addToShoppingCart={this.addToShoppingCart}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/movielist"
                        render={(props) => (
                            <MovieListContainer
                                {...props}
                                currentUser={this.state.currentUser}
                                removeFromMovieList={this.removeFromMovieList}
                                updateRating={this.updateRating}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/shoppingcart"
                        render={(props) => (
                            <ShoppingCartContainer
                                {...props}
                                currentUser={this.state.currentUser}
                            />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
