import React from "react";
import SignupForm from "../components/forms/SignupForm";

const Signup = () => {
    return (
        <div>
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-4 ms-5 fs-7 fw-bold">Flix4You</h1>
            <SignupForm />
        </div>
    );
};

export default Signup;
