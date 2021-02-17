import React from 'react';
import ItemCard from './ItemCard'

class ShopContainer extends React.Component{
    render() {
        return(
            <div>
                {this.props.items.map(item => <ItemCard item={item} currentUser={this.props.currentUser}/>)}
            </div>
        )
    }
}

export default ShopContainer;