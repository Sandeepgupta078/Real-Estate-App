import React from "react";
import { useRouteError } from "react-router-dom";
import "./ErrorBoundary.scss";

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-boundary">
            <h1>Oops! Something went wrong.</h1>
            <p>{error.statusText || error.message}</p>
            <button onClick={() => (window.location.href = "/")}>Go Home</button>
        </div>
    );
};

export default ErrorBoundary;
