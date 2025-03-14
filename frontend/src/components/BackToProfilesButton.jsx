import React from "react";
import { useNavigate } from "react-router-dom";

const BackToProfilesButton = ({ text }) => {
    const navigate = useNavigate();

    return (
        <nav>
            <button onClick={() => navigate("/profile-dashboard")} className="select-profile-button">
                {text}
            </button>
        </nav>
    );
};

export default BackToProfilesButton;