import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPageWelcome = (props) => {
    return (
        <div>
            <h1>{`Welcome, ${props.user.username}!`}</h1>
            <NavLink
                to="/movielist"
                exact
                >MovieList</NavLink> <br/>
            <NavLink
                to="/shoppingcart"
                exact
                >Shopping Cart</NavLink><br/>
        </div>
    )
}

export default UserPageWelcome;