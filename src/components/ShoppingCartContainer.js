import React from 'react';
import ItemCard from './ItemCard'

const ShoppingCartContainer = ({currentUser}) => {
        return (
            <div className="main-container">
                {currentUser 
                ? currentUser.items.map(item => <ItemCard item={item} key={item.id}
                    currentUser={currentUser}
                    />)
                : <h1>Please Log in to view your shopping cart!</h1>}
            </div>
        )
}

export default ShoppingCartContainer;