import React from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import Nerd from "./Nerd"
import NerdsList from "./NerdsList";
import NerdDetails from "./NerdDetails";

import TechniciansList from "./TechniciansList";
import TechniciansDetails from "./TechniciansDetails";
import OperatorsList from "./OperatorsList";
import OperatorsDetails from "./OperatorsDetails";

import NotFound from "./NotFound";
import Admin from "./Admin";
import "./App.css";

// This is static hard-coded data, we shall later fetch it from our server
function App() {
    return (
        <div className="ndhd-app">
            <header className="ndhd-header">
                <NavBar />
            </header>
            <main className="ndhd-main">
                <Router>
                    <NerdsList path="/NerdList" />
                    <NerdDetails path="./NerdDetails" />
                    <Nerd path="/Nerd"/>
                    <OperatorsDetails path="/OperatorsList/:OperatorId" />
                    <OperatorsList path="/OperatorsList" />

                    <TechniciansDetails path="/TechniciansDetails/:TechniciansId" />

                    <TechniciansList path="/TechniciansList" />
                    <Admin path="/Admin" />
                    <NotFound default />

                </Router>

            </main>
        </div>
    );
}

export default App;