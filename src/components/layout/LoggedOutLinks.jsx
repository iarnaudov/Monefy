import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOutLinks = () => {
    return (
        <ul className="right navbar">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </ul>
    )
}

export default LoggedOutLinks;