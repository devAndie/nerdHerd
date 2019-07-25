import React from "react";

function NavBar() {
    return (
        <div className="ndhd-container">
            <nav className="ndhd-nav">
                <span className="ndhd-title">Nerd Profiles</span>
                <a href="/">Nerds</a>
                <a href="/NerdsList">NerdsList</a>
                <a href="/admin">Admin</a>
            </nav>
        </div>
    );
}

export default NavBar;