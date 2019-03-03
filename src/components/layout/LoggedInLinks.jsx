import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authActions"
import { connect } from 'react-redux';

const LoggedInLinks = (props) => {
    return (
        <ul className="right navbar">
            <li><NavLink to="/recordsForm">Create new Record</NavLink></li>
            <li><NavLink to="/categoriesForm">Create new Category</NavLink></li>
            <li><NavLink to="/myCategories">My Categories</NavLink></li>
            <li><NavLink to="/" onClick={props.logOutUser}>Log Out</NavLink></li>
            <li><NavLink to="/" className="btn blue lighten-1">Welcome, {props.username}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispach) => {
    return {
        logOutUser: () => dispach(logout())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks);