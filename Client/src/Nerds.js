import React from "react";
import { Link } from "@reach/router";

function Nerd({ Nerds}) {
    const { id, Operators_name, Technicians_name, Department, affiliation } = Nerds;
    let nerdText = "";
    let nerd_count =  "";

    if (nerd_count === 0) {
        nerdText = "Operator";
    } else if (nerd_count === 1) {
        nerdText = "Technician";
    } else {
        nerdText = `Not allocated to any`;
    }

    return (
        <div className="ndhd-nerds">
            <img className="ndhd-photo" src={""} alt={""} />
            <div className="ndhd-body">
                <div className="ndhd-Oname">{Operators_name}</div>
                <div className="ndhd-ODpt">{Department}</div>
                <div className="ndhd-Tname">{Technicians_name}</div>
                <div className="ndhd-TDpt">{affiliation}</div>
                <p className="ndhd-nerd-count">{nerdText}</p>
            </div>
            <div className="ndhd-nerds-footer">
                <a href={`/Nerds/${id}`} className="ndhd-btn ndhd-btn-Operators">
                    See Nerds
                </a>
                <Link to={`/Nerds/${id}`} className="ndhd-btn ndhd-btn-Operators">
                    See Nerds
                </Link>
   
            </div>
        </div>
    );
}

export default Nerd;