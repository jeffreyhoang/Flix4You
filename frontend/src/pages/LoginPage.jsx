import React from "react";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
    return (
        <div>
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-4 ms-5 fs-8 fw-bold">Flix4You</h1>
            <LoginForm />
        </div>
    );
};

export default Login;
