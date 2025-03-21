import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const EditProfilesButton = ({ isSelecting, toggleEditMode }) => {
    return (
        <button className="profile-button create-edit-profile" onClick={toggleEditMode}>
            <FontAwesomeIcon icon={faPencil} className="profile-icon" />
            {isSelecting ? "Edit" : "Done"}
        </button>
    );
};

export default EditProfilesButton;