import React from "react";
import LoginForm from "./LoginForm";
import UserPageWelcome from "./UserPageWelcome";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    return (
        <div className="navlinks">
            <NavLink to="/" exact>
                Home
            </NavLink>

            <br />

            <NavLink to="/movies" exact>
                Movies
            </NavLink>

            <br />

            <NavLink to="/shop" exact>
                Shop
            </NavLink>

            <br />
            <div className="right">
                {props.user ? (
                    <UserPageWelcome
                        user={props.user}
                        viewMovieList={props.viewMovieList}
                    />
                ) : (
                    <LoginForm logInUser={props.logInUser} />
                )}
            </div>
        </div>
    );
};

export default NavBar;
