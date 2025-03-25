import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button";

const EditProfilesButton = ({ isSelecting, toggleEditMode }) => {
    return (
        <Button className="custom-gradient-btn-1" size="lg" onClick={toggleEditMode}>
            <FontAwesomeIcon icon={faPencil} className="profile-icon" />
            {isSelecting ? " Edit" : " Done"}
        </Button>
    );
};

export default EditProfilesButton;