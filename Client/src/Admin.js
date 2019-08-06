import React from "react";
import TechnicianAdmin from "./TechnicianAdmin";
import OperatorAdmin from "./OperatorAdmin";

function Admin() {
    return (
        <div className="ndhd-container">
            <h1>Admin Page</h1>
            <TechnicianAdmin />
            <OperatorAdmin />
        </div>
    );
}

export default Admin;