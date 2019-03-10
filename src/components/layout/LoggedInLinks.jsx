import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authActions"
import { connect } from 'react-redux';

const LoggedInLinks = (props) => {

    let userManagement = null;
    let categories = "My Categories";
    let createCategory = "Create new Category";
    let createRecord = (<li><NavLink to="/recordsForm">Create new Record</NavLink></li>);

    if (props.username === "Admin") {
        userManagement = (<li><NavLink to="/usersManagement">Users</NavLink></li>);
        categories = "App Categories";
        createCategory = "Create App Category"
        createRecord = null;
    }

    return (
        <div>
            {createRecord}
            <li><NavLink to="/categoriesForm">{createCategory}</NavLink></li>
            <li><NavLink to="/myCategories">{categories}</NavLink></li>
            {userManagement}
            <li><NavLink to="/" onClick={props.logOutUser}>Log Out</NavLink></li>
            <li><NavLink to="/" className="btn blue lighten-1">Welcome, {props.username}</NavLink></li>
        </div>
    )
}

const mapDispatchToProps = (dispach) => {
    return {
        logOutUser: () => dispach(logout())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks);