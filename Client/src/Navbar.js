import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="ndhd-container">
            <nav className="ndhd-nav">
                <span className="ndhd-title">Nerd Profiles</span>
                <Link to="/">Movies</Link>
                <Link to="/cinemas">Cinemas</Link>
                <Link to="/admin">Admin</Link>

            </nav>
        </div>
    );
}

export default NavBar;