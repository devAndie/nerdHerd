import React from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import NerdsList from "./NerdsList";
import TechniciansDetails from "./TechniciansDetails";
import NerdsList from "./NerdsList";
import OperatorsDetails from "./OperatorsDetails";
import Admin from "./Admin";
import NotFound from "./NotFound";
import "./App.css";

// This is static hard-coded data, we shall later fetch it from our server
const NERDS = [
    {
        id: 1,
        Operator_name: "Default",
        photo_url: "",
        nerd_count: 0
    },
    {
        id: 2,
        Technicians_name: "default",
        photo_url: "",
        nerd_count: 1
    },
    {
        id: 3,
        Operators_name: "default",
        photo_url: "",
        nerd_count: 0
    },
    {
        id: 4,
        Tecnicians_name: "lorem Ipsum",
        photo_url: "",
        nerd_count: 1
    }
];
//
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
                    <CinemaList path="/cinemas" />
                    <TechniciansDetails path="/Technicians/:TechniciansId" />
                    <Admin path="/admin" />
                    <NotFound default />
                </Router>

            </main>
        </div>
    );
}

export default App;