import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import "../../styles/layout/Navbar.scss";
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth } = props;

    const links = auth.uid ? <LoggedInLinks/> : <LoggedOutLinks/>

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo rightMer">Monefy</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(Navbar);