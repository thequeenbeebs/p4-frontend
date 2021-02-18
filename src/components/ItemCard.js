import React from 'react';

const ItemCard = ({ item, currentUser, addToShoppingCart, inShop}) => {
    return (
        <div className="card">
            <img className="poster" src={item.image} alt={item.name}></img>
            <h2>{item.name}</h2>
            <h3>${item.price}</h3>
            <p><b>Description:</b> {item.description}</p>
            {currentUser && inShop ? <button onClick={() => addToShoppingCart(item)}>Add to Shopping Cart</button> : null } 
        </div>
    )
}

export default ItemCard;