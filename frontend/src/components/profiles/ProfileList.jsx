import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';


const ProfileList = ({ profiles, isSelecting }) => {   // Receives profiles from ProfileDashboard
    const navigate = useNavigate();

    // Handles when the user selects a profile
    const handleSelectProfile = (profile) => {
        if(isSelecting) {
            localStorage.setItem("selected_profile", JSON.stringify(profile));
            navigate("/dashboard"); // Redirect to profile Dashboard
        } else {
            localStorage.setItem("selected_profile", JSON.stringify(profile));
            navigate("/update-delete-profile");
        }
    };

    return (
        <div className="profile-container">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <div className="profile-card" key={profile.id}>
                        <button className="profile-button" onClick={() => handleSelectProfile(profile)}>
                            {/* Conditionally render icons based on isSelecting */}
                            {isSelecting ? (
                                <FontAwesomeIcon icon={faCircleUser} className="profile-icon" />
                            ) : (
                                <FontAwesomeIcon icon={faPencil} className="profile-icon" />
                            )}
                        </button>
                        <p>{profile.name}</p>
                    </div>
                ))
            ) : (
                <p>No profiles found. Create one below.</p>
            )}
        </div>
    );
};

export default ProfileList;
