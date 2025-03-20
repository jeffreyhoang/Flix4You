import React from "react";
import { deleteProfile } from "../../api/profiles";
import { useNavigate } from "react-router-dom";

const DeleteProfileButton = () => {
    const navigate = useNavigate();

    const handleDelete = async() => {
        try {
            const token = localStorage.getItem("access_token");
            const storedProfile = JSON.parse(localStorage.getItem("selected_profile"));
            const profileId = storedProfile.id;

            if(token && profileId) {
                await deleteProfile(token, profileId);
                localStorage.removeItem("selected_profile");
                navigate("/profile-dashboard");
            }

        } catch (error) {
            console.log("Delete failed: " + error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="logging-out-button">Delete</button>
        </div>
    );
}

export default DeleteProfileButton;