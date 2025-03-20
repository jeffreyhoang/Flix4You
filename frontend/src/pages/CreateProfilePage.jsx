import React, { useEffect } from "react";
import CreateProfileForm from "../components/ProfileDashboard/CreateProfileForm";
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
            <h1 className="flix-header">Flix4You</h1>
            <CreateProfileForm token={token} />
        </div>
    )
};

export default CreateProfilePage;