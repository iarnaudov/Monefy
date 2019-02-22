import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import "../../styles/layout/Navbar.scss";

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo rightMer">Monefy</Link>
                <LoggedInLinks/>
                <LoggedOutLinks/>
            </div>
        </nav>
    )
}

export default Navbar;