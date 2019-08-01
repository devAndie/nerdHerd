import React from "react";
import { Link } from "@reach/router";

function NavBar() {
    return (
        <div className="ndhd-container">
            <nav className="ndhd-nav">
                <span className="ndhd-title">Nerd Profiles</span>
                <br></br>
                <Link to="/Nerds">Nerds</Link><br></br>
                <Link to="/OperatorsList">Operators</Link><br></br>
                <Link to="/TechniciansList">Technicians</Link><br></br>
                <Link to="/Admin">Admin</Link>

            </nav>
        </div>
    );
}

export default NavBar;