import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="contai">
                <Link to="/" className="brand-logo">Monefy</Link>
            </div>
        </nav>
    )
}

export default Navbar;