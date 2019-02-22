import React from "react";
import { NavLink } from "react-router-dom";

const LoggedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/addRecord">Create new Record</NavLink></li>
            <li><NavLink to="/addCategory">Create new Category</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">Log Out</NavLink></li>
        </ul>
    )
}

export default LoggedInLinks;