import React from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import NerdsList from "./NerdsList";
import TechniciansDetails from "./TechniciansDetails";
import OperatorsDetails from "./OperatorsDetails.js";
import Admin from "./Admin";
import NotFound from "./NotFound";
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
                    <NerdsList path="/" />
                    <OperatorsDetails path="/Operators/:OperatorId" />
                    <TechniciansDetails path="/Technicians/:TechniciansId" />
                    <Admin path="/admin" />
                    <NotFound default />
                </Router>

            </main>
        </div>
    );
}

export default App;