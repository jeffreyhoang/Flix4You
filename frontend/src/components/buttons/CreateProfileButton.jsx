import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const CreateProfileButton = ({ profiles }) => {
    const navigate = useNavigate();

    if (profiles.length >= 5) {
        return null; // Hide button if 5 profiles exist
    };

    return (
        <Stack gap={2}>
            <Button className="create-profile-btn rounded-circle mx-auto d-flex align-items-center justify-content-center" onClick={() => navigate("/create-profile")}>
                <FontAwesomeIcon icon={faPlus} className="profile-icon" style={{ fontSize: "2.5rem" }} />
            </Button>
            <span>New</span>
        </Stack>
    );
};

export default CreateProfileButton;
