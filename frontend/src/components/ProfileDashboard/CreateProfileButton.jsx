import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreateProfileButton = ({ profiles }) => {
    const navigate = useNavigate();

    if (profiles.length >= 5) {
        return null; // Hide button if 5 profiles exist
    };

    return (
        <button className="profile-button create-edit-profile" onClick={() => navigate("/create-profile")}>
            <FontAwesomeIcon icon={faPlus} className="profile-icon" />
            <span>Create</span>
        </button>
    );
};

export default CreateProfileButton;
