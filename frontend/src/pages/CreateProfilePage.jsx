import React, { useEffect } from "react";
import CreateProfileForm from "../components/forms/CreateProfileForm";
import { useNavigate } from "react-router-dom";

const CreateProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    // useEffect runs when CreateProfilePage renders or when 'token' changes
    useEffect(() => {
        if (!token) {
            navigate("/");  // Redirect if not logged in
        } 
    }, [token]);

    return (
        <div>
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-4 ms-5 fs-8 fw-bold">Flix4You</h1>
            <CreateProfileForm token={token} />
        </div>
    )
};

export default CreateProfilePage;