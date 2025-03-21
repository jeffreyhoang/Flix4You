import React from "react";
import { useNavigate } from "react-router-dom";

const BackToProfilesButton = ({ text }) => {
    const navigate = useNavigate();

    return (
        <nav>
            <button onClick={() => navigate("/profile-dashboard")} className="form-button-2">
                {text}
            </button>
        </nav>
    );
};

export default BackToProfilesButton;