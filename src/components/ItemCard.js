import React from 'react';

const ItemCard = ({ item, currentUser}) => {
    return (
        <div className="card">
            <img className="poster" src={item.image} alt={item.name}></img>
            <h2>{item.name}</h2>
            <h3>${item.price}</h3>
            <p><b>Description:</b> {item.description}</p>
            {/* {currentUser && currentUser.movies.some(mov => mov.id === movie.id) ? <button onClick={() => removeFromMovieList(movie)}>Remove from Shopping Cart</button> : null}
            {currentUser && !currentUser.movies.some(mov => mov.id === movie.id) ? <button onClick={() => addToMovieList(movie)}>Add to Shopping Cart</button> : null } */}
        </div>
    )
}

export default ItemCard;