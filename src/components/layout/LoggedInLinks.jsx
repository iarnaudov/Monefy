import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/authActions"
import { connect } from 'react-redux';

const LoggedInLinks = (props) => {

    return (
        <ul className="right">
            <li><NavLink to="/addRecord">Create new Record</NavLink></li>
            <li><NavLink to="/addCategory">Create new Category</NavLink></li>
            <li><NavLink to="/" onClick={props.logOutUser}>Log Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-2">NN</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return
}

const mapDispatchToProps = (dispach) => {
    return {
        logOutUser: () => dispach(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);