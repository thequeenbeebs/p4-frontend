import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPageWelcome = (props) => {
    return (
        <div>
            <h3>{`Welcome, ${props.user.username}!`}</h3>
            <NavLink
                to="/movielist"
                exact
                >Movie List</NavLink> <br/>
            <NavLink
                to="/shoppingcart"
                exact
                >Shopping Cart</NavLink><br/>
        </div>
    )
}

export default UserPageWelcome;