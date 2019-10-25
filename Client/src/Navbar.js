import React from "react";

import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="ndhd-container">
            <nav className="ndhd-nav">
                <span className="ndhd-title">Profiles</span>
                <Link to="/NerdsList">NerdsList</Link>
                <Link to="/OperatorsList">Operators</Link>
                <Link to="/TechniciansList">Technicians</Link>
                <Link to="/Admin">Admin</Link>

            </nav>
        </div>
    );
}

export default NavBar;