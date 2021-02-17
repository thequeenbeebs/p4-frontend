import './App.css';
import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'
import MoviesContainer from './components/MoviesContainer'
import ShopContainer from './components/ShopContainer'
import MovieListContainer from './components/MovieListContainer'
import ShoppingCartContainer from './components/ShoppingCartContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component {
  state = {
    users: [],
    currentUser: "",
    movies: [],
    items: []
  }

  logInUser = (username) => {
    let current = this.state.users.find(user => user.username === username)
    this.setState({currentUser: current})
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(userData => this.setState({users: userData}))

    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => this.setState({movies: movieData}))

    fetch('http://localhost:3000/items')
    .then(resp => resp.json())
    .then(itemData => this.setState({items: itemData}))
  }

  viewMovieList = () => {
    this.setState({mainContainerData: this.state.currentUser.movies})
  }

  addToMovieList = (movie) => {
    let newMovie = {...movie, rating: ""}
    let updatedMovies = {
      movies: [...this.state.currentUser.movies, newMovie]
    }

    let reqPack = {}
        reqPack.method = "PATCH"
        reqPack.headers = {"Content-Type": "application/json"}
        reqPack.body = JSON.stringify(updatedMovies)

    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, reqPack)
    .then(resp => resp.json())
    .then(updatedUser => this.setState({currentUser: updatedUser}))
  }

  removeFromMovieList = (movie) => {
    let updatedMovies = {
      movies: this.state.currentUser.movies.filter(mov => mov !== movie)
    }

    let reqPack = {}
        reqPack.method = "PATCH"
        reqPack.headers = {"Content-Type": "application/json"}
        reqPack.body = JSON.stringify(updatedMovies)

    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, reqPack)
      .then(resp => resp.json())
      .then(updatedUser => this.setState({currentUser: updatedUser}))
  }

  updateRating = (movie, event) => {
    let newMovie = {...movie, screamFactor: parseInt(event.target.value)}
    
    let updatedMovies = {
      movies: this.state.currentUser.movies.map(movie => movie.id === newMovie.id ? newMovie : movie)
    }

    let reqPack = {}
        reqPack.method = "PATCH"
        reqPack.headers = {"Content-Type": "application/json"}
        reqPack.body = JSON.stringify(updatedMovies)

    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, reqPack)
      .then(resp => resp.json())
      .then(updatedUser => this.setState({currentUser: updatedUser}))

    let movieRatings = {
      screamFactor: [...movie.screamFactor, parseInt(event.target.value)]
    }

    let requestPack = {}
        requestPack.method = "PATCH"
        requestPack.headers = {"Content-Type": "application/json"}
        requestPack.body = JSON.stringify(movieRatings)

        fetch(`http://localhost:3000/movies/${movie.id}`, requestPack)
        .then(resp => resp.json())
        .then(updatedMovie => this.setState({movies: this.state.currentUser.movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie)}))
  }

  render() {
    return (
      <Router> 
        <div className="App">
          <div className="header">
            <img id="title-img" src="https://t3.ftcdn.net/jpg/02/39/24/98/360_F_239249872_WZGbgeTB96vhVTSmvkNSIrOnverXn5o9.jpg"
            alt="creepy clown"></img>
            <br/>
            <br/>
            <h1>Flat-tie Kreuger's Horror Emporium</h1>
          </div>
          <NavBar user={this.state.currentUser}
            logInUser={this.logInUser}
            viewMovieList={this.viewMovieList}
          />
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/movies" render={(props) => <MoviesContainer {...props} 
            addToMovieList={this.addToMovieList}
            removeFromMovieList={this.removeFromMovieList}
            updateRating={this.updateRating}
            currentUser={this.state.currentUser}
            movies={this.state.movies}
            />} />
          <Route exact path="/shop" render={(props) => <ShopContainer {...props}
            items={this.state.items}
            currentUser={this.state.currentUser}
          /> } />
          <Route exact path="/movielist" render={(props) => <MovieListContainer {...props} 
            currentUser={this.state.currentUser}
            removeFromMovieList={this.removeFromMovieList}
            updateRating={this.updateRating}
            />} />
          <Route exact path="/shoppingcart" component={ShoppingCartContainer} />
        </div>
      </Router>
    );
  }
  
}

export default App;
