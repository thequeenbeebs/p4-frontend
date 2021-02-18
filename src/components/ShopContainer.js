import React from 'react';
import ItemCard from './ItemCard'

class ShopContainer extends React.Component{
    render() {
        return(
            <div className="main-container">
                {this.props.items.map(item => <ItemCard item={item} currentUser={this.props.currentUser} addToShoppingCart={this.props.addToShoppingCart} inShop={true}/>)}
            </div>
        )
    }
}

export default ShopContainer;