import React from "react";

function NavBar() {
    return (
        <div className="ndhd-container">
            <nav className="ndhd-nav">
                <span className="ndhd-title">Nerd Profiles</span>
                <a href="/">Nerd</a>
                <a href="/Nerds">Nerds</a>
                <a href="/admin">Admin</a>
            </nav>
        </div>
    );
}

export default NavBar;