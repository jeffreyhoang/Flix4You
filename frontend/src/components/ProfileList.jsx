import React from "react";
import { selectProfile } from "../api/profiles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";

const ProfileList = ({ profiles }) => {   // Receives profiles from ProfileDashboard
    const navigate = useNavigate();

    // Handles when the user selects a profile
    const handleSelectProfile = (profile) => {
        selectProfile(profile);
        navigate("/dashboard"); // Redirect to profile Dashboard
    };

    return (
        <div className="profile-list">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <button key={profile.id} className="profile-button" onClick={() => handleSelectProfile(profile)} >
                        <FontAwesomeIcon icon={faCircleUser} className="profile-icon" />
                        {profile.name}
                    </button>
                ))
            ) : (
                <p>No profiles found. Create one below.</p>
            )}
        </div>
    );
};

export default ProfileList;
