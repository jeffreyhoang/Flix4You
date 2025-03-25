import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BackToProfilesButton = ({ text }) => {
    const navigate = useNavigate();

    return (
        <nav>
            <Button className="custom-gradient-btn-2 w-100" size="lg" onClick={() => navigate("/profile-dashboard")}>
                {text}
            </Button>
        </nav>
    );
};

export default BackToProfilesButton;