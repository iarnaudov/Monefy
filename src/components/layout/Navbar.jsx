import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import "../../styles/layout/main.scss";
import { connect } from 'react-redux';
import { populateUserProfile } from "../../store/actions/authActions";

const Navbar = (props) => {
    const { auth, userName } = props;

    useEffect(() => {
        if (auth.uid) {
            props.populateUserProfile(auth.uid);
        }
    })

    const links = auth.uid
        ? <LoggedInLinks username={userName} />
        : <LoggedOutLinks />

    return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to="/" className="brand-logo rightMer">Monefy</Link>
                    <a href="#/" data-target="mobile-sidebar" className="sidenav-trigger right">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right navbar hide-on-med-and-down">
                        {links}
                    </ul>
                    <ul className="sidenav right" id="mobile-sidebar">
                        {links}
                    </ul>
                </div>
            </nav>
    )
}

const mapStateToProps = (state) => {
    return { auth: state.firebase.auth, userName: state.auth.userName }
}

const mapDispatchToProps = (dispach) => {
    return {
        populateUserProfile: (userId) => dispach(populateUserProfile(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);