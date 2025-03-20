import React from "react";

const EditProfilesButton = ({ isSelecting, toggleEditMode }) => {
    return (
        <button className="edit-button" onClick={toggleEditMode}>
            {isSelecting ? "Edit" : "Done"}
        </button>
    );
};

export default EditProfilesButton;