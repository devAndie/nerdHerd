import React from "react";

function Error({ message }) {
    return (
        <div className="ndhd-fullpage-text">
            <p>Sorry, a server error occurred. Please retry.</p>
            <p>{message}</p>
        </div>
    );
}

Error.defaultProps = {
    message: "Sorry, a server error occurred. Please retry."
};

export default Error;